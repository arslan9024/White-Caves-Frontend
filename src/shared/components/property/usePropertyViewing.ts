import { useState } from 'react';
import { Config } from '../../../config/constants';
import { authFetch } from '../../../utils/authFetch';
import type { PropertyData, ViewingStatus } from './PropertyDetailModal.types';
import { TIME_SLOTS } from './PropertyDetailModal.constants';

export interface UsePropertyViewingProps {
  property: PropertyData | null;
}

export interface UsePropertyViewingReturn {
  viewingDate: string;
  setViewingDate: (date: string) => void;
  viewingTime: string;
  setViewingTime: (time: string) => void;
  viewingStatus: ViewingStatus;
  setViewingStatus: (status: ViewingStatus) => void;
  viewingError: string;
  setViewingError: (error: string) => void;
  handleRequestViewing: () => Promise<void>;
  resetViewingForm: () => void;
}

export function usePropertyViewing({
  property,
}: UsePropertyViewingProps): UsePropertyViewingReturn {
  const [viewingDate, setViewingDate] = useState<string>('');
  const [viewingTime, setViewingTime] = useState<string>('');
  const [viewingStatus, setViewingStatus] = useState<ViewingStatus>('idle');
  const [viewingError, setViewingError] = useState<string>('');

  const resetViewingForm = (): void => {
    setViewingStatus('idle');
    setViewingDate('');
    setViewingTime('');
    setViewingError('');
  };

  const handleRequestViewing = async (): Promise<void> => {
    if (!property) return;

    if (!viewingDate) {
      setViewingError('Please select a date.');
      return;
    }
    if (!viewingTime) {
      setViewingError('Please select a preferred time.');
      return;
    }

    setViewingStatus('submitting');
    setViewingError('');

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');

      if (token && property.id) {
        // Authenticated path → create a formal viewing record
        const scheduledAt = `${viewingDate}T${viewingTime}:00.000Z`;
        const res = await authFetch('/api/viewings', {
          method: 'POST',
          body: JSON.stringify({ propertyId: property.id, scheduledAt, type: 'in_person' }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { message?: string };
          throw new Error(data.message ?? `Request failed (${res.status})`);
        }
      } else {
        // Public / unauthenticated path → WhatsApp pre-filled message
        const dateLabel = new Date(viewingDate + 'T12:00:00').toLocaleDateString('en-AE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const timeLabel = TIME_SLOTS.find(s => s.value === viewingTime)?.label ?? viewingTime;
        const msg = `Hi, I'd like to view ${property.title} in ${property.location} on ${dateLabel} at ${timeLabel}. Please confirm availability.`;
        window.open(
          `https://wa.me/${Config.COMPANY.WHATSAPP}?text=${encodeURIComponent(msg)}`,
          '_blank',
          'noopener,noreferrer'
        );
      }

      setViewingStatus('success');
    } catch (err) {
      setViewingStatus('error');
      setViewingError(
        err instanceof Error ? err.message : 'Could not submit request. Please try again.'
      );
    }
  };

  return {
    viewingDate,
    setViewingDate,
    viewingTime,
    setViewingTime,
    viewingStatus,
    setViewingStatus,
    viewingError,
    setViewingError,
    handleRequestViewing,
    resetViewingForm,
  };
}
