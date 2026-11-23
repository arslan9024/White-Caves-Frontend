import React from 'react';
import { Brain, Zap, Languages, MessageSquare, Search, Shuffle } from 'lucide-react';
import { NinaFeatureItem } from './types';

export const NINA_AI_FEATURES: NinaFeatureItem[] = [
  {
    name: 'AI Intent Classifier',
    category: 'AI/ML',
    status: 'active',
    description:
      'Open-source rule-based intent classification for 12 intents including property inquiry, viewing, negotiation, and opt-out. Zero API costs.',
    sourceFiles: ['AIServices.js'],
    capabilities: [
      '12 Intent Categories',
      'Weighted Keywords',
      'Arabic + English',
      'Context Patterns',
      'Custom Intent Support',
    ],
    icon: <Brain size={18} />,
    openSource: true,
    cost: 'Free',
  },
  {
    name: 'AI Sentiment Analyzer',
    category: 'AI/ML',
    status: 'active',
    description:
      'Free sentiment analysis with 3-tier lexicon (strong/moderate/mild), negation handling, and urgency detection.',
    sourceFiles: ['AIServices.js'],
    capabilities: [
      'Lexicon-based Analysis',
      'Negation Detection',
      'Intensifier Support',
      'Escalation Triggers',
      'Custom Lexicon',
    ],
    icon: <Zap size={18} />,
    openSource: true,
    cost: 'Free',
  },
  {
    name: 'AI Language Detector',
    category: 'AI/ML',
    status: 'active',
    description:
      'Unicode pattern-based language detection for Arabic, English, Hindi, Chinese, Russian, Urdu, Persian with RTL support.',
    sourceFiles: ['AIServices.js'],
    capabilities: [
      '7 Languages',
      'Script Analysis',
      'Mixed Language Detection',
      'RTL Support',
      'Bilingual Routing',
    ],
    icon: <Languages size={18} />,
    openSource: true,
    cost: 'Free',
  },
  {
    name: 'AI Response Generator',
    category: 'AI/ML',
    status: 'active',
    description:
      'Template-based response generation with multiple variations per intent, personalization tokens, and bilingual support.',
    sourceFiles: ['AIServices.js'],
    capabilities: [
      '8 Intent Templates',
      'Multiple Variations',
      'Personalization Tokens',
      'Custom Templates',
      'AR/EN Support',
    ],
    icon: <MessageSquare size={18} />,
    openSource: true,
    cost: 'Free',
  },
  {
    name: 'AI Entity Extractor',
    category: 'AI/ML',
    status: 'active',
    description:
      'Extract UAE phone numbers, emails, prices, bedrooms, locations, property types, and dates from messages using regex patterns.',
    sourceFiles: ['AIServices.js'],
    capabilities: [
      'UAE Phone Parsing',
      'Email Extraction',
      'Price Normalization',
      'Location Detection',
      '7 Entity Types',
    ],
    icon: <Search size={18} />,
    openSource: true,
    cost: 'Free',
  },
  {
    name: 'AI Smart Router',
    category: 'AI/ML',
    status: 'active',
    description:
      'Intelligent conversation routing based on lead score, intent, and sentiment to appropriate team members with SLA tracking.',
    sourceFiles: ['AIServices.js'],
    capabilities: [
      '6 Route Types',
      'Priority Assignment',
      'SLA Tracking',
      'Handler Mapping',
      'Escalation Logic',
    ],
    icon: <Shuffle size={18} />,
    openSource: true,
    cost: 'Free',
  },
];
