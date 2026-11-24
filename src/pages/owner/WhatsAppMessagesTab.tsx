import React from 'react';

interface MessagesTabProps {
  welcomeMessage: string;
  setWelcomeMessage: (val: string) => void;
  awayMessage: string;
  setAwayMessage: (val: string) => void;
  enableAwayMessage: boolean;
  setEnableAwayMessage: (val: boolean) => void;
  handleSaveMessages: () => void;
  savingMessages: boolean;
}

export const WhatsAppMessagesTab: React.FC<MessagesTabProps> = ({
  welcomeMessage,
  setWelcomeMessage,
  awayMessage,
  setAwayMessage,
  enableAwayMessage,
  setEnableAwayMessage,
  handleSaveMessages,
  savingMessages,
}) => {
  return (
    <div>
        {activeTab === 'messages' && (
          <div className="settings-section">
            <h3>Test Message</h3>
            <div className="test-message-form">
              <div className="form-group">
                <label htmlFor="testPhone">Recipient Phone (with country code)</label>
                <input
                  id="testPhone"
                  type="tel"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  placeholder="+971561234567"
                  pattern="\+?[0-9]{7,15}"
                  maxLength={16}
                  required
                  disabled={!whatsappState.session?.connectionStatus.includes('authenticated')}
                />
                <small>Include country code (e.g., +971 for UAE)</small>
              </div>

              <div className="form-group">
                <label htmlFor="testMessage">Message</label>
                <textarea
                  id="testMessage"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Type your test message here..."
                  rows={4}
                  maxLength={4096}
                  required
                  disabled={!whatsappState.session?.connectionStatus.includes('authenticated')}
                />
              </div>

              <button
                onClick={handleSendTestMessage}
                disabled={sendingTest || !whatsappState.session?.connectionStatus.includes('authenticated')}
                className="btn-primary"
              >
                {sendingTest ? 'Sending...' : 'Send Test Message'}
              </button>

              {!whatsappState.session?.connectionStatus.includes('authenticated') && (
                <p className="info-text">⚠️ Connect WhatsApp first to send messages</p>
              )}
            </div>

            {whatsappState.messages.length > 0 && (
              <div className="messages-history">
                <h4>Recent Messages</h4>
                <div className="messages-list">
                  {whatsappState.messages.slice(-10).map((msg) => (
                    <div key={msg.id} className={`message-item message-${msg.direction}`}>
                      <div className="message-header">
                        <span className="message-phone">{msg.phoneNumber}</span>
                        <span className="message-time">{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}</span>
                      </div>
                      <div className="message-body">{msg.body}</div>
                      <span className={`message-status status-${msg.status}`}>{msg.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUEUE TAB */}
    </div>
  );
};
