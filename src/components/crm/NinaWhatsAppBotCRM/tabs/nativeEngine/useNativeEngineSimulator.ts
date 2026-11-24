import React, { useState } from 'react';
import { SimulationLogItem } from './nativeEngine.types';
import { evaluateNinaEngineSimulation } from './nativeEngine.service';

export function useNativeEngineSimulator(initialInput?: string) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [simulatedInput, setSimulatedInput] = useState<string>(
    initialInput ?? 'Hi, what is the price of 3-bedroom villa in DAMAC Hills 2?'
  );
  const [simulatedLog, setSimulatedLog] = useState<SimulationLogItem[]>([]);

  const handleSimulateEngine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const evaluation = evaluateNinaEngineSimulation(simulatedInput);

    const logItem: SimulationLogItem = {
      time: timestamp,
      clientText: simulatedInput,
      detectedIntent: evaluation.intent,
      matchedVillasCount: evaluation.matchedCount,
      assignedLeadScore: evaluation.score,
      autoReply: evaluation.reply,
    };

    setSimulatedLog(prev => [logItem, ...prev]);
  };

  return {
    selectedCategory,
    setSelectedCategory,
    simulatedInput,
    setSimulatedInput,
    simulatedLog,
    handleSimulateEngine,
  };
}
