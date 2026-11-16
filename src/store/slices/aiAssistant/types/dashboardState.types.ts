import type { AIAssistant, AssistantsRegistry, UIFilters, UIState, SidebarState, NotificationsState } from './assistantCore.types';
import type { TasksState, Activity, AssistantPerformance, OwnerPreferences, LiveUpdates, ExecutiveSuggestionsState } from './taskLifecycle.types';
import type { OliviaAutomationState, ConfidentialVaultState, LeadManagementHubState, ComplianceEngineState } from './domainEngines.types';

export interface AIAssistantDashboardState {
  allAssistants: AssistantsRegistry;
  ui: UIState;
  sidebar: SidebarState;
  notifications: NotificationsState;
  tasks: TasksState;
  assistantPerformance: AssistantPerformance;
  favorites: string[];
  recent: string[];
  ownerPreferences: OwnerPreferences;
  liveUpdates: LiveUpdates;
  executiveSuggestions: ExecutiveSuggestionsState;
  oliviaAutomation: OliviaAutomationState;
  confidentialVault: ConfidentialVaultState;
  leadManagementHub: LeadManagementHubState;
  complianceEngine: ComplianceEngineState;
  initialized: boolean;
  /** Phase 0.8 — markdown plans keyed by assistant id */
  plans: Record<string, string | null>;
  plansLoading: Record<string, boolean>;
  plansError: Record<string, string | null>;
}

