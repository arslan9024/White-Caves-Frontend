import React, { ChangeEvent } from 'react';
import { TaxFilingFormData, FormErrors, WizardStep } from './TaxFilingWizard.types';

export const StepIndicatorPanel: React.FC<{
  steps: WizardStep[];
  step: number;
}> = ({ steps, step }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((s, idx) => (
      <React.Fragment key={s.number}>
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step > s.number
                ? 'bg-green-600 dark:bg-green-500 text-white'
                : step === s.number
                  ? 'bg-red-600 dark:bg-red-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {step > s.number ? '✓' : s.number}
          </div>
          <p
            className={`text-xs mt-2 text-center ${
              step >= s.number
                ? 'text-slate-900 dark:text-white font-medium'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {s.title}
          </p>
        </div>
        {idx < steps.length - 1 && (
          <div
            className={`h-1 flex-1 mx-1 mb-6 ${
              step > s.number ? 'bg-green-600 dark:bg-green-500' : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

export const InputFieldPanel: React.FC<{
  label: string;
  name: keyof TaxFilingFormData;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string | number;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, type = 'text', placeholder, required = false, value, error, onChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
      {label}
      {required && <span className="text-red-600 dark:text-red-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors ${
        error
          ? 'border-red-600 dark:border-red-400'
          : 'border-slate-300 dark:border-slate-600 focus:border-red-600 dark:focus:border-red-400'
      } focus:outline-none`}
    />
    {error && (
      <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
        ⚠️ {error}
      </p>
    )}
  </div>
);

export const ReviewPanel: React.FC<{ formData: TaxFilingFormData }> = ({ formData }) => (
  <div>
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Review Information</h2>
    <div className="space-y-4 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Name:</span>
        <span className="text-slate-900 dark:text-white font-medium">
          {formData.firstName} {formData.lastName}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Tax ID:</span>
        <span className="text-slate-900 dark:text-white font-medium">{formData.taxId}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Total Revenue:</span>
        <span className="text-slate-900 dark:text-white font-medium">
          ${Number(formData.totalRevenue || 0).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Total Expenses:</span>
        <span className="text-slate-900 dark:text-white font-medium">
          ${Number(formData.totalExpenses || 0).toFixed(2)}
        </span>
      </div>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-400 mt-6">
      Please review the information above. You can go back to edit any details.
    </p>
  </div>
);

export const DocumentsPanel: React.FC<{
  formData: TaxFilingFormData;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  removeDocument: (idx: number) => void;
}> = ({ formData, handleFileUpload, removeDocument }) => (
  <div>
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Upload Documents</h2>
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">
        Required Documents
      </label>
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-2xl mb-2">📤</div>
          <p className="text-slate-900 dark:text-white font-medium">Click to upload</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">or drag and drop</p>
        </label>
      </div>
    </div>

    {formData.documents.length > 0 && (
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">
          Uploaded Files ({formData.documents.length})
        </p>
        {formData.documents.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span>📄</span>
              <span className="text-sm text-slate-900 dark:text-white">{file.name}</span>
            </div>
            <button
              onClick={() => removeDocument(idx)}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const SubmissionPanel: React.FC<{
  formData: TaxFilingFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}> = ({ formData, handleInputChange, errors }) => (
  <div>
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Final Submission</h2>
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <p className="text-sm text-blue-900 dark:text-blue-200">
        Review all information before submitting. Once submitted, you cannot edit these details.
      </p>
    </div>

    <div className="space-y-4 mb-6">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="agreement"
          checked={formData.agreement}
          onChange={handleInputChange}
          className="mt-1 w-4 h-4 accent-red-600 cursor-pointer"
        />
        <span className="text-slate-700 dark:text-slate-300 text-sm">
          I confirm that all information provided is accurate and complete
        </span>
      </label>
    </div>

    {errors.agreement && (
      <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1 mb-6">
        ⚠️ {errors.agreement}
      </p>
    )}
  </div>
);
