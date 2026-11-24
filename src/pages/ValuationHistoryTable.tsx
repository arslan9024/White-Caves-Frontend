import React from 'react';
import { ValuationRecord, fmt, methodLabel, confidenceBadge } from './valuationPage.helpers';

interface HistoryTableProps {
  history: ValuationRecord[];
}

export const ValuationHistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  return (
        {showOverride && (
          <form
            onSubmit={handleOverride}
            className="bg-gray-800 border border-yellow-700 rounded-xl p-6 mb-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Manual Override</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Override Value (AED)</label>
                <input
                  type="number"
                  value={overrideValue}
                  onChange={e => setOverrideValue(e.target.value)}
                  required
                  min="1"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Reason (required)</label>
                <input
                  type="text"
                  value={overrideReason}
                  onChange={e => setOverrideReason(e.target.value)}
                  required
                  minLength={5}
                  placeholder="e.g. RERA-certified valuer assessment"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={overrideLoading}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium"
              >
                {overrideLoading ? 'Saving…' : 'Save Override'}
              </button>
              <button
                type="button"
                onClick={() => setShowOverride(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* History Table */}
        {history.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Valuation History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs border-b border-gray-700">
                    <th className="pb-2 text-left">Date</th>
                    <th className="pb-2 text-right">Est. Value</th>
                    <th className="pb-2 text-right">Gross Yield</th>
                    <th className="pb-2 text-left">Method</th>
                    <th className="pb-2 text-left">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {history.map(h => (
                    <tr key={h.id} className="hover:bg-gray-700/30">
                      <td className="py-2 text-gray-300">
                        {new Date(h.createdAt).toLocaleDateString('en-AE')}
                      </td>
                      <td className="py-2 text-right text-yellow-400">
                        {fmt(h.estimatedValueAed)}
                      </td>
                      <td className="py-2 text-right text-green-400">{h.grossYieldPct}%</td>
                      <td className="py-2 text-gray-300">{methodLabel(h.method)}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${confidenceBadge(h.confidence)}`}
                        >
                          {h.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
  );
};
