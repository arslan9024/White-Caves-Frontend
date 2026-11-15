export interface ApiMaintenanceRequest {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  priority: string;
  status: string;
  notes?: string | null;
  createdAt: string;
  property: { id: string; title: string; location: string } | null;
  requester: { id: string; name: string; email: string } | null;
}

export const FALLBACK_MAINTENANCE_REQUESTS: ApiMaintenanceRequest[] = [
  {
    id: 'req-001',
    title: 'AC not cooling in master bedroom',
    description: 'Central AC is running but temperature remains high.',
    category: 'HVAC',
    priority: 'high',
    status: 'open',
    notes: null,
    createdAt: '2026-01-10T08:30:00.000Z',
    property: { id: 'prop-1', title: 'Marina View 2BR Apartment', location: 'Dubai Marina' },
    requester: {
      id: 'tenant-1',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.ae',
    },
  },
  {
    id: 'req-002',
    title: 'Kitchen sink leakage',
    description: 'Leak under the sink causing water pooling in the cabinet.',
    category: 'Plumbing',
    priority: 'medium',
    status: 'in-progress',
    notes: null,
    createdAt: '2026-01-12T10:00:00.000Z',
    property: { id: 'prop-2', title: 'Downtown Studio', location: 'Downtown Dubai' },
    requester: {
      id: 'tenant-2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.ae',
    },
  },
  {
    id: 'req-003',
    title: 'Balcony door lock replacement',
    description: 'Existing lock is broken and cannot be secured.',
    category: 'Carpentry',
    priority: 'low',
    status: 'closed',
    notes: 'Completed and verified by tenant.',
    createdAt: '2026-01-05T09:00:00.000Z',
    property: { id: 'prop-3', title: 'JBR 3BR Villa', location: 'JBR' },
    requester: {
      id: 'tenant-3',
      name: 'Fatima Al-Mansoori',
      email: 'fatima.m@email.ae',
    },
  },
  {
    id: 'req-004',
    title: 'Water heater maintenance',
    description: 'Water temperature fluctuates and pressure drops frequently.',
    category: 'Mechanical',
    priority: 'high',
    status: 'open',
    notes: null,
    createdAt: '2026-01-15T12:15:00.000Z',
    property: { id: 'prop-1', title: 'Marina View 2BR Apartment', location: 'Dubai Marina' },
    requester: {
      id: 'tenant-4',
      name: 'Mohammed Hassan',
      email: 'm.hassan@email.ae',
    },
  },
];
