const fs = require('fs');
const path = require('path');

function decomposeAiAssistantTypes() {
  const src = fs.readFileSync('src/store/slices/aiAssistant/types.ts', 'utf8');
  const lines = src.split('\n');

  const dir = 'src/store/slices/aiAssistant/types';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Part 1: Core (lines 1 to 120)
  const core = lines.slice(0, 120).join('\n');
  fs.writeFileSync(path.join(dir, 'assistantCore.types.ts'), core.trim() + '\n');

  // Part 2: Task Lifecycle (lines 120 to 254)
  const taskLifecycle = lines.slice(120, 254).join('\n');
  fs.writeFileSync(path.join(dir, 'taskLifecycle.types.ts'), taskLifecycle.trim() + '\n');

  // Part 3: Domain Engines (lines 254 to 384)
  const domainEngines = lines.slice(254, 384).join('\n');
  fs.writeFileSync(path.join(dir, 'domainEngines.types.ts'), domainEngines.trim() + '\n');

  // Part 4: Dashboard State (lines 384 to 407)
  const dashboardImports = [
    "import type { AIAssistant, AssistantsRegistry, UIFilters, UIState, SidebarState, NotificationsState } from './assistantCore.types';",
    "import type { TasksState, Activity, AssistantPerformance, OwnerPreferences, LiveUpdates, ExecutiveSuggestionsState } from './taskLifecycle.types';",
    "import type { OliviaAutomationState, ConfidentialVaultState, LeadManagementHubState, ComplianceEngineState } from './domainEngines.types';",
    "",
    ""
  ].join('\n');
  const dashboard = dashboardImports + lines.slice(384).join('\n').trim() + '\n';
  fs.writeFileSync(path.join(dir, 'dashboardState.types.ts'), dashboard);

  // Facade
  const facade = [
    '// 100% Backwards-Compatible Facade',
    "export type * from './types/assistantCore.types';",
    "export type * from './types/taskLifecycle.types';",
    "export type * from './types/domainEngines.types';",
    "export type * from './types/dashboardState.types';",
    ''
  ].join('\n');
  fs.writeFileSync('src/store/slices/aiAssistant/types.ts', facade);
  console.log('Done decomposing aiAssistant/types.ts');
}

decomposeAiAssistantTypes();

