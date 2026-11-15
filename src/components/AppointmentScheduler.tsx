import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AppointmentScheduler.css';

interface AppointmentSchedulerProps {
  propertyId: string | number;
  agentId: string | number;
}

export default function AppointmentScheduler({ propertyId, agentId }: AppointmentSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [existingAppointment, setExistingAppointment] = useState<{ id: string } | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSchedule = async () => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          agentId,
          dateTime: selectedDate,
          isRescheduling,
          existingAppointmentId: existingAppointment?.id,
        }),
      });

      if (response.ok) {
        setStatusMsg(
          isRescheduling
            ? 'Appointment rescheduled successfully!'
            : 'Appointment scheduled successfully!'
        );
        setSelectedDate(null);
        setIsRescheduling(false);
      }
    } catch (error) {
      setStatusMsg('Failed to schedule appointment');
    }
  };

  return (
    <div className="appointment-scheduler">
      <h3>{isRescheduling ? 'Reschedule Viewing' : 'Schedule Viewing'}</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date()}
        placeholderText="Select date and time"
        className="date-picker"
      />
      <button onClick={handleSchedule} disabled={!selectedDate}>
        {isRescheduling ? 'Reschedule Appointment' : 'Schedule Appointment'}
      </button>
    </div>
  );
}
