import { ContractTemplate } from './ContractBuilder.types';

export const DEFAULT_TEMPLATES: ContractTemplate[] = [
  {
    _id: 'tpl-residential-standard',
    name: 'Residential Lease — Standard',
    description: 'Standard residential tenancy agreement for apartments and villas.',
    category: 'Residential',
  },
  {
    _id: 'tpl-commercial-standard',
    name: 'Commercial Lease — Standard',
    description: 'Standard commercial lease agreement for office and retail spaces.',
    category: 'Commercial',
  },
];

