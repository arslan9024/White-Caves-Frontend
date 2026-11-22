import { WhatsAppMessage } from '../../lib/database.js';
import { normalizeInterviewSchedule } from '../recruitmentRecordMapper.js';
import { prisma } from './prismaClient.js';
import { formatSlot, generateTimeSlots } from './slotFormatting.js';
import { detectInterviewIntent } from './intentDetection.js';
import { bookSelectedSlot, offerRescheduleSlots, declineInterview } from './bookingActions.js';

/**
 * Send time slot options to candidate
 */
export async function sendTimeSlotOptions(session, phoneNumber) {
  try {
    const slots = this?.generateTimeSlots
      ? this.generateTimeSlots(5)
      : generateTimeSlots(5);
    const formatSlotFn = slot => (this?.formatSlot ? this.formatSlot(slot) : formatSlot(slot));

    const slotsText = slots.map((slot, i) => `${i + 1}. ${formatSlotFn(slot)}`).join('\n');

    const optionsMessage = `
Great! Here are your available interview slots:

${slotsText}

Reply with your preferred number (1-5) to confirm.
      `.trim();

    // Store message
    const messageRecord = new WhatsAppMessage({
      waId: `${phoneNumber.replace('+', '')}@c.us`,
      phoneNumber: phoneNumber,
      direction: 'outgoing',
      messageType: 'slot_options',
      content: optionsMessage,
      status: 'sent',
      metadata: {
        sessionId: session.id,
        slots,
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    return {
      success: true,
      messageId: messageRecord._id,
      slots,
    };
  } catch (error) {
    console.error('❌ Error sending slot options:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send support message for questions
 */
export async function sendSupportMessage(session, phoneNumber, questionContent) {
  try {
    const supportMessage = `
📞 Good question! 

For more details about the ${session.job.title} role, you can:
• Reply to this chat
• Call our HR team at +971-XX-XXX-XXXX
• Email careers@company.com

Or proceed with scheduling by replying with your preferred time slot number.
      `.trim();

    // Store message
    const messageRecord = new WhatsAppMessage({
      waId: `${phoneNumber.replace('+', '')}@c.us`,
      phoneNumber: phoneNumber,
      direction: 'outgoing',
      messageType: 'support',
      content: supportMessage,
      status: 'sent',
      metadata: {
        sessionId: session.id,
        originalQuestion: questionContent,
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    return {
      success: true,
      messageId: messageRecord._id,
    };
  } catch (error) {
    console.error('❌ Error sending support message:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send guide message when intent is unclear
 */
export async function sendGuideMessage(session, phoneNumber) {
  try {
    const guideMessage = `
😊 I didn't quite understand. Here's what you can do:

1️⃣ Reply with a number (1-5) to select a time slot
2️⃣ Reply "RESCHEDULE" to see other times
3️⃣ Reply "DECLINE" if you're not interested
4️⃣ Reply "?" for questions

Which would you like to do?
      `.trim();

    // Store message
    const messageRecord = new WhatsAppMessage({
      waId: `${phoneNumber.replace('+', '')}@c.us`,
      phoneNumber: phoneNumber,
      direction: 'outgoing',
      messageType: 'guide',
      content: guideMessage,
      status: 'sent',
      metadata: {
        sessionId: session.id,
      },
      createdAt: new Date(),
    });

    await messageRecord.save();

    return {
      success: true,
      messageId: messageRecord._id,
    };
  } catch (error) {
    console.error('❌ Error sending guide message:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Process candidate response to interview invitation
 * Detects intent (schedule, interested, reschedule, decline)
 */
export async function processInterviewResponse(waId, phoneNumber, messageContent, sessionId) {
  try {
    // Detect intent from message
    const intent = this?.detectInterviewIntent
      ? this.detectInterviewIntent(messageContent)
      : detectInterviewIntent(messageContent);

    // Get session
    const session = normalizeInterviewSchedule(
      await prisma.interviewSchedule.findUnique({
        where: { id: sessionId },
        include: {
          candidate: true,
          job: true,
        },
      })
    );

    if (!session) {
      throw new Error('Interview session not found');
    }

    switch (intent.type) {
      case 'slot_selected':
        return this?.bookSelectedSlot
          ? await this.bookSelectedSlot(session, intent.slotIndex, phoneNumber)
          : await bookSelectedSlot(session, intent.slotIndex, phoneNumber);

      case 'reschedule':
        return this?.offerRescheduleSlots
          ? await this.offerRescheduleSlots(session, phoneNumber)
          : await offerRescheduleSlots(session, phoneNumber);

      case 'decline':
        return this?.declineInterview
          ? await this.declineInterview(session, phoneNumber, intent.reason)
          : await declineInterview(session, phoneNumber, intent.reason);

      case 'interested':
        return this?.sendTimeSlotOptions
          ? await this.sendTimeSlotOptions(session, phoneNumber)
          : await sendTimeSlotOptions(session, phoneNumber);

      case 'unsure':
      case 'question':
        return this?.sendSupportMessage
          ? await this.sendSupportMessage(session, phoneNumber, messageContent)
          : await sendSupportMessage(session, phoneNumber, messageContent);

      default:
        return this?.sendGuideMessage
          ? await this.sendGuideMessage(session, phoneNumber)
          : await sendGuideMessage(session, phoneNumber);
    }
  } catch (error) {
    console.error('❌ Error processing interview response:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
