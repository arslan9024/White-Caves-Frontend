export type EchoTab = 'timeline' | 'clients' | 'channels' | 'docs' | 'lifecycle';

export interface EchoClient {
  id: number;
  name: string;
  lastContact: string;
  channel: string;
  totalInteractions: number;
  open: boolean;
}

export interface EchoTimelineItem {
  id: number;
  client: string;
  type: 'whatsapp' | 'call' | 'email' | 'viewing' | 'offer';
  content: string;
  time: string;
  agent: string;
}

export interface ChannelStat {
  label: string;
  count: number;
  color: string;
}
