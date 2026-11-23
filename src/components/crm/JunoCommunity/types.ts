export type CommunityTab = 'booking' | 'maintenance' | 'service' | 'notices';

export interface Booking {
  id: string;
  amenity: string;
  tenant: string;
  date: string;
  time: string;
  status: 'CONFIRMED' | 'PENDING_APPROVAL' | string;
}

export interface MaintenanceTicket {
  id: string;
  unit: string;
  category: string;
  priority: 'CRITICAL' | 'HIGH' | 'LOW' | string;
  slaRemaining: string;
  status: string;
}

export interface CommunityNotice {
  id: number | string;
  title: string;
  date: string;
  impact: string;
  author: string;
}

export interface JunoCommunityProps {
  moduleId?: string;
  role?: string;
  user?: any;
}
