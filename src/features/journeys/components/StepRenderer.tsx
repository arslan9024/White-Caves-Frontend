import React, { useState, useEffect, useRef } from 'react';
import {
  JourneyStep,
  JourneySession,
  JourneyDefinition,
  JourneyResultOutcome,
} from '../../../types/journey';
import {
  buildCompletionOutcome,
  PROCESSING_TASKS,
  scanJourneyUploadedFile,
} from './stepRenderer/journeyDocumentHelpers';
import {
  ContractTermsStep,
  EntityReviewStep,
  EntitySelectionStep,
} from './stepRenderer/EntityAndTermsSteps';
import { DocumentsChecklistStep, SmartReviewStep } from './stepRenderer/DocumentsAndReviewSteps';
import { ProcessingStep, ResultOutcomeStep } from './stepRenderer/ProcessingAndResultSteps';

interface StepRendererProps {
  step: JourneyStep;
  session: JourneySession;
  definition: JourneyDefinition;
  onUpdateData: (patch: Record<string, unknown>) => void;
  onNext: () => void;
  onComplete: (resultPayload: JourneyResultOutcome) => void;
  onLaunchNextJourney: (journeyId: string) => void;
}

export const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  session,
  onUpdateData,
  onComplete,
  onLaunchNextJourney,
}) => {
  const data = session.data || {};
  const journeyFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState<number | 'all'>(1);
  const [showLiveDldTemplate, setShowLiveDldTemplate] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState(0);

  const handleJourneyFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadStatus(
      `Ingesting and parsing "${file.name}" (${(file.size / 1024).toFixed(1)} KB)...`
    );
    try {
      const msg = await scanJourneyUploadedFile(file, data, onUpdateData);
      setUploadStatus(msg);
    } catch {
      setUploadStatus(`Error processing "${file.name}". Please review manual fields.`);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadStatus(null), 5000);
    }
  };

  useEffect(() => {
    if (step.type === 'processing') {
      const interval = setInterval(() => {
        setProcessingStage(prev => {
          if (prev < PROCESSING_TASKS.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 450);
      return () => clearInterval(interval);
    }
  }, [step.type]);

  useEffect(() => {
    if (step.type === 'processing' && processingStage === PROCESSING_TASKS.length) {
      const timer = setTimeout(() => {
        onComplete(buildCompletionOutcome(data));
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [processingStage, step.type]);

  if (step.type === 'entity-selection' || step.id === 'property') {
    return <EntitySelectionStep data={data} onUpdateData={onUpdateData} />;
  }

  if (step.type === 'entity-review' || step.id === 'landlord' || step.id === 'tenant') {
    return (
      <EntityReviewStep
        data={data}
        onUpdateData={onUpdateData}
        isLandlord={step.id === 'landlord'}
      />
    );
  }

  if (step.type === 'form' || step.id === 'terms') {
    return <ContractTermsStep data={data} onUpdateData={onUpdateData} />;
  }

  if (step.type === 'checklist' || step.id === 'documents') {
    return (
      <DocumentsChecklistStep
        data={data}
        onUpdateData={onUpdateData}
        fileInputRef={journeyFileInputRef}
        isUploading={isUploading}
        uploadStatus={uploadStatus}
        onFileUpload={handleJourneyFileUpload}
      />
    );
  }

  if (step.type === 'smart-review' || step.id === 'review') {
    return (
      <SmartReviewStep
        data={data}
        previewPage={previewPage}
        setPreviewPage={setPreviewPage}
        showLiveDldTemplate={showLiveDldTemplate}
        setShowLiveDldTemplate={setShowLiveDldTemplate}
      />
    );
  }

  if (step.type === 'processing' || step.id === 'processing') {
    return <ProcessingStep processingStage={processingStage} />;
  }

  if (step.type === 'result' || step.id === 'result') {
    return (
      <ResultOutcomeStep
        data={data}
        result={session.result}
        onLaunchNextJourney={onLaunchNextJourney}
      />
    );
  }

  return (
    <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-700/60 text-slate-300 text-sm">
      <h4 className="font-semibold text-white mb-2">{step.title}</h4>
      <p>
        {step.description || 'Complete the necessary fields and verify information to advance.'}
      </p>
    </div>
  );
};
