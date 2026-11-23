import React from 'react';
import {
  AI_ASSISTANTS,
  DEPARTMENTS,
  useAIAssistants,
  AIAssistantsHeader,
  AIAssistantsFilters,
  AIAssistantsGrid,
} from './aiAssistants';

export * from './aiAssistants';

export default function AIAssistantsCRMTab() {
  const {
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    setSelectedAssistant,
    filteredAssistants,
  } = useAIAssistants(AI_ASSISTANTS);

  return (
    <div>
      <AIAssistantsHeader />
      <AIAssistantsFilters
        selectedDept={selectedDept}
        onSelectDept={setSelectedDept}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        departmentList={DEPARTMENTS}
      />
      <AIAssistantsGrid assistants={filteredAssistants} onSelectAssistant={setSelectedAssistant} />
    </div>
  );
}
