import React from 'react';
import {
  NINA_ENGINE_CATEGORIES,
  NINA_NATIVE_FEATURES,
  containerStyle,
  useNativeEngineSimulator,
  NativeEngineHeaderBanner,
  NativeEngineCategoryFilter,
  NativeEngineFeatureGrid,
  NativeEngineSimulatorPanel,
} from './nativeEngine';

export * from './nativeEngine';

export const NativeEngineTab: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    simulatedInput,
    setSimulatedInput,
    simulatedLog,
    handleSimulateEngine,
  } = useNativeEngineSimulator();

  const filteredFeatures = NINA_NATIVE_FEATURES.filter(f =>
    selectedCategory === 'All' ? true : f.category === selectedCategory
  );

  return (
    <div className="native-engine-tab" style={containerStyle}>
      <NativeEngineHeaderBanner />

      <NativeEngineCategoryFilter
        categories={NINA_ENGINE_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <NativeEngineFeatureGrid features={filteredFeatures} />

      <NativeEngineSimulatorPanel
        simulatedInput={simulatedInput}
        onInputChange={setSimulatedInput}
        onSubmit={handleSimulateEngine}
        logs={simulatedLog}
      />
    </div>
  );
};
