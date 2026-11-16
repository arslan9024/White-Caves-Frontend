const fs = require('fs');
const path = require('path');

function decomposeAiAssistantSlice() {
  const src = fs.readFileSync('src/store/slices/aiAssistantDashboardSlice.ts', 'utf8');
  // If we already modified it, read from a backup if needed, but wait: let's check if the reducers in taskLifecycleReducers have the extra brace
  const file = 'src/store/slices/aiAssistant/caseReducers/taskLifecycleReducers.ts';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/    \},\n  \},\n\};/, '    },\n};');
  fs.writeFileSync(file, content);
  console.log('Fixed taskLifecycleReducers.ts');
}

decomposeAiAssistantSlice();
