import React, { useState } from 'react';
import { Zap, Clock, CheckCircle, Activity } from 'lucide-react';
import { API_ENDPOINTS } from './data';

export const ApisTab: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="apis-view">
      <div className="apis-header">
        <h3>API Endpoints Performance</h3>
        <div className="time-range-selector">
          {['1h', '24h', '7d', '30d'].map(range => (
            <button
              key={range}
              className={timeRange === range ? 'active' : ''}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="api-list">
        {API_ENDPOINTS.map(api => (
          <div key={api.path} className="api-card">
            <div className="api-header">
              <span className={`method-badge ${api.method.toLowerCase()}`}>{api.method}</span>
              <span className="api-path">{api.path}</span>
              {api.cached && (
                <span className="cached-badge">
                  <Zap size={12} /> Cached
                </span>
              )}
            </div>
            <div className="api-metrics">
              <div className="metric">
                <Clock size={14} />
                <span>{api.avgTime}ms</span>
              </div>
              <div className="metric">
                <CheckCircle size={14} />
                <span>{api.successRate}%</span>
              </div>
              <div className="metric">
                <Activity size={14} />
                <span>{api.calls.toLocaleString()} calls</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
