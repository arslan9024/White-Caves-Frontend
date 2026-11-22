import MessageTemplateService from '../MessageTemplateService.js';
import { WhatsAppMessage, WhatsAppContact } from '../../lib/database.js';
import { normalizeInterviewSchedule } from '../recruitmentRecordMapper.js';
import { prisma } from './prismaClient.js';
import {
  formatSlot,
  formatDateTime,
  formatPhoneForWhatsApp,
  generateMeetingId,
} from './slotFormatting.js';

/**
 * Create interview session with available slots
 */
export async function createInterviewSession(candidateId, jobId, interviewerIds, slotOptions) {
  try {
    // Find candidate and job
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!candidate || !job) {
      throw new Error('Candidate or Job not found');
    }

    // Create interview session
    const session = normalizeInterviewSchedule(
      await prisma.interviewSchedule.create({
        data: {
          candidate_id: candidateId,
          job_id: jobId,
          session_status: 'pending_scheduling',
          interview_type: 'hr',
          interviewer_ids: interviewerIds,
          available_slots: slotOptions,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    );

    // Send WhatsApp with available slots
    if (this?.sendInterviewInvitation) {
      await this.sendInterviewInvitation(candidate, job, session, slotOptions);
    } else {
      await sendInterviewInvitation(candidate, job, session, slotOptions);
    }

    return {
      success: true,
      sessionId: session.id,
      message: 'Interview invitation sent via WhatsApp',
    };
  } catch (error) {
    console.error('❌ Error creating interview session:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send interview invitation with time slots
 */
export async function sendInterviewInvitation(candidate, job, session, slots) {
  try {
    const formatSlotFn = slot => (this?.formatSlot ? this.formatSlot(slot) : formatSlot(slot));
    const meetingId = this?.generateMeetingId ? this.generateMeetingId() : generateMeetingId();
    const formatPhoneFn = phone =>
      this?.formatPhoneForWhatsApp
        ? this.formatPhoneForWhatsApp(phone)
        : formatPhoneForWhatsApp(phone);

    // Format slots for display
    const slotsText = slots.map((slot, i) => `${i + 1}. ${formatSlotFn(slot)}`).join('\n');

    const variables = {
      candidate_name: candidate.first_name || candidate.name,
      job_title: job.title,
      interview_type: 'Technical Assessment',
      interview_duration: '45',
      available_times: slotsText,
      meeting_link: `https://zoom.us/j/${meetingId}`,
      next_action: 'Reply with number (1-3) to book your slot',
    };

    // Render message using template
    const message = MessageTemplateService.render('interview_invitation', variables);

    // Get or create WhatsApp contact
    const phone = formatPhoneFn(candidate.whatsapp_phone || candidate.phone);

    let contact = await WhatsAppContact.findOne({ phoneNumber: phone });
    if (!contact) {
      contact = new WhatsAppContact({
        phoneNumber: phone,
        waId: `${phone.replace('+', '')}@c.us`,
        name: candidate.first_name || candidate.name,
        conversationStatus: 'active',
      });
      await contact.save();
    }

    // Store message in database
    const messageRecord = new WhatsAppMessage({
      waId: contact.waId,
      phoneNumber: phone,
      direction: 'outgoing',
      messageType: 'interview_invitation',
      content: message,
      status: 'pending',
      metadata: {
        sessionId: session.id,
        candidateId: candidate.id,
        jobId: job.id,
        slots: slots,
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    console.log(`✅ Interview invitation sent to ${phone}`);
    return {
      success: true,
      messageId: messageRecord._id,
      phone,
    };
  } catch (error) {
    console.error('❌ Error sending interview invitation:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send interview reminder 24 hours before
 */
export async function sendInterviewReminder(interviewId) {
  try {
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        candidate: true,
        job: true,
      },
    });

    if (!interview) {
      throw new Error('Interview not found');
    }

    const formatPhoneFn = phone =>
      this?.formatPhoneForWhatsApp
        ? this.formatPhoneForWhatsApp(phone)
        : formatPhoneForWhatsApp(phone);
    const formatDateTimeFn = dateStr =>
      this?.formatDateTime ? this.formatDateTime(dateStr) : formatDateTime(dateStr);

    const phone = formatPhoneFn(interview.candidate.whatsapp_phone || interview.candidate.phone);

    const reminderMessage = `
⏰ Reminder: Your Interview is Tomorrow!

Role: ${interview.job.title}
Date & Time: ${formatDateTimeFn(interview.scheduled_at)}
Duration: 45 minutes
Platform: Zoom

Meeting instructions will be provided by your interviewer.

Reply CONFIRM to let us know you're ready!
      `.trim();

    // Store message
    const messageRecord = new WhatsAppMessage({
      waId: `${phone.replace('+', '')}@c.us`,
      phoneNumber: phone,
      direction: 'outgoing',
      messageType: 'interview_reminder',
      content: reminderMessage,
      status: 'sent',
      metadata: {
        interviewId,
        reminderType: 'day_before',
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    // Update interview record
    await prisma.interviewSchedule.updateMany({
      where: {
        candidate_id: interview.candidate_id,
        job_id: interview.job_id,
        interview_date: interview.scheduled_at,
      },
      data: {
        reminder_sent_at: new Date(),
      },
    });

    console.log(`🔔 Reminder sent for interview ${interviewId}`);

    return {
      success: true,
      messageId: messageRecord._id,
      phone,
    };
  } catch (error) {
    console.error('❌ Error sending reminder:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get interview statistics
 */
export async function getInterviewStats(jobId) {
  try {
    const interviews = await prisma.interview.findMany({
      where: { job_id: jobId },
      include: {
        candidate: true,
      },
    });

    const sessions = await prisma.interviewSchedule.findMany({
      where: { job_id: jobId },
    });

    return {
      total_sessions: sessions.length,
      scheduled: sessions.filter(s => s.session_status === 'scheduled').length,
      pending: sessions.filter(s => s.session_status === 'pending_scheduling').length,
      declined: sessions.filter(s => s.session_status === 'declined').length,
      completed: interviews.filter(i => i.status === 'completed').length,
      no_show: interviews.filter(i => i.status === 'no_show').length,
    };
  } catch (error) {
    console.error('❌ Error getting stats:', error.message);
    return null;
  }
}
