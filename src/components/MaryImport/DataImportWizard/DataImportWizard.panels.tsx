/**
 * Data Import Wizard — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Upload, Preview, Validation, Review, and Execution steps
 * Strictly < 350 lines
 */

import React from 'react';
import ColumnMappingEditorRaw from '../ColumnMappingEditor';
import PreviewGridWithFiltersRaw from '../PreviewGridWithFilters';
import { authFetch } from '../../../utils/authFetch';
import type { ImportStrategy, ValidationResult, DuplicateRecord } from './DataImportWizard.types';

const ColumnMappingEditor = ColumnMappingEditorRaw as React.ComponentType<any>;
const PreviewGridWithFilters = PreviewGridWithFiltersRaw as React.ComponentType<any>;

export const UploadStepPanel: React.FC<{
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileUpload: (file: File | null) => void;
}> = ({ handleDragOver, handleDragLeave, handleDrop, handleFileUpload }) => (
  <div className="wizard-step">
    <h2>📤 Upload Your Excel File</h2>
    <p className="step-description">Select an Excel, CSV file for import</p>

    <div
      className="upload-dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <div className="upload-icon">📁</div>
      <p>Drag and drop your file here or click to browse</p>
      <p className="file-types">Supported: .xlsx, .xls, .csv</p>
    </div>

    <input
      id="file-input"
      type="file"
      accept=".xlsx,.xls,.csv"
      hidden
      onChange={e => handleFileUpload(e.target.files?.[0] || null)}
    />
  </div>
);

export const PreviewStepPanel: React.FC<{
  fileName: string;
  fileSize: number;
  totalRows: number;
  uploadTime: Date | null;
  sheetNames: string[];
  selectedSheet: string;
  setSelectedSheet: (sheet: string) => void;
  preview: Record<string, unknown>[];
}> = ({
  fileName,
  fileSize,
  totalRows,
  uploadTime,
  sheetNames,
  selectedSheet,
  setSelectedSheet,
  preview,
}) => (
  <div className="wizard-step">
    <h2>👀 Preview Your Data</h2>

    <div className="info-section">
      <div className="file-info">
        <p>
          <strong>File:</strong> {fileName} ({(fileSize / 1024 / 1024).toFixed(2)} MB)
        </p>
        <p>
          <strong>Total Rows:</strong> {totalRows}
        </p>
        <p>
          <strong>Uploaded:</strong> {uploadTime?.toLocaleString()}
        </p>
      </div>

      {sheetNames.length > 1 && (
        <div className="sheet-selection">
          <label>Select Sheet:</label>
          <select value={selectedSheet} onChange={e => setSelectedSheet(e.target.value)}>
            {sheetNames.map(sheet => (
              <option key={sheet} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>

    <div className="preview-table-container">
      <table className="preview-table">
        <thead>
          <tr>
            <th>#</th>
            {Object.keys(preview[0] || {})
              .slice(0, 8)
              .map(header => (
                <th key={header}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {preview.slice(0, 10).map((row, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              {Object.values(row)
                .slice(0, 8)
                .map((val, i) => (
                  <td key={i}>{String(val).substring(0, 30)}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="preview-note">Showing first 10 rows of {totalRows} total rows</p>
  </div>
);

export const MappingStepPanel: React.FC<{
  columns: string[];
  columnMapping: Record<string, string>;
  setColumnMapping: (mapping: Record<string, string>) => void;
}> = ({ columns, columnMapping, setColumnMapping }) => (
  <div className="wizard-step">
    <ColumnMappingEditor
      columns={columns}
      existingMapping={columnMapping}
      onMappingChange={setColumnMapping}
      onAutoDetect={async (cols: any, data: any) => {
        try {
          const response = await authFetch('/api/inventory/import/detect-mapping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ columns: cols, sampleData: data }),
          });
          const result = await response.json();
          return result.data.mapping;
        } catch {
          return columnMapping;
        }
      }}
    />
  </div>
);

export const ValidationStepPanel: React.FC<{
  importStrategy: ImportStrategy;
  setImportStrategy: (s: ImportStrategy) => void;
  validationResult: ValidationResult | null;
  preview: Record<string, unknown>[];
  columns: string[];
  columnMapping: Record<string, string>;
  isLoading: boolean;
  onApplyChanges: () => void;
  handleRunValidation: () => void;
}> = ({
  importStrategy,
  setImportStrategy,
  validationResult,
  preview,
  columns,
  columnMapping,
  isLoading,
  onApplyChanges,
  handleRunValidation,
}) => (
  <div className="wizard-step">
    <div className="validation-header">
      <h2>✅ Validate Data Quality</h2>
      <p className="step-description">Review validation results and fix errors</p>

      <div className="strategy-selector">
        <label>Import Strategy:</label>
        <select
          value={importStrategy}
          onChange={e => setImportStrategy(e.target.value as ImportStrategy)}
        >
          <option value="strict">Strict (Reject on any error)</option>
          <option value="balanced">Balanced (Default - Smart judgment)</option>
          <option value="lenient">Lenient (Import valid data, flag warnings)</option>
        </select>
        <p className="hint">
          {importStrategy === 'strict' && 'Strict mode requires all data to be perfectly valid.'}
          {importStrategy === 'balanced' &&
            'Balanced mode uses intelligent judgment to handle minor issues.'}
          {importStrategy === 'lenient' &&
            'Lenient mode imports valid data and flags warnings for review.'}
        </p>
      </div>
    </div>

    {validationResult && (
      <PreviewGridWithFilters
        data={preview}
        columns={columns}
        mapping={columnMapping}
        validationResult={validationResult}
        onApplyChanges={onApplyChanges}
      />
    )}

    {!validationResult && (
      <div className="validation-placeholder">
        <button className="btn btn-primary" onClick={handleRunValidation} disabled={isLoading}>
          {isLoading ? 'Validating...' : 'Run Validation'}
        </button>
      </div>
    )}
  </div>
);

export const ReviewStepPanel: React.FC<{
  fileName: string;
  fileSize: number;
  totalRows: number;
  columns: string[];
  importStrategy: ImportStrategy;
  deduplicationStrategy: string;
  validationResult: ValidationResult | null;
  duplicates: DuplicateRecord[];
  columnMapping: Record<string, string>;
  statusMapping: Record<string, string>;
}> = ({
  fileName,
  fileSize,
  totalRows,
  columns,
  importStrategy,
  deduplicationStrategy,
  validationResult,
  duplicates,
  columnMapping,
  statusMapping,
}) => (
  <div className="wizard-step">
    <h2>📋 Review Import Settings</h2>

    <div className="review-grid">
      <div className="review-card">
        <h3>File Information</h3>
        <ul>
          <li>
            <strong>File:</strong> {fileName}
          </li>
          <li>
            <strong>Size:</strong> {(fileSize / 1024 / 1024).toFixed(2)} MB
          </li>
          <li>
            <strong>Total Rows:</strong> {totalRows}
          </li>
          <li>
            <strong>Columns:</strong> {columns.length}
          </li>
        </ul>
      </div>

      <div className="review-card">
        <h3>Import Settings</h3>
        <ul>
          <li>
            <strong>Import Strategy:</strong> {importStrategy}
          </li>
          <li>
            <strong>Deduplication:</strong> {deduplicationStrategy}
          </li>
          <li>
            <strong>Validation:</strong>{' '}
            {validationResult?.isValid ? '✓ Passed' : '⚠ Review needed'}
          </li>
          <li>
            <strong>Duplicates:</strong> {duplicates.length} found
          </li>
        </ul>
      </div>

      <div className="review-card">
        <h3>Data Mapping</h3>
        <ul>
          <li>
            <strong>Mapped Columns:</strong> {Object.values(columnMapping).filter(Boolean).length}{' '}
            of {columns.length}
          </li>
          <li>
            <strong>Property Fields:</strong> Configured
          </li>
          <li>
            <strong>Owner Fields:</strong> Configured
          </li>
          <li>
            <strong>Status Mapping:</strong>{' '}
            {Object.keys(statusMapping).length > 0 ? '✓ Done' : '⚠ Pending'}
          </li>
        </ul>
      </div>
    </div>

    <div className="info-box">
      <h4>📊 Estimated Import Results</h4>
      <p>Your data will be processed as follows:</p>
      <ul>
        <li>Properties will be created/updated based on mapping</li>
        <li>Owner information will be separated and linked</li>
        <li>Duplicates will be handled per your deduplication strategy</li>
        <li>Status values will be mapped to multi-dimensional fields</li>
      </ul>
    </div>
  </div>
);

export const ExecuteStepPanel: React.FC<{
  importProgress: number;
  isLoading: boolean;
  onReset: () => void;
}> = ({ importProgress, isLoading, onReset }) => (
  <div className="wizard-step">
    <h2>▶️ Execute Import</h2>

    {importProgress > 0 && (
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${importProgress}%` }}></div>
        </div>
        <p className="progress-text">{importProgress}% Complete</p>
      </div>
    )}

    <button
      className="btn btn-success"
      onClick={onReset}
      disabled={isLoading || importProgress > 0}
    >
      {importProgress > 0 ? 'Importing...' : 'Start Import'}
    </button>
  </div>
);
