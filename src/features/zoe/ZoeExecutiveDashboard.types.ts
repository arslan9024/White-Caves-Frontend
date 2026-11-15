export interface BusinessMetrics {
  leadConversion: number;
  workflowCompletion: number;
  errorRate: number;
  apiResponseTime: number;
  concurrentUsers: number;
  contractExecution: number;
  complianceScore: number;
}

export interface RequirementItem {
  requirement: string;
  metric: string;
  target: string;
  actual: string;
  status: 'pending' | 'success' | 'warning' | 'failed' | string;
}

export interface EscalationItem {
  id: string;
  severity: string;
  service: string;
  timestamp: string;
  message: string;
}

export interface TimelinePhase {
  complete: boolean;
  tasks: unknown[];
}

export interface TimelineData {
  morning: TimelinePhase;
  afternoon: TimelinePhase;
  evening: TimelinePhase;
}

export interface ApprovedChange {
  timestamp: string;
  type: string;
  description: string;
  businessImpact: string;
}

export const DEFAULT_BUSINESS_METRICS: BusinessMetrics = {
  leadConversion: 0,
  workflowCompletion: 0,
  errorRate: 0,
  apiResponseTime: 0,
  concurrentUsers: 0,
  contractExecution: 0,
  complianceScore: 0,
};

export const DEFAULT_REQUIREMENTS: RequirementItem[] = [
  {
    requirement: 'All 6 roles login',
    metric: 'Auth Success',
    target: '100%',
    actual: '0%',
    status: 'pending',
  },
  {
    requirement: 'Lead pipeline',
    metric: 'Lead Conversion',
    target: '>10%',
    actual: '0%',
    status: 'pending',
  },
  {
    requirement: 'Viewing system',
    metric: 'Booking Completion',
    target: '95%+',
    actual: '0%',
    status: 'pending',
  },
  {
    requirement: 'Negotiations',
    metric: 'Offer Success',
    target: '75%+',
    actual: '0%',
    status: 'pending',
  },
  {
    requirement: 'Document system',
    metric: 'Doc Availability',
    target: '100%',
    actual: '0%',
    status: 'pending',
  },
  {
    requirement: 'Communication',
    metric: 'Message Delivery',
    target: '99%+',
    actual: '0%',
    status: 'pending',
  },
  {
    requirement: 'Analytics',
    metric: 'Report Accuracy',
    target: '100%',
    actual: '0%',
    status: 'pending',
  },
];
