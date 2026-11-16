import React from 'react';
import { TaxFilingWizardProps } from './TaxFilingWizard.types';
import { TAX_WIZARD_STEPS } from './TaxFilingWizard.data';
import { useTaxFilingWizardLogic } from './TaxFilingWizard.logic';
import {
  StepIndicatorPanel,
  InputFieldPanel,
  ReviewPanel,
  DocumentsPanel,
  SubmissionPanel,
} from './TaxFilingWizard.panels';

export const TaxFilingWizardView: React.FC<TaxFilingWizardProps> = props => {
  const {
    step,
    formData,
    errors,
    handleNext,
    handlePrevious,
    handleInputChange,
    handleFileUpload,
    removeDocument,
    handleSubmit,
    onCancel,
  } = useTaxFilingWizardLogic(props);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Tax Filing Wizard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Complete your tax filing in 5 simple steps
          </p>
        </div>

        <StepIndicatorPanel steps={TAX_WIZARD_STEPS} step={step} />

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Basic Information
              </h2>
              <InputFieldPanel
                label="First Name"
                name="firstName"
                placeholder="John"
                required
                value={formData.firstName}
                error={errors.firstName}
                onChange={handleInputChange}
              />
              <InputFieldPanel
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                required
                value={formData.lastName}
                error={errors.lastName}
                onChange={handleInputChange}
              />
              <InputFieldPanel
                label="Tax ID / SSN"
                name="taxId"
                placeholder="XX-XXXXXXX"
                required
                value={formData.taxId}
                error={errors.taxId}
                onChange={handleInputChange}
              />
              <InputFieldPanel
                label="Business Name"
                name="businessName"
                placeholder="Your Business"
                value={formData.businessName}
                error={errors.businessName}
                onChange={handleInputChange}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Revenue & Expenses
              </h2>
              <InputFieldPanel
                label="Total Revenue"
                name="totalRevenue"
                type="number"
                placeholder="0.00"
                required
                value={formData.totalRevenue}
                error={errors.totalRevenue}
                onChange={handleInputChange}
              />
              <InputFieldPanel
                label="Gross Profit"
                name="grossProfit"
                type="number"
                placeholder="0.00"
                value={formData.grossProfit}
                error={errors.grossProfit}
                onChange={handleInputChange}
              />
              <InputFieldPanel
                label="Total Expenses"
                name="totalExpenses"
                type="number"
                placeholder="0.00"
                required
                value={formData.totalExpenses}
                error={errors.totalExpenses}
                onChange={handleInputChange}
              />
              <InputFieldPanel
                label="Deductible Expenses"
                name="deductibleExpenses"
                type="number"
                placeholder="0.00"
                value={formData.deductibleExpenses}
                error={errors.deductibleExpenses}
                onChange={handleInputChange}
              />
            </div>
          )}

          {step === 3 && <ReviewPanel formData={formData} />}

          {step === 4 && (
            <DocumentsPanel
              formData={formData}
              handleFileUpload={handleFileUpload}
              removeDocument={removeDocument}
            />
          )}

          {step === 5 && (
            <SubmissionPanel
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ← Previous
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white rounded-lg transition-colors font-medium"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white rounded-lg transition-colors font-medium"
            >
              Submit Filing
            </button>
          )}

          <button
            onClick={onCancel}
            className="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

