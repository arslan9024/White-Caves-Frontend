/**
 * assistants108Taxonomy.data.ts — The 108 Operational Squad Taxonomy by Department
 * White Caves Real Estate LLC — 12 Corporate Departments × 9 Squads = 108 Operational Units
 * Standard: AEGIS Canonical Single Purpose (< 350 lines, AEG-042)
 */

import { TAXONOMY_GROUP1_FRONTLINE_PEOPLE } from './assistants108Taxonomy/group1_frontlinePeople.data';
import { TAXONOMY_GROUP2_CORE_OPS } from './assistants108Taxonomy/group2_coreOps.data';
import { TAXONOMY_GROUP3_GROWTH_MEDIA } from './assistants108Taxonomy/group3_growthMedia.data';
import { TAXONOMY_GROUP4_FINANCE_LEGAL_GOV } from './assistants108Taxonomy/group4_financeLegalGov.data';

export interface SquadBlueprint {
  name: string;
  title: string;
  specialty: string;
  tasks: string[];
}

export const SUPERVISOR_TAXONOMY_108: Record<string, SquadBlueprint[]> = {
  ...TAXONOMY_GROUP1_FRONTLINE_PEOPLE,
  ...TAXONOMY_GROUP2_CORE_OPS,
  ...TAXONOMY_GROUP3_GROWTH_MEDIA,
  ...TAXONOMY_GROUP4_FINANCE_LEGAL_GOV,
};
