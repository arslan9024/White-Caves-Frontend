import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { Config } from '../config/constants';
import {
  ClickToChatContainer,
  ChatTrigger,
  ChatLabel,
  WhatsAppIconSmall,
  ChatPopup,
  ChatBody,
} from './ClickToChat.styles';
import {
  ChatMessage,
  ChatTab,
  INITIAL_AI_MESSAGES,
  QUICK_MESSAGES,
  getContactApps,
  useDubaiOnlineStatus,
  sendAiChatMessage,
  sanitizePhoneNumber,
  openWhatsAppChat,
  openExternalApp,
  ChatHeaderPanel,
  ChatTabs,
  AiChatPanel,
  ContactPanel,
} from './click-to-chat';

export const ClickToChat: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<ChatTab>('ai');
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>(INITIAL_AI_MESSAGES);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const isOnline = useDubaiOnlineStatus();
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const rawPhone = import.meta.env.VITE_WHATSAPP_NUMBER || Config.COMPANY.WHATSAPP;
  const { phoneDigits, phoneNumber } = sanitizePhoneNumber(rawPhone);
  const baseUrl = import.meta.env.BASE_URL || '/';

  // Close on Escape key and trap focus within popup
  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && popupRef.current) {
        const focusable = popupRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  const openWhatsApp = useCallback(
    (msgText: string) => {
      openWhatsAppChat(phoneNumber, phoneDigits, msgText);
    },
    [phoneNumber, phoneDigits]
  );

  const handleSendAiMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isAiTyping) return;
      const userMsg: ChatMessage = { role: 'user', content: text.trim() };
      const updated = [...aiMessages, userMsg];
      setAiMessages(updated);
      setAiInput('');
      setIsAiTyping(true);
      try {
        const reply = await sendAiChatMessage(updated);
        setAiMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } catch {
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content:
              "Sorry, I'm having trouble connecting right now. Please try again or contact us directly via WhatsApp.",
          },
        ]);
      } finally {
        setIsAiTyping(false);
      }
    },
    [aiMessages, isAiTyping]
  );

  const handleQuickMessage = useCallback(
    (msgText: string) => {
      openWhatsApp(msgText);
      setIsExpanded(false);
    },
    [openWhatsApp]
  );

  const handleCustomMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (message.trim()) {
        openWhatsApp(message);
        setMessage('');
        setIsExpanded(false);
      }
    },
    [message, openWhatsApp]
  );

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    triggerRef.current?.focus();
  }, []);

  const contactApps = getContactApps(phoneNumber);

  return (
    <ClickToChatContainer>
      <ChatTrigger
        ref={triggerRef}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Close chat widget' : 'Open chat widget'}
        aria-expanded={isExpanded}
        aria-haspopup="dialog"
        title="Chat with us"
      >
        <WhatsAppIconSmall viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="#25D366"
            d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16z"
          />
          <path
            fill="white"
            d="M21.305 18.694c-0.372-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.186-0.837 0.186s-0.962 1.208-1.179 1.456c-0.217 0.248-0.434 0.279-0.806 0.093-0.372-0.186-1.571-0.579-2.991-1.845-1.105-0.986-1.851-2.203-2.068-2.575s-0.023-0.573 0.163-0.758c0.167-0.166 0.372-0.434 0.558-0.651 0.186-0.217 0.248-0.372 0.372-0.62 0.124-0.248 0.062-0.465-0.031-0.651-0.093-0.186-0.837-2.015-1.147-2.759-0.303-0.724-0.611-0.626-0.837-0.638-0.217-0.011-0.465-0.014-0.713-0.014s-0.651 0.093-0.992 0.465c-0.341 0.372-1.301 1.270-1.301 3.099s1.332 3.594 1.518 3.842c0.186 0.248 2.625 4.008 6.359 5.622 0.888 0.384 1.581 0.613 2.122 0.785 0.892 0.283 1.704 0.243 2.347 0.147 0.716-0.107 2.197-0.898 2.507-1.766s0.31-1.611 0.217-1.766c-0.093-0.155-0.341-0.248-0.713-0.434z"
          />
        </WhatsAppIconSmall>
        <ChatLabel>Chat</ChatLabel>
      </ChatTrigger>

      {isExpanded && (
        <ChatPopup
          ref={popupRef}
          role="dialog"
          aria-modal="true"
          aria-label="White Caves chat support"
        >
          <ChatHeaderPanel baseUrl={baseUrl} isOnline={isOnline} onClose={handleClose} />

          <ChatBody>
            <ChatTabs activeTab={activeTab} onSelectTab={setActiveTab} />

            {activeTab === 'ai' ? (
              <AiChatPanel
                aiMessages={aiMessages}
                isAiTyping={isAiTyping}
                aiInput={aiInput}
                onAiInputChange={setAiInput}
                onSendAiMessage={handleSendAiMessage}
              />
            ) : (
              <ContactPanel
                contactApps={contactApps}
                quickMessages={QUICK_MESSAGES}
                message={message}
                onMessageChange={setMessage}
                onOpenApp={openExternalApp}
                onSelectQuickMessage={handleQuickMessage}
                onCustomMessageSubmit={handleCustomMessage}
              />
            )}
          </ChatBody>
        </ChatPopup>
      )}
    </ClickToChatContainer>
  );
};

export default ClickToChat;
export * from './click-to-chat';
export * from './ClickToChat.styles';
