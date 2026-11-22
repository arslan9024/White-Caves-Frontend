import React from 'react';
import { formatPercent, zoneBadge, zoneLabel } from './i18n';
import { MarketIntelligenceContent, PriceIndexRow, SortByField } from './types';

interface PriceIndexTabProps {
  zoneFilter: string;
  onZoneFilterChange: (zone: string) => void;
  sortBy: SortByField;
  onSortByChange: (field: SortByField) => void;
  sortedIndex: PriceIndexRow[];
  loading: boolean;
  isArabic: boolean;
  content: MarketIntelligenceContent;
  formatNumber: (value: number) => string;
  formatCurrency: (value: number) => string;
}

export const PriceIndexTab: React.FC<PriceIndexTabProps> = ({
  zoneFilter,
  onZoneFilterChange,
  sortBy,
  onSortByChange,
  sortedIndex,
  loading,
  isArabic,
  content,
  formatNumber,
  formatCurrency,
}) => (
  <div>
    <div className="flex gap-4 mb-4 items-center">
      <select
        value={zoneFilter}
        onChange={e => onZoneFilterChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 text-sm"
        aria-label={content.table.zone}
      >
        <option value="">{content.filters.allZones}</option>
        <option value="premium">{content.filters.premium}</option>
        <option value="prime">{content.filters.prime}</option>
        <option value="mid">{content.filters.mid}</option>
        <option value="affordable">{content.filters.affordable}</option>
      </select>
      <select
        value={sortBy}
        onChange={e => onSortByChange(e.target.value as SortByField)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 text-sm"
        aria-label={isArabic ? 'ترتيب النتائج' : 'Sort results'}
      >
        <option value="grossYield">{content.filters.sortYield}</option>
        <option value="avgPricePerSqft">{content.filters.sortPrice}</option>
      </select>
      <span className="text-gray-500 text-sm">
        {formatNumber(sortedIndex.length)} {content.filters.areas}
      </span>
    </div>

    {loading ? (
      <div className="text-center py-12 text-gray-500">{content.loading}</div>
    ) : (
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 text-gray-400 text-xs">
              <th className="px-4 py-3 text-left">{content.table.area}</th>
              <th className="px-4 py-3 text-left">{content.table.zone}</th>
              <th className="px-4 py-3 text-right">{content.table.priceSqft}</th>
              <th className="px-4 py-3 text-right">{content.table.annualRent}</th>
              <th className="px-4 py-3 text-right">{content.table.grossYield}</th>
              <th className="px-4 py-3 text-right">{content.table.transactions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedIndex.map(row => (
              <tr key={row.area} className="hover:bg-gray-700/40 transition">
                <td className="px-4 py-3 font-medium">{row.area}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${zoneBadge(row.zone)}`}
                  >
                    {zoneLabel(row.zone, isArabic)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-yellow-400 font-semibold">
                  {formatNumber(row.avgPricePerSqft)}
                </td>
                <td className="px-4 py-3 text-right text-green-400">
                  {formatCurrency(row.avgAnnualRent)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`font-bold ${row.grossYield >= 7 ? 'text-green-400' : row.grossYield >= 5 ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    {formatPercent(row.grossYield, isArabic, 1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-400">
                  {row.transactionVol ? formatNumber(row.transactionVol) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
