import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Globe, Play, Pause, Square, Loader2, CheckCircle, 
  XCircle, Download, Trash2, Settings, Link, AlertTriangle,
  ChevronDown, ChevronUp, HelpCircle
} from 'lucide-react';
import './WebDataHarvester.css';
import { HarvestResult, HarvestError, HarvestConfig, HarvestStatus } from './WebDataHarvester.types';
import { HarvestConfigPanel } from './HarvestConfigPanel';

export * from './WebDataHarvester.types';

interface WebDataHarvesterProps {
  onDataHarvested?: (data: HarvestResult[]) => void;
}

const WebDataHarvester: React.FC<WebDataHarvesterProps> = ({ onDataHarvested }) => {
  const [baseUrl, setBaseUrl] = useState('');
  const [status, setStatus] = useState<HarvestStatus>('idle');
  const statusRef = useRef<HarvestStatus>('idle');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<HarvestResult[]>([]);
  const [errors, setErrors] = useState<HarvestError[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState<HarvestConfig>({
    startPage: 1,
    endPage: 10,
    delay: 1000,
    selectors: {
      name: '.owner-name',
      phone: '.phone-number',
      email: '.email',
      unit: '.unit-number'
    }
  });

  const parseUrlTemplate = (template: string): string[] => {
    const match = template.match(/\[(\d+):(\d+)\]/);
    if (match) {
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);
      const urls = [];
      for (let i = start; i <= end; i++) {
        urls.push(template.replace(/\[\d+:\d+\]/, i.toString()));
      }
      return urls;
    }
    return [template];
  };

  const simulateFetch = async (url: string, delay: number): Promise<HarvestResult> => {
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const success = Math.random() > 0.2;
    if (!success) {
      throw new Error(`Failed to fetch ${url}: Connection timeout`);
    }

    const mockNames = ['Mohammed Al-Rashid', 'Fatima Al-Sayed', 'Ahmed Khan', 'Sarah Johnson'];
    const mockPhones = ['+971 50 123 4567', '+971 55 987 6543', '+971 52 456 7890'];
    const mockUnits = ['Unit 401', 'Villa 12', 'Penthouse A', 'Suite 205'];

    return {
      url,
      data: {
        name: mockNames[Math.floor(Math.random() * mockNames.length)],
        phone: mockPhones[Math.floor(Math.random() * mockPhones.length)],
        email: `contact_${Date.now()}@example.com`,
        unit: mockUnits[Math.floor(Math.random() * mockUnits.length)]
      }
    };
  };

  const harvestData = useCallback(async (urls: string[]) => {
    setStatus('fetching');
    statusRef.current = 'fetching';
    setProgress({ current: 0, total: urls.length });

    for (let i = 0; i < urls.length; i++) {
      if (statusRef.current === 'stopped') break;
      while (statusRef.current === 'paused') {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setProgress({ current: i + 1, total: urls.length });

      try {
        const result = await simulateFetch(urls[i], config.delay);
        setResults(prev => [...prev, result]);
      } catch (err: unknown) {
        setErrors(prev => [...prev, {
          url: urls[i],
          error: err instanceof Error ? err.message : 'Unknown error'
        }]);
      }
    }

    if (statusRef.current !== 'stopped') {
      setStatus('completed');
      statusRef.current = 'completed';
    }
  }, [config.delay]);

  const handleStart = () => {
    const urls = parseUrlTemplate(baseUrl);
    setResults([]);
    setErrors([]);
    harvestData(urls);
  };

  const handlePause = () => {
    if (status === 'fetching') {
      setStatus('paused');
      statusRef.current = 'paused';
    } else if (status === 'paused') {
      setStatus('fetching');
      statusRef.current = 'fetching';
    }
  };

  const handleStop = () => {
    setStatus('stopped');
    statusRef.current = 'stopped';
  };

  const handleClear = () => {
    setResults([]);
    setErrors([]);
    setStatus('idle');
    statusRef.current = 'idle';
  };

  const exportResults = () => {
    const rows = [['URL', 'Name', 'Phone', 'Email', 'Unit']];
    results.forEach(r => {
      rows.push([r.url, r.data.name, r.data.phone, r.data.email, r.data.unit]);
    });
    
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'harvested_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="web-harvester">
      <div className="harvester-header">
        <div className="header-info">
          <Globe size={24} />
          <div>
            <h3>Web Data Harvester</h3>
            <span>Iterate through web pages to collect property data</span>
          </div>
        </div>
        <button 
          className="help-toggle"
          onClick={() => setShowHelp(!showHelp)}
        >
          <HelpCircle size={18} />
          {showHelp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {showHelp && (
        <div className="help-panel">
          <h4>URL Template Syntax</h4>
          <p>Use <code>[start:end]</code> to iterate through pages:</p>
          <div className="example">
            <code>https://directory.com/owners?page=[1:10]</code>
            <span>Will fetch pages 1 through 10</span>
          </div>
        </div>
      )}

      <div className="url-input-section">
        <div className="input-wrapper">
          <Link size={18} />
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://example.com/owners?page=[1:10]"
            disabled={status === 'fetching'}
          />
        </div>
        <button 
          className="config-toggle"
          onClick={() => setShowConfig(!showConfig)}
        >
          <Settings size={18} />
        </button>
      </div>

      {showConfig && <HarvestConfigPanel config={config} onChange={setConfig} />}

      <div className="harvester-controls">
        {status === 'idle' || status === 'completed' || status === 'stopped' ? (
          <button 
            className="control-btn primary" 
            onClick={handleStart}
            disabled={!baseUrl.trim()}
          >
            <Play size={18} /> Start Harvesting
          </button>
        ) : (
          <>
            <button className="control-btn" onClick={handlePause}>
              {status === 'paused' ? <Play size={18} /> : <Pause size={18} />}
              {status === 'paused' ? 'Resume' : 'Pause'}
            </button>
            <button className="control-btn danger" onClick={handleStop}>
              <Square size={18} /> Stop
            </button>
          </>
        )}

        {results.length > 0 && (
          <>
            <button className="control-btn" onClick={exportResults}>
              <Download size={18} /> Export CSV
            </button>
            <button className="control-btn danger" onClick={handleClear}>
              <Trash2 size={18} /> Clear
            </button>
          </>
        )}
      </div>

      {status === 'fetching' && (
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            <Loader2 size={14} className="spinning" />
            Fetching page {progress.current} of {progress.total}...
          </span>
        </div>
      )}

      {(results.length > 0 || errors.length > 0) && (
        <div className="results-summary">
          <div className="summary-item success">
            <CheckCircle size={16} />
            <span>{results.length} Successful</span>
          </div>
          <div className="summary-item error">
            <XCircle size={16} />
            <span>{errors.length} Failed</span>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="results-table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={result.data?.name ?? `result-${idx}`}>
                  <td>{result.data.name}</td>
                  <td>{result.data.phone}</td>
                  <td>{result.data.email}</td>
                  <td>{result.data.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {errors.length > 0 && (
        <div className="errors-section">
          <h4><AlertTriangle size={16} /> Failed Requests</h4>
          <div className="errors-list">
            {errors.map((err, idx) => (
              <div key={`${err.url}-${idx}`} className="error-item">
                <span className="error-url">{err.url}</span>
                <span className="error-msg">{err.error}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && status === 'completed' && (
        <div className="import-section">
          <AlertTriangle size={16} />
          <span>Review the harvested data, then import to your inventory</span>
          <button 
            className="import-btn"
            onClick={() => onDataHarvested?.(results)}
          >
            Import to CRM
          </button>
        </div>
      )}
    </div>
  );
};

export default WebDataHarvester;
