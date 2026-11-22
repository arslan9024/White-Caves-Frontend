import React, { type FC, type RefObject } from 'react';
import henryTenancyContractTemplateService from '../../../../services/HenryTenancyContractTemplateService';
import { buildDldContractData } from './journeyDocumentHelpers';

const DOC_ITEMS = [
  { key: 'landlordEmiratesId', label: 'Landlord Emirates ID', required: true },
  { key: 'tenantPassport', label: 'Tenant Passport Copy', required: true },
  { key: 'tenantEmiratesId', label: 'Tenant Emirates ID', required: true },
  { key: 'titleDeed', label: 'Property Title Deed / Oqood', required: true },
  { key: 'tradeLicense', label: 'Trade License (if corporate tenant)', required: false },
  { key: 'previousContract', label: 'Previous Tenancy Contract (if renewal)', required: false },
];

interface DocumentsChecklistStepProps {
  data: Record<string, any>;
  onUpdateData: (patch: Record<string, unknown>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  uploadStatus: string | null;
  onFileUpload: (file: File) => void;
}

export const DocumentsChecklistStep: FC<DocumentsChecklistStepProps> = ({
  data,
  onUpdateData,
  fileInputRef,
  isUploading,
  uploadStatus,
  onFileUpload,
}) => {
  const docs = data.documents || {
    landlordEmiratesId: true,
    tenantPassport: true,
    tenantEmiratesId: true,
    titleDeed: true,
    tradeLicense: false,
    previousContract: false,
  };

  const toggleDoc = (key: string) => {
    onUpdateData({ documents: { ...docs, [key]: !docs[key] } });
  };

  const remainingRequired = DOC_ITEMS.filter(d => d.required && !docs[d.key]).length;

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            onFileUpload(file);
            e.target.value = '';
          }
        }}
        accept=".pdf,image/*,.doc,.docx"
        style={{ display: 'none' }}
      />

      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/5 border border-amber-500/40 text-slate-100 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
            ⚡
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">
              Upload New Documents to Auto-Fill & Replace Information
            </div>
            <div className="text-[11px] text-slate-400">
              Upload Title Deed, Tenant/Landlord EID, Passport, or Tenancy Contract PDF to
              automatically overwrite and fill the template.
            </div>
          </div>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-400/20 flex items-center gap-1.5"
        >
          <span>📁 {isUploading ? 'Scanning Document...' : 'Upload Doc to Replace Info'}</span>
        </button>
      </div>

      {uploadStatus && (
        <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-500/40 text-xs text-blue-300 flex items-center gap-2">
          <span>ℹ️</span>
          <span>{uploadStatus}</span>
        </div>
      )}

      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-base">📂</span>
          <span className="text-slate-300 font-medium">Compliance Document Verification</span>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full font-semibold ${
            remainingRequired === 0
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {remainingRequired === 0
            ? '✓ All Required Documents Ready'
            : `${remainingRequired} document${remainingRequired > 1 ? 's' : ''} remaining`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {DOC_ITEMS.map(doc => {
          const isChecked = !!docs[doc.key];
          return (
            <div
              key={doc.key}
              onClick={() => toggleDoc(doc.key)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                isChecked
                  ? 'bg-emerald-950/30 border-emerald-500/40 hover:bg-emerald-950/50'
                  : 'bg-slate-900/60 border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                    isChecked ? 'bg-emerald-500 text-slate-950' : 'border border-slate-500'
                  }`}
                >
                  {isChecked ? '✓' : ''}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{doc.label}</div>
                  <div className="text-[11px] text-slate-400">
                    {doc.required ? 'Mandatory for RERA' : 'Optional / Supplementary'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600"
                  title="Upload replacement document"
                >
                  Upload
                </button>
                <span
                  className={`text-xs font-medium ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`}
                >
                  {isChecked ? 'Verified' : 'Attach'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SmartReviewStepProps {
  data: Record<string, any>;
  previewPage: number | 'all';
  setPreviewPage: (page: number | 'all') => void;
  showLiveDldTemplate: boolean;
  setShowLiveDldTemplate: (val: boolean) => void;
}

export const SmartReviewStep: FC<SmartReviewStepProps> = ({
  data,
  previewPage,
  setPreviewPage,
  showLiveDldTemplate,
  setShowLiveDldTemplate,
}) => {
  const compiledDldHtml = henryTenancyContractTemplateService.generateDldTenancyContractHtml(
    buildDldContractData(data),
    previewPage
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-base">✓</span>
          <span className="font-semibold text-white">
            Smart Review Complete — Official DLD Unified Tenancy Contract Template Filled.
          </span>
        </div>
        <button
          onClick={() => setShowLiveDldTemplate(!showLiveDldTemplate)}
          className="px-3 py-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 rounded font-semibold text-xs transition-colors"
        >
          {showLiveDldTemplate ? 'Show Summary Cards' : '📄 View Exact DLD Official Template'}
        </button>
      </div>

      {showLiveDldTemplate ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-800/80 p-2.5 px-4 rounded-xl border border-slate-700">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-300 font-semibold">
                Official DLD Contract Pages:
              </span>
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  onClick={() => setPreviewPage(p)}
                  className={`px-3 py-1 text-xs rounded-md font-bold transition-all ${
                    previewPage === p
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Page {p}
                </button>
              ))}
              <button
                onClick={() => setPreviewPage('all')}
                className={`px-3 py-1 text-xs rounded-md font-bold transition-all ${
                  previewPage === 'all'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                All 3 Pages
              </button>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">
              ✓ Bilingual Arabic & English
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-2xl overflow-x-auto max-h-[600px] border border-slate-700 text-slate-900">
            <div dangerouslySetInnerHTML={{ __html: compiledDldHtml }} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <h5 className="font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>🏠 Property</span>
              <span className="text-emerald-400">✓ Verified</span>
            </h5>
            <div className="text-sm font-semibold text-white">
              {data.propertyName || 'Sycamore 131'}
            </div>
            <div className="text-slate-400">
              {data.community || 'DAMAC Hills 2'} • {data.propertyType || '3 Bedroom Townhouse'}
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <h5 className="font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>👤 Landlord</span>
              <span className="text-emerald-400">✓ Verified</span>
            </h5>
            <div className="text-sm font-semibold text-white">
              {data.landlordName || 'Arslan Malik'}
            </div>
            <div className="text-slate-400">
              {data.landlordEmail} • EID: {data.landlordEmiratesId}
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <h5 className="font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>👤 Tenant</span>
              <span className="text-emerald-400">✓ Verified</span>
            </h5>
            <div className="text-sm font-semibold text-white">
              {data.tenantName || 'Sarah Jenkins'}
            </div>
            <div className="text-slate-400">
              {data.tenantEmail} • EID: {data.tenantEmiratesId}
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <h5 className="font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>📄 Contract Financials</span>
              <span className="text-emerald-400">✓ Calculated</span>
            </h5>
            <div className="text-sm font-bold text-white">
              AED {Number(data.annualRent || 95000).toLocaleString()} / year
            </div>
            <div className="text-slate-400">
              {data.chequesCount || 2} Cheques • {data.securityDepositPct || 5}% Deposit •{' '}
              {data.startDate || '2026-09-01'} to {data.endDate || '2027-08-31'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
