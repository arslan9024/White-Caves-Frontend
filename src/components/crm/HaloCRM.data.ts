import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NpsItem {
  range: string;
  count: number;
  color: string;
  icon: LucideIcon;
}

export interface ReviewItem {
  id: number;
  client: string;
  score: number;
  comment: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export const NPS_DATA: NpsItem[] = [
  { range: 'Promoters (9–10)', count: 38, color: '#22C55E', icon: ThumbsUp },
  { range: 'Passives (7–8)', count: 14, color: '#F59E0B', icon: Minus },
  { range: 'Detractors (0–6)', count: 8, color: '#E31E24', icon: ThumbsDown },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    client: 'Ahmad Al Rashidi',
    score: 10,
    comment: 'White Caves made buying our dream villa seamless. Exceptional service throughout.',
    date: '2d ago',
    sentiment: 'positive',
  },
  {
    id: 2,
    client: 'Priya Nair',
    score: 9,
    comment: 'Very professional team. Nadia responded within minutes on WhatsApp!',
    date: '3d ago',
    sentiment: 'positive',
  },
  {
    id: 3,
    client: 'James Whitmore',
    score: 7,
    comment: 'Good experience overall, but paperwork took longer than expected.',
    date: '5d ago',
    sentiment: 'neutral',
  },
  {
    id: 4,
    client: 'Fatima Al Suwaidi',
    score: 10,
    comment: 'Best agency in Dubai. Would recommend to all my family and friends.',
    date: '1w ago',
    sentiment: 'positive',
  },
  {
    id: 5,
    client: 'Liu Yang',
    score: 5,
    comment: 'Translation of documents was delayed. Communication could be improved.',
    date: '1w ago',
    sentiment: 'negative',
  },
];

export const sentimentColors: Record<string, string> = {
  positive: '#22C55E',
  neutral: '#F59E0B',
  negative: '#E31E24',
};

export const totalNpsResponses = NPS_DATA.reduce((s, d) => s + d.count, 0);
export const npsScore = Math.round(
  ((NPS_DATA[0].count - NPS_DATA[2].count) / totalNpsResponses) * 100
);
