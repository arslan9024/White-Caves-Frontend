/**
 * Candidate intent detection and decline reason extraction for Interview Scheduling Service
 */

/**
 * Extract decline reason from message
 */
export function extractDeclineReason(message) {
  if (/busy|don't have time|schedule|can't/i.test(message)) {
    return 'Scheduling conflict';
  }
  if (/interested|right role|looking for/i.test(message)) {
    return 'Not interested in role';
  }
  if (/already found|other job|accepted/i.test(message)) {
    return 'Already accepted another offer';
  }
  return 'Candidate declined';
}

/**
 * Detect interview-related intent from candidate message
 */
export function detectInterviewIntent(message) {
  const lowerMessage = message.toLowerCase().trim();

  // Check for slot selection (numbers 1-5)
  const slotMatch = lowerMessage.match(/^([1-5])$/);
  if (slotMatch) {
    return {
      type: 'slot_selected',
      slotIndex: parseInt(slotMatch[1]) - 1,
      confidence: 0.95,
    };
  }

  // Check for "schedule" keywords
  if (/^(schedule|book|confirm|yes|ready)/.test(lowerMessage)) {
    return {
      type: 'interested',
      confidence: 0.9,
    };
  }

  // Check for "reschedule" keywords
  if (/(reschedule|different time|other time|can't make it|change|another slot)/i.test(message)) {
    return {
      type: 'reschedule',
      confidence: 0.85,
    };
  }

  // Check for decline keywords
  if (/(decline|not interested|no thanks|not right now|cancel)/i.test(message)) {
    const reason = this?.extractDeclineReason
      ? this.extractDeclineReason(message)
      : extractDeclineReason(message);
    return {
      type: 'decline',
      reason,
      confidence: 0.9,
    };
  }

  // Check for question/unsure
  if (
    /(question|when|how|where|what|where|tell me more|more info|unclear|don't understand)/i.test(
      message
    )
  ) {
    return {
      type: 'question',
      confidence: 0.7,
    };
  }

  // Default: unsure
  return {
    type: 'unsure',
    confidence: 0.5,
  };
}
