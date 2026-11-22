import React from 'react';
import { formatPercent } from './i18n';
import { CompetitorPricingRow, MarketIntelligenceContent } from './types';

interface CompetitorPricingTabProps {
  areaFilter: string;
  onAreaFilterChange: (area: string) => void;
  portalFilter: string;
  onPortalFilterChange: (portal: string) => void;
  competitorPricing: CompetitorPricingRow[];
  loading: boolean;
  isArabic: boolean;
  content: MarketIntelligenceContent;
  formatNumber: (value: number) => string;
}

export const CompetitorPricingTab: React.FC<CompetitorPricingTabProps> = ({
  areaFilter,
  onAreaFilterChange,
  portalFilter,
  onPortalFilterChange,
  competitorPricing,
  loading,
  isArabic,
  content,
  formatNumber,
}) => (
  <div>
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <input
        type="text"
        value={areaFilter}
        onChange={e => onAreaFilterChange(e.target.value)}
        placeholder={content.filters.areaPlaceholder}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 text-sm"
        aria-label={content.table.area}
      />
      <select
        value={portalFilter}
        onChange={e => onPortalFilterChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 text-sm"
        aria-label={content.filters.portal}
      >
        <option value="">{content.filters.allPortals}</option>
        <option value="bayut">Bayut</option>
        <option value="propertyfinder">Property Finder</option>
      </select>
    </div>

    {loading ? (
      <div className="text-center py-12 text-gray-500">{content.loading}</div>
    ) : (
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 text-gray-400 text-xs">
              <th className="px-4 py-3 text-left">{content.table.area}</th>
              <th className="px-4 py-3 text-left">{content.table.competitorPortal}</th>
              <th className="px-4 py-3 text-right">{content.table.priceSqft}</th>
              <th className="px-4 py-3 text-right">{content.table.deltaVsWhiteCaves}</th>
              <th className="px-4 py-3 text-right">{content.table.updatedAt}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {competitorPricing.map((row, index) => (
              <tr
                key={`${row.portal}-${row.area}-${index}`}
                className="hover:bg-gray-700/40 transition"
              >
                <td className="px-4 py-3 font-medium">{row.area}</td>
                <td className="px-4 py-3 text-gray-300">
                  {row.portal === 'propertyfinder' ? 'Property Finder' : 'Bayut'}
                </td>
                <td className="px-4 py-3 text-right text-yellow-400 font-semibold">
                  {formatNumber(row.avgPricePerSqft)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    row.deltaVsWhiteCavesPct >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {row.deltaVsWhiteCavesPct > 0 ? '+' : ''}
                  {formatPercent(row.deltaVsWhiteCavesPct, isArabic, 2)}
                </td>
                <td className="px-4 py-3 text-right text-gray-400">
                  {new Intl.DateTimeFormat(isArabic ? 'ar-AE' : 'en-AE', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }).format(new Date(row.updatedAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
