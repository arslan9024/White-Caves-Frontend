import React, { useState } from 'react';
import type { ScheduledMessage } from '../../../types/phase6.types';
import {
  Container,
  FormSection,
  Label,
  Input,
  TextArea,
  Select,
  Row,
  RecipientList,
  RecipientChip,
  RemoveButton,
  PreviewContainer,
  PreviewTitle,
  PreviewContent,
  ScheduleInfo,
  ButtonGroup,
  Button,
  TimeZoneInfo,
  WarningBox,
  StatusBanner,
} from './MessageScheduler.styles';

export interface MessageSchedulerProps {
  onScheduleMessage: (message: Omit<ScheduledMessage, 'id' | 'status'>) => Promise<void>;
  defaultRecipients?: string[];
}

export const MessageScheduler: React.FC<MessageSchedulerProps> = ({
  onScheduleMessage,
  defaultRecipients = [],
}) => {
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState<string[]>(defaultRecipients);
  const [newRecipient, setNewRecipient] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleAddRecipient = () => {
    if (newRecipient.trim() && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient]);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (recipient: string) => {
    setRecipients(recipients.filter(r => r !== recipient));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRecipient();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!content.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a message.' });
      return;
    }

    if (recipients.length === 0) {
      setStatusMessage({ type: 'error', text: 'Please add at least one recipient.' });
      return;
    }

    if (!scheduledAt) {
      setStatusMessage({ type: 'error', text: 'Please select a schedule date/time.' });
      return;
    }

    const scheduledDate = new Date(scheduledAt);
    const now = new Date();

    if (scheduledDate <= now) {
      setStatusMessage({ type: 'error', text: 'Please select a future date and time.' });
      return;
    }

    setIsSubmitting(true);

    try {
      await onScheduleMessage({
        content,
        recipients,
        scheduledAt: scheduledDate.toISOString(),
        timezone,
      });
      setContent('');
      setRecipients([]);
      setScheduledAt('');
      setStatusMessage({ type: 'success', text: 'Message scheduled successfully!' });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Failed to schedule message. Please try again.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setContent('');
    setRecipients(defaultRecipients);
    setScheduledAt('');
    setStatusMessage(null);
  };

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <Container>
      <form onSubmit={handleSubmit} aria-label="Schedule message">
        <FormSection>
          <Label>Message Content</Label>
          <TextArea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Enter the message you want to schedule..."
            disabled={isSubmitting}
          />
        </FormSection>

        <FormSection>
          <Label>Recipients</Label>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <Input
                type="text"
                value={newRecipient}
                onChange={e => setNewRecipient(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter recipient (phone number or ID)"
                disabled={isSubmitting}
                style={{ flex: 1 }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddRecipient}
                disabled={isSubmitting || !newRecipient.trim()}
              >
                Add
              </Button>
            </div>
            {recipients.length > 0 && (
              <RecipientList>
                {recipients.map(recipient => (
                  <RecipientChip key={recipient}>
                    <span>{recipient}</span>
                    <RemoveButton type="button" onClick={() => handleRemoveRecipient(recipient)}>
                      ✕
                    </RemoveButton>
                  </RecipientChip>
                ))}
              </RecipientList>
            )}
          </div>
        </FormSection>

        <FormSection>
          <Label>Schedule Date & Time</Label>
          <Row>
            <div>
              <Input
                type="datetime-local"
                value={scheduledAt}
                onChange={e => setScheduledAt(e.target.value)}
                min={minDateTime}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern (US)</option>
                <option value="America/Chicago">Central (US)</option>
                <option value="America/Denver">Mountain (US)</option>
                <option value="America/Los_Angeles">Pacific (US)</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Dubai">Dubai</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Australia/Sydney">Sydney</option>
              </Select>
              <TimeZoneInfo>Selected: {timezone}</TimeZoneInfo>
            </div>
          </Row>
        </FormSection>

        {scheduledAt && (
          <ScheduleInfo>
            <strong>Scheduled to send:</strong>
            <span>
              {new Date(scheduledAt).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}{' '}
              ({timezone})
            </span>
            <span>
              ({Math.round((new Date(scheduledAt).getTime() - new Date().getTime()) / 60000)}{' '}
              minutes from now)
            </span>
          </ScheduleInfo>
        )}

        {content && (
          <PreviewContainer>
            <PreviewTitle>Message Preview</PreviewTitle>
            <PreviewContent>{content}</PreviewContent>
          </PreviewContainer>
        )}

        {recipients.length > 0 && (
          <WarningBox>
            💡 This message will be sent to {recipients.length} recipient
            {recipients.length !== 1 ? 's' : ''}. Make sure the details are correct before
            scheduling.
          </WarningBox>
        )}

        {statusMessage && (
          <StatusBanner
            $type={statusMessage.type}
            role={statusMessage.type === 'error' ? 'alert' : 'status'}
          >
            {statusMessage.type === 'success' ? '✅ ' : '⚠️ '}
            {statusMessage.text}
          </StatusBanner>
        )}

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={handleReset} disabled={isSubmitting}>
            Clear
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !content.trim() || recipients.length === 0 || !scheduledAt}
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Message'}
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default MessageScheduler;
