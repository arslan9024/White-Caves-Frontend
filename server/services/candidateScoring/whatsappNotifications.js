import MessageTemplateService from '../MessageTemplateService.js';
import { WhatsAppMessage, WhatsAppContact } from '../../lib/database.js';

/**
 * Format phone number to WhatsApp E.164 format
 * Handles various input formats
 */
export function formatPhoneForWhatsApp(phone) {
  let cleaned = phone.replace(/[\s().-]/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  if (!cleaned.startsWith('+')) {
    if (cleaned.startsWith('971')) {
      cleaned = '+' + cleaned;
    } else {
      cleaned = '+971' + cleaned;
    }
  }

  return cleaned;
}

/**
 * Send any recruitment template via WhatsApp
 */
export async function sendTemplateMessageViaMeta(
  candidate,
  templateId,
  variables,
  messageType = 'text',
  { formatPhone = formatPhoneForWhatsApp } = {}
) {
  try {
    const phone = candidate.whatsapp_phone || candidate.phone;
    if (!phone) return null;

    const formattedPhone = formatPhone(phone);
    const waId = formattedPhone.replace('+', '') + '@c.us';
    const messageBody = MessageTemplateService.render(templateId, variables);

    let contact = await WhatsAppContact.findOne({ waId });

    if (!contact) {
      contact = await WhatsAppContact.create({
        waId,
        phoneNumber: formattedPhone,
        name: candidate.first_name || candidate.email,
        lastMessageAt: new Date(),
        unreadCount: 0,
        conversationStatus: 'active',
      });
    } else {
      contact.lastMessageAt = new Date();
      await contact.save();
    }

    const message = await WhatsAppMessage.create({
      waId,
      phoneNumber: formattedPhone,
      contactName: candidate.first_name || 'Candidate',
      direction: 'outgoing',
      messageType,
      content: messageBody,
      status: 'sent',
      createdAt: new Date(),
    });

    return message;
  } catch (error) {
    console.error('Error sending WhatsApp template message:', error);
    throw error;
  }
}

/**
 * Send screening result via WhatsApp
 * Uses the MessageTemplateService to render personalized messages
 */
export async function sendScoringResultViaMeta(
  candidate,
  job,
  scoreRecord,
  {
    sendTemplateMessage = sendTemplateMessageViaMeta,
    formatPhone = formatPhoneForWhatsApp,
  } = {}
) {
  try {
    const variables = {
      candidate_name: candidate.first_name || candidate.email || 'Candidate',
      job_title: job.title || 'the position',
      overall_score: Math.round(scoreRecord.overall_score),
      screening_status: MessageTemplateService.formatStatus(scoreRecord.screening_status),
      skills_score: Math.round(scoreRecord.skills_score),
      experience_score: Math.round(scoreRecord.experience_score),
      education_score: Math.round(scoreRecord.education_score),
      cultural_fit_score: Math.round(scoreRecord.cultural_fit_score),
      location_match_score: Math.round(scoreRecord.location_match_score),
      feedback: scoreRecord.feedback || 'Great potential!',
      next_action:
        MessageTemplateService.renderScreeningResult(candidate, job, scoreRecord)
          .split('🎯 *Next Steps:*\n')[1]
          ?.split('\n\nIf you have any questions')[0] || 'We will contact you soon.',
    };

    const message = await sendTemplateMessage(candidate, 'screening_result', variables, 'text');

    const phone = candidate.whatsapp_phone || candidate.phone;
    const formattedPhone = formatPhone(phone);
    console.log(`✅ Screening result sent to ${formattedPhone} (Message ID: ${message?._id})`);

    return message;
  } catch (error) {
    console.error('Error sending WhatsApp scoring result:', error);
    throw error;
  }
}
