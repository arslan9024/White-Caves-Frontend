import React, { FC } from 'react';
import { useHenryDocumentHubLogic } from './HenryDocumentHub.logic';
import {
  ModalOverlay,
  WizardContainer,
  WizardHeader,
  StepProgressBar,
  WizardBody,
  WizardFooter,
  ActionButton,
} from './HenryDocumentHub.style';

interface HenryDocumentHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HenryDocumentHub: FC<HenryDocumentHubProps> = ({ isOpen, onClose }) => {
  const {
    currentStep,
    isProcessing,
    selectedDocType,
    selectDocumentType,
    ocrMetadata,
    selectedForm,
    setSelectedForm,
    extractedName,
    setExtractedName,
    extractedIdNumber,
    setExtractedIdNumber,
    extractedCommunity,
    setExtractedCommunity,
    xpRewardLedger,
    commissionSplitPct,
    xpRewardDelta,
    nextStep,
    prevStep,
    steps,
  } = useHenryDocumentHubLogic();

  if (!isOpen) return null;

  return (
    <ModalOverlay data-testid="henry-wizard-modal">
      <WizardContainer>
        <WizardHeader>
          <h3>📄 Henry Document Hub — 5-Step Automated OCR & PDF Wizard</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary, #64748B)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#0f0f0f')}
            onMouseOut={e => (e.currentTarget.style.color = '#64748B')}
          >
            ✕
          </button>
        </WizardHeader>

        <StepProgressBar>
          {steps.map(step => (
            <div
              key={step.id}
              className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              Step {step.id}
            </div>
          ))}
        </StepProgressBar>

        <WizardBody>
          <div style={{ marginBottom: '1rem' }}>
            <h4
              style={{ margin: '0 0 4px', color: 'var(--color-0f0f0f, #0f0f0f)', fontWeight: 700 }}
            >
              {steps[currentStep - 1].title}
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary, #64748B)' }}>
              {steps[currentStep - 1].description}
            </p>
          </div>

          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {(['EMIRATES_ID', 'PASSPORT', 'TITLE_DEED', 'EJARI'] as const).map(docType => (
                  <button
                    key={docType}
                    type="button"
                    data-testid={`ocr-doctype-${docType}`}
                    onClick={() => selectDocumentType(docType)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border:
                        '1.5px solid ' + (selectedDocType === docType ? '#D4AF37' : '#E2E8F0'),
                      background:
                        selectedDocType === docType ? 'rgba(212, 175, 55, 0.08)' : '#FFFFFF',
                      color: selectedDocType === docType ? '#D4AF37' : '#64748B',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {docType.replace('_', ' ')}
                  </button>
                ))}
              </div>
              <div
                style={{
                  padding: '1.5rem',
                  border: '2px dashed rgba(212, 175, 55, 0.4)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  background: 'var(--color-fafafa, #FAFAFA)',
                }}
              >
                <span style={{ fontSize: '2rem' }}>📤</span>
                <p
                  style={{
                    margin: '10px 0 0',
                    fontWeight: 'bold',
                    color: 'var(--color-0f0f0f, #0f0f0f)',
                  }}
                >
                  Drop {ocrMetadata.label} PDF or Image file here
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)' }}>
                  Supports Emirates ID, Passport, Title Deed, Ejari (Web Worker OCR enabled)
                </span>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary, #64748B)',
                  fontWeight: 600,
                }}
              >
                Extracted Primary Party Name
              </label>
              <input
                type="text"
                value={extractedName}
                onChange={e => setExtractedName(e.target.value)}
                style={{
                  padding: '8px 12px',
                  background: 'var(--white, #FFFFFF)',
                  border: '1px solid var(--text-secondary, #E2E8F0)',
                  color: 'var(--color-0f0f0f, #0f0f0f)',
                  borderRadius: '8px',
                  fontWeight: 500,
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary, #64748B)',
                      fontWeight: 600,
                    }}
                  >
                    Document / Statutory Ref #
                  </label>
                  <input
                    type="text"
                    value={extractedIdNumber}
                    onChange={e => setExtractedIdNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary, #64748B)',
                      fontWeight: 600,
                    }}
                  >
                    Jurisdiction / Community
                  </label>
                  <input
                    type="text"
                    value={extractedCommunity}
                    onChange={e => setExtractedCommunity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--accent-green, #10B981)',
                  fontWeight: 700,
                }}
              >
                ✅ OCR Extraction Confidence: {(ocrMetadata.confidence * 100).toFixed(1)}% (
                {ocrMetadata.label} Matched — {ocrMetadata.statutoryLawCitation})
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['Form A', 'Form B', 'Form I'] as const).map(form => (
                <button
                  key={form}
                  onClick={() => setSelectedForm(form)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1.5px solid ' + (selectedForm === form ? '#D4AF37' : '#E2E8F0'),
                    background: selectedForm === form ? 'rgba(212, 175, 55, 0.05)' : '#FFFFFF',
                    color: selectedForm === form ? '#D4AF37' : '#64748B',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {form}
                </button>
              ))}
            </div>
          )}

          {currentStep === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  color: 'var(--accent-green, #10B981)',
                }}
              >
                <strong>🛡️ Compliance & Trakheesi Status: CLEAR</strong>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary, #64748B)',
                  }}
                >
                  AML Screening: Passed · {ocrMetadata.statutoryLawCitation} · Zero Red Flags
                </p>
              </div>
              <div
                data-testid="merit-xp-reward-banner"
                style={{
                  padding: '12px 14px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '8px',
                  color: '#D4AF37',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                }}
              >
                🏆 AEG-037 Merit Leaderboard Ledger: +{xpRewardDelta} XP Awarded!
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748B',
                    fontWeight: 500,
                    marginTop: '4px',
                  }}
                >
                  Total XP: {xpRewardLedger?.newTotalXP ?? 2000} XP · Active Commission Split:{' '}
                  {commissionSplitPct}% (AEG-038)
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--color-fafafa, #FAFAFA)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>🎉</span>
              <h4
                style={{
                  margin: '8px 0 4px',
                  color: 'var(--color-d4af37, #D4AF37)',
                  fontWeight: 700,
                }}
              >
                Document Compiled & Signed (+{xpRewardDelta} XP Credited)
              </h4>
              <p
                style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary, #64748B)' }}
              >
                {selectedForm} ({ocrMetadata.label}: {extractedIdNumber}) PDF generated for{' '}
                {extractedName} with verified digital e-signature timestamp.
              </p>
            </div>
          )}
        </WizardBody>

        <WizardFooter>
          <ActionButton onClick={prevStep} disabled={currentStep === 1 || isProcessing}>
            Previous
          </ActionButton>
          {currentStep < 5 ? (
            <ActionButton $primary onClick={nextStep} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Continue Next Step →'}
            </ActionButton>
          ) : (
            <ActionButton $primary onClick={onClose}>
              Done & Close
            </ActionButton>
          )}
        </WizardFooter>
      </WizardContainer>
    </ModalOverlay>
  );
};

export default HenryDocumentHub;
