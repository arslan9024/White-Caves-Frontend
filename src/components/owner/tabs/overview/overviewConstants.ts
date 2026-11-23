import type { OverviewData } from '../types';
import { colors } from '../../../../styles/theme/colors';

export const PRIMARY_COLOR: string = colors.primary;

export const formatPlainNumber = (value: number): string =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

export const formatAedCurrency = (value: number): string =>
  new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(value);

export interface OverviewStatItem {
  title: string;
  value: number;
  formatter: (value: number) => string;
  icon: string;
  color: string;
  change: string;
  trend: number[];
}

export interface QuickActionItem {
  id: number;
  title: string;
  icon: string;
  action: string;
  color: string;
}

export interface ModuleZone {
  title: string;
  modules: string[];
}

export const getOverviewStats = (
  data: OverviewData | undefined,
  homepageSearchLeads: number
): OverviewStatItem[] => [
  {
    title: 'Total Properties',
    value: data?.totalProperties ?? 0,
    formatter: formatPlainNumber,
    icon: '🏠',
    color: PRIMARY_COLOR,
    change: '+12%',
    trend: [54, 58, 63, 68, 73, 77, 82],
  },
  {
    title: 'Active Agents',
    value: data?.activeAgents ?? 0,
    formatter: formatPlainNumber,
    icon: '👥',
    color: '#2563EB',
    change: '+5%',
    trend: [8, 9, 10, 11, 12, 13, 15],
  },
  {
    title: 'Monthly Revenue',
    value: data?.monthlyRevenue ?? 0,
    formatter: formatAedCurrency,
    icon: '💰',
    color: PRIMARY_COLOR,
    change: '+18%',
    trend: [1.4, 1.8, 1.7, 2.0, 2.2, 2.35, 2.5],
  },
  {
    title: 'WhatsApp Leads',
    value: data?.whatsappLeads ?? 0,
    formatter: formatPlainNumber,
    icon: '💬',
    color: '#25D366',
    change: '+25%',
    trend: [16, 18, 23, 26, 31, 39, 45],
  },
  {
    title: 'UAE Pass Users',
    value: data?.uaepassUsers ?? 0,
    formatter: formatPlainNumber,
    icon: '🆔',
    color: '#ce1126',
    change: '+15%',
    trend: [28, 35, 42, 51, 61, 72, 80],
  },
  {
    title: 'Chatbot Chats',
    value: data?.chatbotConversations ?? 0,
    formatter: formatPlainNumber,
    icon: '🤖',
    color: '#8B5CF6',
    change: '+30%',
    trend: [120, 156, 189, 220, 258, 288, 320],
  },
  {
    title: 'Homepage Searches',
    value: homepageSearchLeads,
    formatter: formatPlainNumber,
    icon: '🌐',
    color: PRIMARY_COLOR,
    change: homepageSearchLeads > 0 ? `+${homepageSearchLeads}` : '—',
    trend: [0, 1, 1, 2, 3, 4, homepageSearchLeads || 4],
  },
];

export const QUICK_ACTIONS_CONFIG: QuickActionItem[] = [
  { id: 1, title: 'Add Property', icon: '➕', action: 'addProperty', color: '#22C55E' },
  { id: 2, title: 'Assign Agent', icon: '👤', action: 'assignAgent', color: '#3B82F6' },
  { id: 3, title: 'Generate Report', icon: '📊', action: 'generateReport', color: '#8B5CF6' },
  { id: 4, title: 'Train Chatbot', icon: '🤖', action: 'trainChatbot', color: '#F59E0B' },
  {
    id: 5,
    title: 'WhatsApp Broadcast',
    icon: '📢',
    action: 'whatsappBroadcast',
    color: '#25D366',
  },
  { id: 6, title: 'UAE Pass Users', icon: '🆔', action: 'viewUaePassUsers', color: '#ce1126' },
];

export const MODULE_ZONES_CONFIG: ModuleZone[] = [
  {
    title: '🔴 Executive Command',
    modules: ['ZoeExecutiveCRM', 'UnifiedCRM'],
  },
  {
    title: '📱 Sales & Leads',
    modules: ['ClaraLeadsCRM', 'SophiaSalesCRM', 'HunterProspectingCRM'],
  },
  {
    title: '🏠 Inventory',
    modules: ['MaryInventoryCRM', 'SentinelPropertyCRM'],
  },
  {
    title: '📋 Leasing',
    modules: ['DaisyLeasingCRM', 'EvangelineLegalCRM', 'VestaHandoverCRM'],
  },
  {
    title: '💰 Finance',
    modules: ['TheodoraFinanceCRM', 'MavenInvestmentCRM', 'CipherMarketCRM'],
  },
  {
    title: '💬 Communications',
    modules: ['NadiaWhatsAppCRM', 'LindaWhatsAppCRM', 'OliviaMarketingCRM'],
  },
  {
    title: '🤖 AI Command',
    modules: ['AICommandCenter', 'AgentTaskCockpit', 'ZoeConsole'],
  },
  {
    title: '⚙️ Operations',
    modules: ['NancyHRCRM', 'HenryAuditCRM', 'RERAComplianceModule', 'DLDIntegrationModule'],
  },
];

export const REVENUE_MONTHS_DATA = [
  { month: 'J', value: 1.2 },
  { month: 'F', value: 1.8 },
  { month: 'M', value: 1.5 },
  { month: 'A', value: 2.2 },
  { month: 'M', value: 1.9 },
  { month: 'J', value: 2.5 },
  { month: 'J', value: 2.1 },
  { month: 'A', value: 2.8 },
  { month: 'S', value: 2.4 },
  { month: 'O', value: 3.0 },
  { month: 'N', value: 2.7 },
  { month: 'D', value: 3.2 },
];

export const PROPERTY_DISTRIBUTION_DATA = [
  { label: 'Apartments 45%', percent: '45%', color: PRIMARY_COLOR },
  { label: 'Villas 25%', percent: '25%', color: '#3B82F6' },
  { label: 'Townhouses 15%', percent: '15%', color: '#22C55E' },
  { label: 'Commercial 10%', percent: '10%', color: '#F59E0B' },
  { label: 'Land 5%', percent: '5%', color: '#8B5CF6' },
];
