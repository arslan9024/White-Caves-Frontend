import React from 'react';

interface MessagesTabProps {
  whatsappState: any;
  testPhone: string;
  setTestPhone: (val: string) => void;
  testMessage: string;
  setTestMessage: (val: string) => void;
  sendingTest: boolean;
  handleSendTestMessage: () => void;
}

export const WhatsAppMessagesTab: React.FC<MessagesTabProps> = ({
  whatsappState,
  testPhone,
  setTestPhone,
  testMessage,
  setTestMessage,
  sendingTest,
  handleSendTestMessage,
}) => {
  const isAuthenticated = Boolean(
    whatsappState.session?.connectionStatus?.includes('authenticated')
  );

  return (
    <div className="settings-section">
      <h3>Test Message</h3>
      <div className="test-message-form">
        <div className="form-group">
          <label htmlFor="testPhone">Recipient Phone (with country code)</label>
          <input
            id="testPhone"
            type="tel"
            value={testPhone}
            onChange={e => setTestPhone(e.target.value)}
            placeholder="+971561234567"
            pattern="\+?[0-9]{7,15}"
            maxLength={16}
            required
            disabled={!isAuthenticated}
          />
          <small>Include country code (e.g., +971 for UAE)</small>
        </div>

        <div className="form-group">
          <label htmlFor="testMessage">Message</label>
          <textarea
            id="testMessage"
            value={testMessage}
            onChange={e => setTestMessage(e.target.value)}
            placeholder="Type your test message here..."
            rows={4}
            maxLength={4096}
            required
            disabled={!isAuthenticated}
          />
        </div>

        <button
          onClick={handleSendTestMessage}
          disabled={sendingTest || !isAuthenticated}
          className="btn-primary"
        >
          {sendingTest ? 'Sending...' : 'Send Test Message'}
        </button>

        {!isAuthenticated && (
          <p className="info-text">⚠️ Connect WhatsApp first to send messages</p>
        )}
      </div>

      {whatsappState.messages.length > 0 && (
        <div className="messages-history">
          <h4>Recent Messages</h4>
          <div className="messages-list">
            {whatsappState.messages.slice(-10).map((msg: any) => (
              <div key={msg.id} className={`message-item message-${msg.direction}`}>
                <div className="message-header">
                  <span className="message-phone">{msg.phoneNumber}</span>
                  <span className="message-time">
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
                  </span>
                </div>
                <div className="message-body">{msg.body}</div>
                <span className={`message-status status-${msg.status}`}>{msg.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
