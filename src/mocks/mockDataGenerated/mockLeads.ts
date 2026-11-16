import { MockLead } from './mockDataGenerated.types';
import { MOCK_LEADS_PART1 } from './mockLeadsPart1';
import { MOCK_LEADS_PART2 } from './mockLeadsPart2';
import { MOCK_LEADS_PART3 } from './mockLeadsPart3';
import { MOCK_LEADS_PART4 } from './mockLeadsPart4';

export const MOCK_LEADS: MockLead[] = [
  ...MOCK_LEADS_PART1,
  ...MOCK_LEADS_PART2,
  ...MOCK_LEADS_PART3,
  ...MOCK_LEADS_PART4,
];

