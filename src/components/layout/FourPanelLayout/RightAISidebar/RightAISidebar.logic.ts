/**
 * Right AI Sidebar — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing active assistant, search filtering, department accordions, favorites, and chat dispatch
 * Strictly < 350 lines
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssistants, DEPARTMENTS } from '../../../../config/assistantRegistry';
import { COLOR_TOKENS } from '../../../../styles/design-tokens/colors';
import socketService, {
  type LindaCampaignTelemetryPayload,
  type LindaHotLeadEscalationPayload,
} from '../../../../services/socketService';
import type { ChatMessage, AssistantInfo } from './RightAISidebar.types';

export function useRightAISidebarLogic(initialActive?: string) {
  const dispatch = useDispatch();
  const [activeAssistant, setActiveAssistant] = useState(initialActive || 'zoe');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sortBy, setSortBy] = useState<'department' | 'favorites'>('department');
  const [liveCampaignTelemetry, setLiveCampaignTelemetry] =
    useState<LindaCampaignTelemetryPayload | null>(null);
  const [hotLeadEscalations, setHotLeadEscalations] = useState<LindaHotLeadEscalationPayload[]>([]);

  useEffect(() => {
    const offCampaign = socketService.onLindaCampaignTelemetry(payload => {
      setLiveCampaignTelemetry(payload);
      setChatMessages(prev => [
        ...prev,
        {
          id: `campaign-${Date.now()}`,
          role: 'assistant',
          content: `📡 [${payload.campaignName}] Dispatched ${payload.totalDispatched}/${payload.dailyTarget} (${payload.skipped} skipped) — ${payload.status}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    });

    const offHotLead = socketService.onLindaHotLead(payload => {
      setHotLeadEscalations(prev => [payload, ...prev].slice(0, 10));
      setChatMessages(prev => [
        ...prev,
        {
          id: `hotlead-${payload.id || Date.now()}`,
          role: 'assistant',
          content: `🔥 HOT_LEAD [${payload.category}] ${payload.name} (${payload.phone}) in ${payload.project}: "${payload.inquiry}"`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    });

    return () => {
      offCampaign();
      offHotLead();
    };
  }, []);

  const allAssistants: AssistantInfo[] = getAllAssistants();
  const selectedAssistant = allAssistants.find(a => a.id === activeAssistant);

  const selectedObject = useSelector((state: any) => state.navigation?.selectedObject);
  const contextualAssistants: string[] = useSelector(
    (state: any) => state.ai?.contextualAssistants || []
  );

  const assistantsByDept = useMemo(() => {
    return allAssistants.reduce<Record<string, AssistantInfo[]>>((acc, assistant) => {
      if (!acc[assistant.department]) {
        acc[assistant.department] = [];
      }
      acc[assistant.department].push(assistant);
      return acc;
    }, {});
  }, [allAssistants]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return allAssistants
      .filter(
        a =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 12);
  }, [allAssistants, searchQuery]);

  const toggleFavorite = useCallback((assistantId: string) => {
    setFavorites(prev =>
      prev.includes(assistantId) ? prev.filter(id => id !== assistantId) : [...prev, assistantId]
    );
  }, []);

  const selectAssistant = useCallback(
    (assistantId: string) => {
      setActiveAssistant(assistantId);
      setChatMessages([]);
      dispatch({
        type: 'SELECT_ASSISTANT',
        payload: assistantId,
      });
    },
    [dispatch]
  );

  const toggleDepartment = useCallback((dept: string) => {
    setExpandedDepts(prev => ({
      ...prev,
      [dept]: !prev[dept],
    }));
  }, []);

  const getDeptColor = (dept: string) => {
    const deptConfig = (DEPARTMENTS as any)[dept];
    return deptConfig?.color || COLOR_TOKENS.primary.red;
  };

  const getAssistantStatus = (assistantId: string) => {
    const statuses = ['online', 'busy', 'offline'];
    const idx = (assistantId.charCodeAt(0) || 0) % statuses.length;
    return statuses[idx];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          content: `${selectedAssistant?.name || 'Assistant'} is processing your request: "${message.content}"`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 500);
  };

  return {
    activeAssistant,
    selectedAssistant,
    chatMessages,
    newMessage,
    setNewMessage,
    searchQuery,
    setSearchQuery,
    showChat,
    setShowChat,
    expandedDepts,
    favorites,
    showSearch,
    setShowSearch,
    sortBy,
    setSortBy,
    allAssistants,
    selectedObject,
    contextualAssistants,
    assistantsByDept,
    searchResults,
    toggleFavorite,
    selectAssistant,
    toggleDepartment,
    getDeptColor,
    getAssistantStatus,
    handleSendMessage,
    liveCampaignTelemetry,
    hotLeadEscalations,
  };
}

