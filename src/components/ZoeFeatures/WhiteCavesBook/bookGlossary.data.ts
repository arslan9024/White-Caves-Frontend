import { TopicGlossaryItem } from './types';

export const TOPIC_GLOSSARY: Record<string, TopicGlossaryItem> = {
  Frontend: {
    targetSlug: 'chapter-01-architecture',
    category: 'Core Architecture',
    definition:
      'White-Caves-Frontend: React 19 + TypeScript + Vite CRM command center with 12 corporate floor modules.',
  },
  Server: {
    targetSlug: 'chapter-08-multi-repo-rbac',
    category: 'Multi-Repo Decoupling',
    definition:
      'White-Caves-Server: Node.js/Express 5 + Prisma ORM + MongoDB Atlas backend running on port 5001.',
  },
  Mobile: {
    targetSlug: 'chapter-08-multi-repo-rbac',
    category: 'Multi-Repo Decoupling',
    definition:
      'White-Caves-Mobile: React Native / Expo cross-platform mobile companion application.',
  },
  'White-Caves-Web': {
    targetSlug: 'chapter-07-web-decoupling',
    category: 'Multi-Repo Decoupling',
    definition: 'Decoupled public luxury portal running Next.js 16 App Router on Vercel.',
  },
  'TURING-LAW-000': {
    targetSlug: 'chapter-01-architecture',
    category: 'Core Architecture',
    definition:
      'Supreme law enforcing zero-waste AI credit spending, parallel tool batching, and sub-second execution velocity.',
  },
  'TURING-BOOK-011': {
    targetSlug: 'chapter-09-conversations-and-decisions',
    category: 'Living Chronicler',
    definition:
      'Sovereign law requiring every key architectural decision and conversational breakthrough to be preserved in the living book.',
  },
  'TURING-ROOT-007': {
    targetSlug: 'chapter-01-architecture',
    category: 'Core Architecture',
    definition:
      'Strict cleanliness law forbidding rogue root directories and consolidating all documentation under .agents/.',
  },
  'TURING-RULE-TIERS-012': {
    targetSlug: 'chapter-09-conversations-and-decisions',
    category: 'Living Chronicler',
    definition:
      'Hierarchical rule ingestion: Tier 1 Global (~/.gemini) -> Tier 2 Monorepo Umbrella -> Tier 3 Project Nodes.',
  },
  'Perpetual Ouroboros': {
    targetSlug: 'chapter-03-ouroboros',
    category: 'Autonomous Mesh',
    definition:
      'Non-stop autonomous autopilot loop continuously scanning, planning, delegating, verifying, and committing improvements.',
  },
  'Sovereign Mesh': {
    targetSlug: 'chapter-02-mesh',
    category: 'Autonomous Mesh',
    definition:
      'The AEGIS 1-12-108 dual-track multi-agent workforce spanning 108 engineering and 120 business nodes.',
  },
  'Henry OCR': {
    targetSlug: 'chapter-04-henry',
    category: 'Autonomous Mesh',
    definition:
      'Autonomous document parsing agent powered by in-browser Tesseract Web Workers for Title Deeds and Passports.',
  },
  'Mary Property Inventory': {
    targetSlug: 'chapter-05-mary',
    category: 'Domain & Actors',
    definition:
      'Inventory management supervisor enforcing real-time unit status synchronization and UAE statutory escrow tracking.',
  },
  'Domain Actors Matrix': {
    targetSlug: 'chapter-06-actors-matrix',
    category: 'Domain & Actors',
    definition:
      'High-precision operational matrix mapping actors to statutory permissions and department floors.',
  },
  'Progress Intelligence': {
    targetSlug: 'progress-intelligence',
    category: 'Living Chronicler',
    definition:
      'Real-time telemetry, automated velocity calculation, and milestone completion forecasting.',
  },
};
