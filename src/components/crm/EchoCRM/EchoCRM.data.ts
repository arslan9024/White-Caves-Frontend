import { MessageSquare, Phone, Mail, User, Bell } from 'lucide-react';
import { EchoClient, EchoTimelineItem, ChannelStat } from './EchoCRM.types';

export const CLIENTS: EchoClient[] = [
  {
    id: 1,
    name: 'Ahmad Al Rashidi',
    lastContact: '2h ago',
    channel: 'WhatsApp',
    totalInteractions: 34,
    open: true,
  },
  {
    id: 2,
    name: 'Priya Nair',
    lastContact: '1d ago',
    channel: 'Email',
    totalInteractions: 18,
    open: false,
  },
  {
    id: 3,
    name: 'James Whitmore',
    lastContact: '3d ago',
    channel: 'Call',
    totalInteractions: 52,
    open: false,
  },
  {
    id: 4,
    name: 'Fatima Al Suwaidi',
    lastContact: '5h ago',
    channel: 'WhatsApp',
    totalInteractions: 11,
    open: false,
  },
];

export const TIMELINE: EchoTimelineItem[] = [
  {
    id: 1,
    client: 'Ahmad Al Rashidi',
    type: 'whatsapp',
    content: 'Enquired about Palm Jumeirah Villa — requesting floor plan',
    time: '2h ago',
    agent: 'Nadia',
  },
  {
    id: 2,
    client: 'Ahmad Al Rashidi',
    type: 'call',
    content: 'Follow-up call — confirmed budget AED 8.5M, preferred move-in Q2',
    time: '1d ago',
    agent: 'Sophia',
  },
  {
    id: 3,
    client: 'Ahmad Al Rashidi',
    type: 'viewing',
    content: 'Property viewing — Frond G Villa, feedback: loved the beach access',
    time: '3d ago',
    agent: 'Clara',
  },
  {
    id: 4,
    client: 'Ahmad Al Rashidi',
    type: 'email',
    content: 'Sent property brochure + payment plan options',
    time: '4d ago',
    agent: 'Olivia',
  },
  {
    id: 5,
    client: 'Ahmad Al Rashidi',
    type: 'offer',
    content: 'Draft offer submitted: AED 8.2M — counter expected',
    time: '5d ago',
    agent: 'Sophia',
  },
  {
    id: 6,
    client: 'Ahmad Al Rashidi',
    type: 'whatsapp',
    content: 'Initial enquiry via website WhatsApp widget',
    time: '2w ago',
    agent: 'Nadia',
  },
];

export const typeConfig: Record<string, { color: string; icon: any; label: string }> = {
  whatsapp: { color: '#25D366', icon: MessageSquare, label: 'WhatsApp' },
  call: { color: '#3B82F6', icon: Phone, label: 'Call' },
  email: { color: '#F59E0B', icon: Mail, label: 'Email' },
  viewing: { color: '#8B5CF6', icon: User, label: 'Viewing' },
  offer: { color: '#E31E24', icon: Bell, label: 'Offer' },
};

export const CHANNEL_STATS: ChannelStat[] = [
  { label: 'WhatsApp', count: 22, color: '#25D366' },
  { label: 'Phone', count: 15, color: '#3B82F6' },
  { label: 'Email', count: 18, color: '#F59E0B' },
  { label: 'In-Person', count: 8, color: '#8B5CF6' },
];
