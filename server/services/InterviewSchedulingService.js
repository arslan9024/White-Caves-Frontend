import {
  createInterviewSession,
  sendInterviewInvitation,
  sendInterviewReminder,
  getInterviewStats,
} from './interviewScheduling/invitationAndReminders.js';
import {
  detectInterviewIntent,
  extractDeclineReason,
} from './interviewScheduling/intentDetection.js';
import {
  bookSelectedSlot,
  offerRescheduleSlots,
  declineInterview,
} from './interviewScheduling/bookingActions.js';
import {
  processInterviewResponse,
  sendTimeSlotOptions,
  sendSupportMessage,
  sendGuideMessage,
} from './interviewScheduling/messagingActions.js';
import {
  generateTimeSlots,
  generateAlternativeSlots,
  formatSlot,
  formatDateTime,
  getDayName,
  generateMeetingId,
  formatPhoneForWhatsApp,
} from './interviewScheduling/slotFormatting.js';

/**
 * Interview Scheduling Service - Phase 1C Part 2
 *
 * Enables candidates to schedule interviews via WhatsApp by:
 * 1. Offering available time slots
 * 2. Detecting "schedule" intent in candidate messages
 * 3. Auto-booking selected slots
 * 4. Sending confirmations and reminders
 * 5. Tracking interview lifecycle
 */
export class InterviewSchedulingService {
  static createInterviewSession(candidateId, jobId, interviewerIds, slotOptions) {
    return createInterviewSession.call(this, candidateId, jobId, interviewerIds, slotOptions);
  }

  static sendInterviewInvitation(candidate, job, session, slots) {
    return sendInterviewInvitation.call(this, candidate, job, session, slots);
  }

  static processInterviewResponse(waId, phoneNumber, messageContent, sessionId) {
    return processInterviewResponse.call(this, waId, phoneNumber, messageContent, sessionId);
  }

  static detectInterviewIntent(message) {
    return detectInterviewIntent.call(this, message);
  }

  static bookSelectedSlot(session, slotIndex, phoneNumber) {
    return bookSelectedSlot.call(this, session, slotIndex, phoneNumber);
  }

  static offerRescheduleSlots(session, phoneNumber) {
    return offerRescheduleSlots.call(this, session, phoneNumber);
  }

  static declineInterview(session, phoneNumber, reason) {
    return declineInterview.call(this, session, phoneNumber, reason);
  }

  static sendTimeSlotOptions(session, phoneNumber) {
    return sendTimeSlotOptions.call(this, session, phoneNumber);
  }

  static sendSupportMessage(session, phoneNumber, questionContent) {
    return sendSupportMessage.call(this, session, phoneNumber, questionContent);
  }

  static sendGuideMessage(session, phoneNumber) {
    return sendGuideMessage.call(this, session, phoneNumber);
  }

  static sendInterviewReminder(interviewId) {
    return sendInterviewReminder.call(this, interviewId);
  }

  static generateTimeSlots(count = 5) {
    return generateTimeSlots.call(this, count);
  }

  static generateAlternativeSlots() {
    return generateAlternativeSlots.call(this);
  }

  static formatSlot(slot) {
    return formatSlot(slot);
  }

  static formatDateTime(dateString) {
    return formatDateTime(dateString);
  }

  static getDayName(date) {
    return getDayName(date);
  }

  static generateMeetingId() {
    return generateMeetingId();
  }

  static formatPhoneForWhatsApp(phone) {
    return formatPhoneForWhatsApp(phone);
  }

  static extractDeclineReason(message) {
    return extractDeclineReason(message);
  }

  static getInterviewStats(jobId) {
    return getInterviewStats(jobId);
  }
}

export default InterviewSchedulingService;
