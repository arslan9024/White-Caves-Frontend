import { Activity, Zap, BarChart2, Bell } from 'lucide-react';

export interface FeedItem {
  id: number;
  type: 'transaction' | 'listing' | 'price' | 'news';
  msg: string;
  time: string;
  change: string | null;
}

export interface IndexCard {
  name: string;
  value: string;
  change: number;
  unit: string;
}

export const LIVE_FEED: FeedItem[] = [
  {
    id: 1,
    type: 'transaction',
    msg: 'Downtown 2BR sold — AED 2.1M · Bayut',
    time: '2m ago',
    change: '+2.8%',
  },
  {
    id: 2,
    type: 'listing',
    msg: 'New off-plan unit listed — Business Bay · Emaar',
    time: '5m ago',
    change: null,
  },
  {
    id: 3,
    type: 'price',
    msg: 'JVC Studio avg price down -0.3% this week',
    time: '12m ago',
    change: '-0.3%',
  },
  {
    id: 4,
    type: 'transaction',
    msg: 'Palm Jumeirah villa closed — AED 14.5M',
    time: '18m ago',
    change: '+1.2%',
  },
  {
    id: 5,
    type: 'news',
    msg: 'DLD: Q1 transactions up 42% YoY in Dubai',
    time: '1h ago',
    change: null,
  },
  {
    id: 6,
    type: 'price',
    msg: 'Marina Gate PSF up +0.6% after weekend surge',
    time: '2h ago',
    change: '+0.6%',
  },
];

export const INDEX_CARDS: IndexCard[] = [
  { name: 'Dubai Property Index', value: '1,842', change: +2.1, unit: 'pts' },
  { name: 'Luxury Index (5M+)', value: '4,210', change: +3.4, unit: 'AED/sqft' },
  { name: 'Rental Yield Index', value: '6.8%', change: -0.1, unit: '' },
  { name: 'Off-Plan Volume', value: '3,210', change: +18.2, unit: 'units/mo' },
];

export const typeConfig = {
  transaction: { color: '#22C55E', icon: Activity },
  listing: { color: '#3B82F6', icon: Zap },
  price: { color: '#F59E0B', icon: BarChart2 },
  news: { color: '#8B5CF6', icon: Bell },
};

