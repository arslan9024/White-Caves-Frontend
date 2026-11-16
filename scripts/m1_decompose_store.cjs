const fs = require('fs');
const path = require('path');

function decomposeAiAssistantSlice() {
  const src = fs.readFileSync('src/store/slices/aiAssistantDashboardSlice.ts', 'utf8');
  const lines = src.split('\n');

  const baseDir = 'src/store/slices/aiAssistant';
  const caseDir = path.join(baseDir, 'caseReducers');
  if (!fs.existsSync(caseDir)) fs.mkdirSync(caseDir, { recursive: true });

  // 1. Thunks
  const thunkLines = lines.slice(105, 156);
  const thunkFile = [
    "import { createAsyncThunk } from '@reduxjs/toolkit';",
    "import { getErrorMessage } from '../../constants';",
    "import { AI_ASSISTANTS_REGISTRY } from './registry';",
    "import type { AIAssistant, AssistantMetrics } from './types';",
    "",
    ...thunkLines
  ].join('\n');
  fs.writeFileSync(path.join(baseDir, 'thunks.ts'), thunkFile);

  // 2. assistantUIReducers
  const uiReducerLines = lines.slice(160, 274);
  const uiReducerFile = [
    "/* eslint-disable security/detect-object-injection */",
    "import type { PayloadAction } from '@reduxjs/toolkit';",
    "import type { AIAssistantDashboardState } from '../types';",
    "import { MAX_RECENT_ASSISTANTS, MAX_ACTIVITY_LOG } from '../initialState';",
    "",
    "export const assistantUIReducers = {",
    ...uiReducerLines,
    "};",
    ""
  ].join('\n');
  fs.writeFileSync(path.join(caseDir, 'assistantUIReducers.ts'), uiReducerFile);

  // 3. taskNotificationReducers
  const taskNotifLines = lines.slice(274, 410);
  const taskNotifFile = [
    "/* eslint-disable security/detect-object-injection */",
    "import type { PayloadAction } from '@reduxjs/toolkit';",
    "import type { AIAssistantDashboardState, Notification, Task } from '../types';",
    "import { MAX_ACTIVITY_LOG } from '../initialState';",
    "",
    "export const taskNotificationReducers = {",
    ...taskNotifLines,
    "};",
    ""
  ].join('\n');
  fs.writeFileSync(path.join(caseDir, 'taskNotificationReducers.ts'), taskNotifFile);

  // 4. domainOperationReducers
  const domainLines = lines.slice(410, 657);
  const domainFile = [
    "/* eslint-disable security/detect-object-injection */",
    "import type { PayloadAction } from '@reduxjs/toolkit';",
    "import type {",
    "  AIAssistantDashboardState,",
    "  ExecutiveSuggestion,",
    "  ExecutiveSuggestionsState,",
    "  OliviaInsights,",
    "  OliviaCoordination,",
    "  MonitoredSite,",
    "  Lead,",
    "} from '../types';",
    "import { MAX_AUDIT_LOG } from '../initialState';",
    "",
    "export const domainOperationReducers = {",
    ...domainLines,
    "};",
    ""
  ].join('\n');
  fs.writeFileSync(path.join(caseDir, 'domainOperationReducers.ts'), domainFile);

  // 5. taskLifecycleReducers
  const taskLifecycleLines = lines.slice(657, 870);
  const taskLifecycleFile = [
    "/* eslint-disable security/detect-object-injection */",
    "import type { PayloadAction } from '@reduxjs/toolkit';",
    "import type {",
    "  AIAssistantDashboardState,",
    "  TaskLifecycleStage,",
    "  TaskAction,",
    "  TaskResult,",
    "} from '../types';",
    "",
    "export const taskLifecycleReducers = {",
    ...taskLifecycleLines,
    "};",
    ""
  ].join('\n');
  fs.writeFileSync(path.join(caseDir, 'taskLifecycleReducers.ts'), taskLifecycleFile);

  // 6. extraReducers
  const extraReducerBody = lines.slice(870, 909);
  const extraReducerFile = [
    "import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';",
    "import { logout } from '../authSlice';",
    "import type { AIAssistantDashboardState } from './types';",
    "import { fetchAllAssistants, updateAssistantMetricsAsync, fetchAssistantPlan } from './thunks';",
    "import { getInitialState } from './initialState';",
    "",
    "export const addAIAssistantExtraReducers = (builder: ActionReducerMapBuilder<AIAssistantDashboardState>) => {",
    "  builder",
    ...extraReducerBody.slice(1, -1),
    "};",
    ""
  ].join('\n');
  fs.writeFileSync(path.join(baseDir, 'extraReducers.ts'), extraReducerFile);

  // 7. Facade
  const facadeLines = [
    "// ============================================================================",
    "// AI ASSISTANT DASHBOARD SLICE — 100% Backwards-Compatible Facade",
    "// ============================================================================",
    "/* eslint-disable security/detect-object-injection */",
    "",
    "import { createSlice } from '@reduxjs/toolkit';",
    "import { getInitialState } from './aiAssistant/initialState';",
    "import { assistantUIReducers } from './aiAssistant/caseReducers/assistantUIReducers';",
    "import { taskNotificationReducers } from './aiAssistant/caseReducers/taskNotificationReducers';",
    "import { domainOperationReducers } from './aiAssistant/caseReducers/domainOperationReducers';",
    "import { taskLifecycleReducers } from './aiAssistant/caseReducers/taskLifecycleReducers';",
    "import { addAIAssistantExtraReducers } from './aiAssistant/extraReducers';",
    "",
    "// ── Re-export types ──",
    "export type * from './aiAssistant/types';",
    "",
    "// ── Re-export selectors ──",
    "export * from './aiAssistant/selectors';",
    "",
    "// ── Re-export thunks ──",
    "export * from './aiAssistant/thunks';",
    "",
    "// ── Re-export constants ──",
    "export { DEPARTMENT_COLORS } from './aiAssistant/registry';",
    "",
    "const aiAssistantDashboardSlice = createSlice({",
    "  name: 'aiAssistantDashboard',",
    "  initialState: getInitialState(),",
    "  reducers: {",
    "    ...assistantUIReducers,",
    "    ...taskNotificationReducers,",
    "    ...domainOperationReducers,",
    "    ...taskLifecycleReducers,",
    "  },",
    "  extraReducers: addAIAssistantExtraReducers,",
    "});",
    "",
    ...lines.slice(909)
  ];
  fs.writeFileSync('src/store/slices/aiAssistantDashboardSlice.ts', facadeLines.join('\n'));
  console.log('Done decomposing aiAssistantDashboardSlice.ts');
}

decomposeAiAssistantSlice();
