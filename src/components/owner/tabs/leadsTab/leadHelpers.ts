import type { Lead } from '../types';

export interface LeadStats {
  total: number;
  new: number;
  qualified: number;
  highPriority: number;
}

export const computeLeadStats = (leads: Lead[]): LeadStats => ({
  total: leads.length,
  new: leads.filter(l => l.status === 'new').length,
  qualified: leads.filter(l => l.status === 'qualified').length,
  highPriority: leads.filter(l => l.priority === 'high').length,
});

export const filterLeads = (
  leads: Lead[],
  sourceFilter: string,
  statusFilter: string,
  priorityFilter: string
): Lead[] => {
  return leads.filter(lead => {
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
    return matchesSource && matchesStatus && matchesPriority;
  });
};

export const getSourceIcon = (source: string): string =>
  ({ whatsapp: '💬', website: '🌐', chatbot: '🤖', referral: '🤝', social: '📱' })[source] ?? '📋';

export const getStatusColor = (status: string): string =>
  ({ new: '#3B82F6', contacted: '#06B6D4', qualified: '#22C55E', lost: '#EF4444' })[status] ??
  '#6B7280';
