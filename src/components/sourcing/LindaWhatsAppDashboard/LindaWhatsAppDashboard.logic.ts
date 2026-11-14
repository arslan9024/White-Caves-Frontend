/**
 * Linda WhatsApp Dashboard — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing conversation selection, chat message streams, search filters, and opportunity modals
 * Strictly < 350 lines
 */

import { useState, useEffect } from 'react';
import type {
  ConversationItem,
  ChatMessageItem,
  PropertyOpportunity,
  FilterStatus,
} from './LindaWhatsAppDashboard.types';

export function useLindaWhatsAppDashboardLogic() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationItem | null>(null);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showOpportunity, setShowOpportunity] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<PropertyOpportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setConversations([
        {
          id: 'chat_1',
          name: 'Ahmed Al Mansouri',
          phone: '+971501234567',
          lastMessage: 'I have a 4BR villa in Arabian Ranches for rent at 8,000/month',
          lastMessageTime: '10:30 AM',
          unread: 2,
          hasOpportunity: true,
          opportunityConfidence: 92,
        },
        {
          id: 'chat_2',
          name: 'Fatima Al Mazrouei',
          phone: '+971502345678',
          lastMessage: 'Available 2BR apartment Downtown Dubai',
          lastMessageTime: '9:15 AM',
          unread: 0,
          hasOpportunity: true,
          opportunityConfidence: 78,
        },
        {
          id: 'chat_3',
          name: 'Mohammed Khan',
          phone: '+971503456789',
          lastMessage: 'Thanks for the information about the property',
          lastMessageTime: '8:45 AM',
          unread: 1,
          hasOpportunity: false,
          opportunityConfidence: 0,
        },
        {
          id: 'chat_4',
          name: 'Sarah Johnson',
          phone: '+971504567890',
          lastMessage: 'Selling penthouse in Marina - premium location',
          lastMessageTime: '7:20 AM',
          unread: 0,
          hasOpportunity: true,
          opportunityConfidence: 85,
        },
        {
          id: 'chat_5',
          name: 'Khalid Rashid',
          phone: '+971505678901',
          lastMessage: 'Townhouse in Jumeirah for lease agreement',
          lastMessageTime: 'Yesterday',
          unread: 3,
          hasOpportunity: true,
          opportunityConfidence: 88,
        },
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      setLoading(true);
      const timer = setTimeout(() => {
        const mockMessages: ChatMessageItem[] = [
          {
            id: 'msg_1',
            sender: selectedConversation.name,
            isMe: false,
            content: 'Hi, I have a property for rent in Dubai',
            timestamp: '10:15 AM',
            hasOpportunity: false,
          },
          {
            id: 'msg_2',
            sender: 'Linda',
            isMe: true,
            content: 'Great! Tell me more about the property',
            timestamp: '10:16 AM',
            hasOpportunity: false,
          },
          {
            id: 'msg_3',
            sender: selectedConversation.name,
            isMe: false,
            content: selectedConversation.lastMessage,
            timestamp: selectedConversation.lastMessageTime,
            hasOpportunity: true,
            opportunity: {
              type: 'villa',
              location: 'Arabian Ranches',
              bedrooms: 4,
              price: 8000,
              currency: 'AED',
              frequency: 'monthly',
              availability: 'for_rent',
              furnishing: 'furnished',
              features: ['pool', 'gym', 'parking', 'garden'],
              confidence: 92,
            },
          },
        ];
        setMessages(mockMessages);
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedConversation]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) || conv.phone.includes(searchTerm);
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'opportunity' && conv.hasOpportunity) ||
      (filterStatus === 'unread' && conv.unread > 0);
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: ChatMessageItem = {
        id: `msg_${Date.now()}`,
        sender: 'Linda',
        isMe: true,
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasOpportunity: false,
      };
      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
    }
  };

  const handleQuickAddOpportunity = (opportunity: PropertyOpportunity) => {
    setSelectedOpportunity(opportunity);
    setShowOpportunity(true);
  };

  const handleConfirmAddToMary = () => {
    setShowOpportunity(false);
    setSelectedOpportunity(null);
  };

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    messages,
    searchTerm,
    setSearchTerm,
    messageInput,
    setMessageInput,
    filterStatus,
    setFilterStatus,
    showOpportunity,
    setShowOpportunity,
    selectedOpportunity,
    loading,
    filteredConversations,
    handleSendMessage,
    handleQuickAddOpportunity,
    handleConfirmAddToMary,
  };
}
