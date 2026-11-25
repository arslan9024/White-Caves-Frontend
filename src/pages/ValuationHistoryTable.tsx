import React from 'react';
import { ValuationRecord, fmt, methodLabel, confidenceBadge } from './valuationPage.helpers';

interface HistoryTableProps {
  history: ValuationRecord[];
}

export const ValuationHistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
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
                <td className="py-2 text-right text-yellow-400">{fmt(h.estimatedValueAed)}</td>
                <td className="py-2 text-right text-green-400">{h.grossYieldPct}%</td>
                <td className="py-2 text-gray-300">{methodLabel(h.method)}</td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${confidenceBadge(h.confidence)}`}>
                    {h.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
