/**
 * Time slot generation and formatting helpers for Interview Scheduling Service
 */

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get day name from date
 */
export function getDayName(date) {
  return DAY_NAMES[date.getDay()];
}

/**
 * Build a 45-minute slot object for a given date and time string (e.g. '10:00 AM')
 */
function buildSlot(currentDate, time, dayNameFn) {
  const [hours, period] = time.split(' ');
  let [h, m] = hours.split(':').map(Number);

  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;

  const start = new Date(currentDate);
  start.setHours(h, m, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 45);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
    day: dayNameFn(currentDate),
    date: currentDate.toISOString().split('T')[0],
    time,
  };
}

/**
 * Generate available time slots (next 5 business days)
 */
export function generateTimeSlots(count = 5) {
  const slots = [];
  const now = new Date();
  const currentDate = new Date(now);
  currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

  const timeOptions = ['10:00 AM', '2:00 PM', '4:00 PM'];
  const dayNameFn = date => (this?.getDayName ? this.getDayName(date) : getDayName(date));
  let slotCount = 0;

  while (slotCount < count) {
    // Skip weekends
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      const time = timeOptions[slotCount % timeOptions.length];
      slots.push(buildSlot(currentDate, time, dayNameFn));
      slotCount++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return slots;
}

/**
 * Generate alternative slots (different times)
 */
export function generateAlternativeSlots() {
  const slots = [];
  const now = new Date();
  const currentDate = new Date(now);
  currentDate.setDate(currentDate.getDate() + 3); // Start 3 days from now

  const timeOptions = ['9:00 AM', '11:00 AM', '3:30 PM'];
  const dayNameFn = date => (this?.getDayName ? this.getDayName(date) : getDayName(date));

  for (let i = 0; i < 3; i++) {
    // Skip weekends
    while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    slots.push(buildSlot(currentDate, timeOptions[i], dayNameFn));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return slots;
}

/**
 * Format slot for display
 */
export function formatSlot(slot) {
  if (typeof slot === 'string') {
    return slot; // Already formatted
  }

  return `${slot.day} (${slot.date}) at ${slot.time}`;
}

/**
 * Format date and time
 */
export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Generate unique meeting ID
 */
export function generateMeetingId() {
  return (
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Format phone number for WhatsApp
 */
export function formatPhoneForWhatsApp(phone) {
  if (!phone) return '';

  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');

  // Handle UAE numbers
  if (cleaned.startsWith('971')) {
    return `+${cleaned}`;
  }

  if (cleaned.startsWith('50') || cleaned.startsWith('52') || cleaned.startsWith('55')) {
    return `+971${cleaned}`;
  }

  // Handle other formats
  if (cleaned.length === 9) {
    return `+971${cleaned}`;
  }

  return `+${cleaned}`;
}
