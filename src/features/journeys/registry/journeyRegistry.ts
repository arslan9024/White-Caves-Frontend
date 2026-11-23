/**
 * White Caves Flagship Journey Registry
 *
 * Defines the 20 Core Flagship Journeys across the Journey Families.
 * Fully backwards-compatible barrel and lookup service meeting AEG-042 (<350 lines).
 */

import { JourneyDefinition } from '../../../types/journey';
import { prepareTenancyContractJourney } from './tenancyContractJourney';
import { CORE_OPERATIONS_JOURNEYS } from './coreOperationsJourneys';
import { SPECIALIZED_JOURNEYS } from './specializedJourneys';

export const FLAGSHIP_JOURNEYS: Record<string, JourneyDefinition> = {
  'prepare-tenancy-contract': prepareTenancyContractJourney,
  ...CORE_OPERATIONS_JOURNEYS,
  ...SPECIALIZED_JOURNEYS,
};

export const getAllJourneys = (): JourneyDefinition[] => {
  return Object.values(FLAGSHIP_JOURNEYS);
};

export const getJourneyById = (id: string): JourneyDefinition | undefined => {
  return FLAGSHIP_JOURNEYS[id];
};

export const getJourneysByCategory = (category: string): JourneyDefinition[] => {
  return Object.values(FLAGSHIP_JOURNEYS).filter(j => j.category === category);
};

export * from './tenancyContractJourney';
export * from './coreOperationsJourneys';
export * from './specializedJourneys';
