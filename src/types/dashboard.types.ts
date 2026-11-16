/**
 * White Caves CRM - Dashboard, WhatsApp & API Response Types
 */

export interface DashboardKPIs {
  salesMetrics: {
    monthlyTransactions: number;
    pipelineValue: number;
    conversionRate: number;
    avgTransactionValue: number;
  };
  agentMetrics: {
    totalAgents: number;
    activeAgents: number;
    topAgent: string;
    avgProductivity: number;
  };
  financialMetrics: {
    monthlyRevenue: number;
    monthlyProfit: number;
    profitMargin: number;
    avgCommission: number;
  };
  customerMetrics: {
    totalLeads: number;
    hotLeads: number;
    customerSatisfaction: number;
    repeatCustomers: number;
  };
  operationalMetrics: {
    systemUptime: number;
    avgResponseTime: number;
    supportTickets: number;
    resolvedTickets: number;
  };
}

export interface Report {
  id: string;
  title: string;
  type: 'sales' | 'financial' | 'performance' | 'custom';
  period: {
    startDate: Date;
    endDate: Date;
  };
  data: Record<string, any>;
  generatedBy: string;
  generatedAt: Date;
}

export interface WhatsAppMessage {
  id: string;
  conversationId: string;
  from: string;
  to: string;
  message: string;
  type: 'text' | 'image' | 'video' | 'document' | 'location';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: Date;
  botGenerated?: boolean;
  agentId?: string;
}

export interface WhatsAppConversation {
  id: string;
  phoneNumber: string;
  leadId?: string;
  agentId?: string;
  messages: WhatsAppMessage[];
  lastMessage: string;
  lastMessageTime: Date;
  status: 'open' | 'closed' | 'escalated';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    dismiss?: boolean;
  }>;
}

