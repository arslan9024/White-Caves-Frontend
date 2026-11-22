import React from 'react';
import { formatPercent } from './i18n';
import { IndicatorData, MarketIntelligenceContent } from './types';

interface IndicatorsTabProps {
  indicators: IndicatorData | null;
  loading: boolean;
  isArabic: boolean;
  content: MarketIntelligenceContent;
  formatNumber: (value: number) => string;
}

export const IndicatorsTab: React.FC<IndicatorsTabProps> = ({
  indicators,
  loading,
  isArabic,
  content,
  formatNumber,
}) => (
  <div>
    {loading ? (
      <div className="text-center py-12 text-gray-500">{content.loading}</div>
    ) : indicators ? (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-gray-400 text-xs mb-2">{content.indicators.avgDaysOnMarket}</div>
            <div className="text-3xl font-bold text-yellow-400">
              {formatNumber(indicators.avgDaysOnMarket)}
            </div>
            <div className="text-gray-500 text-xs mt-1">{content.indicators.days}</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-gray-400 text-xs mb-2">{content.indicators.absorptionRate}</div>
            <div className="text-3xl font-bold text-blue-400">
              {formatPercent(indicators.absorptionRate, isArabic, 1)}
            </div>
            <div className="text-gray-500 text-xs mt-1">{content.indicators.absorptionNote}</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-gray-400 text-xs mb-2">{content.indicators.newListings}</div>
            <div className="text-3xl font-bold text-green-400">
              {formatNumber(indicators.newListings)}
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-gray-400 text-xs mb-2">{content.indicators.activeListings}</div>
            <div className="text-3xl font-bold text-purple-400">
              {formatNumber(indicators.activeListings)}
            </div>
          </div>
        </div>
        {indicators.note && (
          <div className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg text-blue-300 text-sm">
            ℹ️ {indicators.note}
          </div>
        )}
        <div className="mt-4 text-gray-500 text-xs">
          {content.indicators.source} {indicators.source}
          {indicators.areasIncluded &&
            ` · ${formatNumber(indicators.areasIncluded)} ${content.indicators.areasIncluded}`}
        </div>
      </div>
    ) : null}
  </div>
);
