import { EngineFeature } from './nativeEngine.types';

export const NINA_ENGINE_CATEGORIES = [
  'All',
  'Session & Auth',
  'Media & Documents',
  'Messaging & Events',
  'AI & Lead Analytics',
] as const;

export const NINA_NATIVE_FEATURES: EngineFeature[] = [
  {
    id: 'f1',
    name: 'LocalAuth Session Persistence Engine',
    category: 'Session & Auth',
    source: 'whatsapp-web.js Core',
    status: 'Active',
    description:
      'Saves Chrome session tokens locally so you never get logged out when restarting servers.',
  },
  {
    id: 'f2',
    name: '8-Digit Pairing Code & Vector QR Stream',
    category: 'Session & Auth',
    source: 'Hybrid Collaborative',
    status: 'Active',
    description:
      'Generates live 8-digit pairing codes (WC-5760-056A) and vector QR streams for +971 50 576 0056.',
  },
  {
    id: 'f3',
    name: 'PDF Contract & Media Message Engine',
    category: 'Media & Documents',
    source: 'whatsapp-web.js Core',
    status: 'Active',
    description:
      'Dispatches Ejari PDF contracts, DLD Form A/B/F forms, and high-res property image brochures directly.',
  },
  {
    id: 'f4',
    name: 'Location Pin & Contact VCard Share',
    category: 'Media & Documents',
    source: 'whatsapp-web.js Core',
    status: 'Ready',
    description:
      'Shares exact Google Maps GPS pins for DAMAC Hills 2 villas and agent VCards with prospective buyers.',
  },
  {
    id: 'f5',
    name: 'DAMAC Hills 2 (9,210 Props) Inventory Matcher',
    category: 'AI & Lead Analytics',
    source: 'Nina Native Engine',
    status: 'Optimized',
    description:
      'Queries 9,210 properties and 8,767 landlords in real-time when client asks for villa availability.',
  },
  {
    id: 'f6',
    name: 'Real-Time Event Hook Monitor (message_create, ack)',
    category: 'Messaging & Events',
    source: 'whatsapp-web.js Core',
    status: 'Active',
    description:
      'Tracks single tick (sent), double tick (delivered), and blue tick (read) message delivery states.',
  },
  {
    id: 'f7',
    name: 'Predictive Buyer Intent & Lead Scoring (0-100)',
    category: 'AI & Lead Analytics',
    source: 'Nina Native Engine',
    status: 'Optimized',
    description:
      'Scores buyer intent based on urgency keywords, budget match, and triggers escalation alerts.',
  },
  {
    id: 'f8',
    name: 'Multi-Device Session Recovery & Health Keep-Alive',
    category: 'Session & Auth',
    source: 'Hybrid Collaborative',
    status: 'Active',
    description: 'Auto-reconnects session if mobile network drops or battery status changes.',
  },
];
