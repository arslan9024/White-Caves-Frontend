/**
 * Data Import Wizard — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating progress indicator, step panels, and navigation
 * Strictly < 350 lines
 */

import React from 'react';
import { useDataImportWizardLogic } from './DataImportWizard.logic';
import { WIZARD_STEPS } from './DataImportWizard.types';
import {
  UploadStepPanel,
  PreviewStepPanel,
  MappingStepPanel,
  ValidationStepPanel,
  ReviewStepPanel,
  ExecuteStepPanel,
} from './DataImportWizard.panels';
import '../DataImportWizard.css';

export const DataImportWizard: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    fileName,
    fileSize,
    uploadTime,
    sheetNames,
    selectedSheet,
    setSelectedSheet,
    preview,
    columns,
    totalRows,
    columnMapping,
    setColumnMapping,
    validationResult,
    importStrategy,
    setImportStrategy,
    deduplicationStrategy,
    duplicates,
    statusMapping,
    isLoading,
    error,
    setError,
    importProgress,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRunValidation,
  } = useDataImportWizardLogic();

  return (
    <div className="data-import-wizard">
      <div className="wizard-progress">
        {WIZARD_STEPS.map(step => (
          <div
            key={step.number}
            className={`progress-step ${
              currentStep === step.number ? 'active' : ''
            } ${currentStep > step.number ? 'completed' : ''}`}
            onClick={() => currentStep > step.number && setCurrentStep(step.number)}
          >
            <span className="step-icon">{step.icon}</span>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="error-banner">
          <strong>Error:</strong> {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="wizard-content">
        {currentStep === 1 && (
          <UploadStepPanel
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileUpload={handleFileUpload}
          />
        )}
        {currentStep === 2 && (
          <PreviewStepPanel
            fileName={fileName}
            fileSize={fileSize}
            totalRows={totalRows}
            uploadTime={uploadTime}
            sheetNames={sheetNames}
            selectedSheet={selectedSheet}
            setSelectedSheet={setSelectedSheet}
            preview={preview}
          />
        )}
        {currentStep === 3 && (
          <MappingStepPanel
            columns={columns}
            columnMapping={columnMapping}
            setColumnMapping={setColumnMapping}
          />
        )}
        {currentStep === 4 && (
          <ValidationStepPanel
            importStrategy={importStrategy}
            setImportStrategy={setImportStrategy}
            validationResult={validationResult}
            preview={preview}
            columns={columns}
            columnMapping={columnMapping}
            isLoading={isLoading}
            onApplyChanges={() => setCurrentStep(5)}
            handleRunValidation={handleRunValidation}
          />
        )}
        {currentStep === 5 && (
          <ReviewStepPanel
            fileName={fileName}
            fileSize={fileSize}
            totalRows={totalRows}
            columns={columns}
            importStrategy={importStrategy}
            deduplicationStrategy={deduplicationStrategy}
            validationResult={validationResult}
            duplicates={duplicates}
            columnMapping={columnMapping}
            statusMapping={statusMapping}
          />
        )}
        {currentStep === 6 && (
          <ExecuteStepPanel
            importProgress={importProgress}
            isLoading={isLoading}
            onReset={() => setCurrentStep(1)}
          />
        )}
      </div>

      <div className="wizard-navigation">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1 || isLoading}
        >
          ← Back
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
          disabled={currentStep === 6 || isLoading}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DataImportWizard;
