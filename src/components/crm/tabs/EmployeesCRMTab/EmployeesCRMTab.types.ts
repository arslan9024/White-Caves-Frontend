export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  tier: 'corporate' | 'premium' | 'essential';
  avatar: string;
}

