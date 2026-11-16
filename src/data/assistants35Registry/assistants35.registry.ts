import type { AssistantDef } from './assistants35.types';
import { coreAgents } from './assistants35.coreAgents';
import { supportAgents } from './assistants35.supportAgents';
import { governanceAgents } from './assistants35.governanceAgents';

export const MASTER_35_AI_ASSISTANTS: AssistantDef[] = [
  ...coreAgents,
  ...supportAgents,
  ...governanceAgents,
];

