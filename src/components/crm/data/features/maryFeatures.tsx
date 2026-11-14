import React from 'react';
import {
  Building2,
  Search,
  Eye,
  Tag,
  Shield,
  Users,
  TrendingUp,
  Database,
  DollarSign,
} from 'lucide-react';
import { AssistantFeatureItem } from './features.types';

export const MARY_FEATURES: AssistantFeatureItem[] = [
  {
    name: 'Property Inventory CRUD',
    category: 'Inventory Management',
    status: 'active',
    description:
      'Full create, read, update, delete operations for property listings with form validation.',
    sourceFiles: ['MaryInventoryCRM.jsx'],
    capabilities: ['Add properties', 'Edit listings', 'Delete properties', 'Bulk operations'],
    icon: <Building2 size={18} />,
  },
  {
    name: 'Smart Property Search',
    category: 'Search & Filter',
    status: 'active',
    description:
      'Advanced search with filters for type, purpose, price range, location, and specs.',
    sourceFiles: ['MaryInventoryCRM.jsx'],
    capabilities: ['Multi-filter', 'Price range', 'Location search', 'Spec matching'],
    icon: <Search size={18} />,
  },
  {
    name: 'Property Detail Views',
    category: 'Display',
    status: 'active',
    description:
      'Comprehensive property detail modals with images, specs, location, and agent info.',
    sourceFiles: ['MaryInventoryCRM.jsx', 'FullScreenDetailModal.jsx'],
    capabilities: ['Image gallery', 'Spec display', 'Agent card', 'Action buttons'],
    icon: <Eye size={18} />,
  },
  {
    name: 'Status Management',
    category: 'Inventory Management',
    status: 'active',
    description:
      'Track property status (available, reserved, sold, rented) with visual indicators.',
    sourceFiles: ['MaryInventoryCRM.jsx'],
    capabilities: ['Status tracking', 'Visual badges', 'History log', 'Bulk update'],
    icon: <Tag size={18} />,
  },
  {
    name: 'DLD/RERA Compliance',
    category: 'Compliance',
    status: 'active',
    description: 'Track Dubai Land Department numbers and RERA registration for compliance.',
    sourceFiles: ['MaryInventoryCRM.jsx'],
    capabilities: ['DLD tracking', 'RERA numbers', 'Expiry alerts', 'Compliance reports'],
    icon: <Shield size={18} />,
  },
  {
    name: 'Agent Assignment',
    category: 'Team Management',
    status: 'active',
    description: 'Assign properties to agents with workload tracking and performance metrics.',
    sourceFiles: ['MaryInventoryCRM.jsx'],
    capabilities: ['Agent assignment', 'Workload view', 'Performance link', 'Reassignment'],
    icon: <Users size={18} />,
  },
  {
    name: 'Analytics Dashboard',
    category: 'Analytics',
    status: 'active',
    description: 'Property analytics including views, inquiries, listing performance, and trends.',
    sourceFiles: ['MaryInventoryCRM.jsx'],
    capabilities: ['View tracking', 'Inquiry metrics', 'Performance trends', 'Comparison'],
    icon: <TrendingUp size={18} />,
  },
  {
    name: 'Import/Export Tools',
    category: 'Data Management',
    status: 'beta',
    description: 'Bulk import/export property data in CSV and Excel formats.',
    sourceFiles: ['MaryInventoryCRM.jsx'],
    capabilities: ['CSV import', 'Excel export', 'Data mapping', 'Validation'],
    nextMilestone: 'Add portal sync',
    icon: <Database size={18} />,
  },
  {
    name: 'AI Pricing Suggestions',
    category: 'AI Features',
    status: 'planned',
    description: 'AI-powered pricing recommendations based on market data and comparables.',
    capabilities: ['Market analysis', 'Comparable lookup', 'Price trends', 'ROI calculator'],
    nextMilestone: 'Integrate market data',
    icon: <DollarSign size={18} />,
  },
];
