import { WhatsAppMessage } from '../../lib/database.js';
import { prisma } from './prismaClient.js';
import { formatSlot, generateAlternativeSlots } from './slotFormatting.js';

/**
 * Book selected time slot for interview
 */
export async function bookSelectedSlot(session, slotIndex, phoneNumber) {
  try {
    const slot = session.availableSlots[slotIndex];

    if (!slot) {
      return {
        success: false,
        error: 'Invalid slot selection',
      };
    }

    // Update session
    await prisma.interviewSchedule.update({
      where: { id: session.id },
      data: {
        session_status: 'scheduled',
        selected_slot: slot,
        interview_date: new Date(slot.start),
        updatedAt: new Date(),
      },
    });

    // Create interview record
    const interview = await prisma.interview.create({
      data: {
        candidate_id: session.candidateId,
        job_id: session.jobId,
        status: 'scheduled',
        scheduled_at: new Date(slot.start),
        interview_type: 'hr',
        interviewer: session.interviewers.join(', '),
        createdAt: new Date(),
      },
    });

    // Send confirmation
    const candidate = session.candidate;
    const job = session.job;
    const formattedSlot = this?.formatSlot ? this.formatSlot(slot) : formatSlot(slot);

    const confirmationMessage = `
✅ Interview Confirmed!

Hi ${candidate.first_name},

Your interview has been scheduled for:
📅 ${formattedSlot}

Role: ${job.title}
Duration: 45 minutes
Platform: Zoom

Meeting Link will be sent 24 hours before the interview.

Reply REMINDER to get a reminder 24 hours before.
      `.trim();

    // Store confirmation message
    const messageRecord = new WhatsAppMessage({
      waId: `${phoneNumber.replace('+', '')}@c.us`,
      phoneNumber: phoneNumber,
      direction: 'outgoing',
      messageType: 'interview_confirmation',
      content: confirmationMessage,
      status: 'sent',
      metadata: {
        sessionId: session.id,
        interviewId: interview.id,
        slot,
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    console.log(`✅ Interview booked for ${phoneNumber} at ${slot.start}`);

    return {
      success: true,
      interviewId: interview.id,
      scheduledAt: slot.start,
      message: 'Interview successfully scheduled',
    };
  } catch (error) {
    console.error('❌ Error booking slot:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Offer different time slots if candidate wants to reschedule
 */
export async function offerRescheduleSlots(session, phoneNumber) {
  try {
    // Generate new slot options
    const newSlots = this?.generateAlternativeSlots
      ? this.generateAlternativeSlots()
      : generateAlternativeSlots();
    const formatSlotFn = slot => (this?.formatSlot ? this.formatSlot(slot) : formatSlot(slot));

    const slotsText = newSlots.map((slot, i) => `${i + 1}. ${formatSlotFn(slot)}`).join('\n');

    const rescheduleMessage = `
⏰ No problem! Here are alternative times:

${slotsText}

Reply with your preferred number (1-3) or let us know if you need more flexibility.
      `.trim();

    // Store message
    const messageRecord = new WhatsAppMessage({
      waId: `${phoneNumber.replace('+', '')}@c.us`,
      phoneNumber: phoneNumber,
      direction: 'outgoing',
      messageType: 'reschedule_offer',
      content: rescheduleMessage,
      status: 'sent',
      metadata: {
        sessionId: session.id,
        slots: newSlots,
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    // Update session with new slots
    await prisma.interviewSchedule.update({
      where: { id: session.id },
      data: {
        available_slots: newSlots,
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Reschedule options sent to ${phoneNumber}`);

    return {
      success: true,
      messageId: messageRecord._id,
      slots: newSlots,
    };
  } catch (error) {
    console.error('❌ Error offering reschedule:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Handle interview decline
 */
export async function declineInterview(session, phoneNumber, reason) {
  try {
    // Update session status
    await prisma.interviewSchedule.update({
      where: { id: session.id },
      data: {
        session_status: 'declined',
        decline_reason: reason,
        updatedAt: new Date(),
      },
    });

    // Update candidate score status
    const score = await prisma.candidateScore.findFirst({
      where: {
        candidate_id: session.candidateId,
        job_id: session.jobId,
      },
    });

    if (score) {
      await prisma.candidateScore.update({
        where: { id: score.id },
        data: {
          feedback: `Candidate declined interview: ${reason}`,
        },
      });
    }

    const declineAck = `
Thanks for letting us know. We appreciate your interest in ${session.job.title}.

Good luck with your other opportunities! 👋
      `.trim();

    // Store acknowledgment
    const messageRecord = new WhatsAppMessage({
      waId: `${phoneNumber.replace('+', '')}@c.us`,
      phoneNumber: phoneNumber,
      direction: 'outgoing',
      messageType: 'decline_acknowledgment',
      content: declineAck,
      status: 'sent',
      metadata: {
        sessionId: session.id,
        reason,
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    console.log(`📭 Interview declined by ${phoneNumber}`);

    return {
      success: true,
      status: 'declined',
      reason,
    };
  } catch (error) {
    console.error('❌ Error declining interview:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
