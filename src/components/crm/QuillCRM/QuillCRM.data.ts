import { DocumentTemplate, RecentDocument } from './QuillCRM.types';

export const TEMPLATES: DocumentTemplate[] = [
  {
    id: 1,
    name: 'Sale & Purchase Agreement (RERA)',
    category: 'Sales',
    lang: 'EN/AR',
    lastUsed: '2h ago',
    uses: 48,
  },
  {
    id: 2,
    name: 'Memorandum of Understanding (MOU)',
    category: 'Sales',
    lang: 'EN',
    lastUsed: '4h ago',
    uses: 122,
  },
  {
    id: 3,
    name: 'Ejari Tenancy Contract',
    category: 'Leasing',
    lang: 'EN/AR',
    lastUsed: '1d ago',
    uses: 87,
  },
  {
    id: 4,
    name: 'NOC Request Letter',
    category: 'Admin',
    lang: 'EN/AR',
    lastUsed: '3d ago',
    uses: 31,
  },
  {
    id: 5,
    name: 'Commission Statement',
    category: 'Finance',
    lang: 'EN',
    lastUsed: '1d ago',
    uses: 56,
  },
  {
    id: 6,
    name: 'Investor Portfolio Report',
    category: 'Finance',
    lang: 'EN',
    lastUsed: '5d ago',
    uses: 14,
  },
];

export const RECENT_DOCS: RecentDocument[] = [
  {
    id: 1,
    title: 'SPA — Ahmad Al Rashidi × Palm Villa G-12',
    type: 'SPA',
    status: 'signed',
    created: '2h ago',
  },
  {
    id: 2,
    title: 'MOU — Priya Nair × Marina Gate 2BR',
    type: 'MOU',
    status: 'pending',
    created: '5h ago',
  },
  {
    id: 3,
    title: 'Commission Statement — Omar Siddiqui Jan 2024',
    type: 'Finance',
    status: 'sent',
    created: '1d ago',
  },
  {
    id: 4,
    title: 'Ejari — Fatima Al Suwaidi × JVC Studio',
    type: 'Lease',
    status: 'signed',
    created: '2d ago',
  },
];

export const statusColors: Record<string, string> = {
  signed: '#22C55E',
  pending: '#F59E0B',
  sent: '#3B82F6',
  draft: '#6B7280',
};

export const TEMPLATE_CATEGORIES = ['All', 'Sales', 'Leasing', 'Finance', 'Admin'];

