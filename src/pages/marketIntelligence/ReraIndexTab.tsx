import React from 'react';
import { propertyTypeLabel } from './i18n';
import { MarketIntelligenceContent, ReraRow } from './types';

interface ReraIndexTabProps {
  reraIndex: ReraRow[];
  loading: boolean;
  isArabic: boolean;
  content: MarketIntelligenceContent;
  formatCurrency: (value: number) => string;
}

export const ReraIndexTab: React.FC<ReraIndexTabProps> = ({
  reraIndex,
  loading,
  isArabic,
  content,
  formatCurrency,
}) => (
  <div>
    {loading ? (
      <div className="text-center py-12 text-gray-500">{content.loading}</div>
    ) : (
      <div>
        <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300 text-sm">
          {content.rera.notice}
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-xs">
                <th className="px-4 py-3 text-left">{content.table.area}</th>
                <th className="px-4 py-3 text-left">{content.table.type}</th>
                <th className="px-4 py-3 text-left">{content.table.beds}</th>
                <th className="px-4 py-3 text-right">{content.table.avgRent}</th>
                <th className="px-4 py-3 text-center" colSpan={5}>
                  {content.table.maxIncrease}
                </th>
              </tr>
              <tr className="bg-gray-900 text-gray-500 text-xs">
                <th colSpan={4} />
                {content.rera.bands.map(band => (
                  <th key={band} className="px-2 py-1 text-center">
                    {band}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {reraIndex.map((r, i) => (
                <tr key={i} className="hover:bg-gray-700/40">
                  <td className="px-4 py-3 font-medium">{r.area}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {propertyTypeLabel(r.propertyType, isArabic)}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{r.bedrooms}</td>
                  <td className="px-4 py-3 text-right text-yellow-400 font-semibold">
                    {formatCurrency(r.avgRentAed)}
                  </td>
                  <td className="px-2 py-3 text-center text-gray-400">
                    {r.allowedIncreaseBelow10Pct}
                  </td>
                  <td className="px-2 py-3 text-center text-yellow-400">
                    {r.allowedIncrease10to20Pct}
                  </td>
                  <td className="px-2 py-3 text-center text-orange-400">
                    {r.allowedIncrease20to30Pct}
                  </td>
                  <td className="px-2 py-3 text-center text-red-400">
                    {r.allowedIncrease30to40Pct}
                  </td>
                  <td className="px-2 py-3 text-center text-red-500">
                    {r.allowedIncreaseAbove40Pct}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);
