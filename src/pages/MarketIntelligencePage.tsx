import React, { useState } from 'react';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import 'leaflet/dist/leaflet.css';
import { getMarketIntelligenceContent } from './marketIntelligence/i18n';
import { SortByField, Tab } from './marketIntelligence/types';
import { useMarketIntelligenceData } from './marketIntelligence/useMarketIntelligenceData';
import { PriceIndexTab } from './marketIntelligence/PriceIndexTab';
import { IndicatorsTab } from './marketIntelligence/IndicatorsTab';
import { ReraIndexTab } from './marketIntelligence/ReraIndexTab';
import { HeatmapTab } from './marketIntelligence/HeatmapTab';
import { CompetitorPricingTab } from './marketIntelligence/CompetitorPricingTab';

const TABS: Tab[] = ['price-index', 'indicators', 'rera-index', 'heatmap', 'competitor-pricing'];

export default function MarketIntelligencePage() {
  const { language, isRTL, formatCurrency, formatNumber } = useLanguage();
  const isArabic = language === LANGUAGES.AR;
  const [activeTab, setActiveTab] = useState<Tab>('price-index');
  const [zoneFilter, setZoneFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [portalFilter, setPortalFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortByField>('grossYield');

  const { priceIndex, indicators, reraIndex, competitorPricing, loading, error } =
    useMarketIntelligenceData({
      activeTab,
      zoneFilter,
      areaFilter,
      portalFilter,
      isArabic,
    });

  const sortedIndex = [...priceIndex].sort((a, b) => b[sortBy] - a[sortBy]);
  const content = getMarketIntelligenceContent(isArabic);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-gray-950 text-gray-100 p-6 ${isRTL ? 'text-right' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400">{content.title}</h1>
          <p className="text-gray-400 mt-1">{content.subtitle}</p>
        </div>

        <div className="flex gap-1 mb-6 bg-gray-800 p-1 rounded-xl w-fit">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? 'bg-yellow-500 text-gray-900'
                  : 'text-gray-400 hover:text-gray-100'
              }`}
            >
              {tab === 'price-index'
                ? content.tabs.priceIndex
                : tab === 'indicators'
                  ? content.tabs.indicators
                  : tab === 'rera-index'
                    ? content.tabs.reraIndex
                    : tab === 'heatmap'
                      ? content.tabs.heatmap
                      : content.tabs.competitorPricing}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {activeTab === 'price-index' && (
          <PriceIndexTab
            zoneFilter={zoneFilter}
            onZoneFilterChange={setZoneFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortedIndex={sortedIndex}
            loading={loading}
            isArabic={isArabic}
            content={content}
            formatNumber={formatNumber}
            formatCurrency={formatCurrency}
          />
        )}

        {activeTab === 'indicators' && (
          <IndicatorsTab
            indicators={indicators}
            loading={loading}
            isArabic={isArabic}
            content={content}
            formatNumber={formatNumber}
          />
        )}

        {activeTab === 'rera-index' && (
          <ReraIndexTab
            reraIndex={reraIndex}
            loading={loading}
            isArabic={isArabic}
            content={content}
            formatCurrency={formatCurrency}
          />
        )}

        {activeTab === 'heatmap' && (
          <HeatmapTab
            sortedIndex={sortedIndex}
            loading={loading}
            isArabic={isArabic}
            content={content}
          />
        )}

        {activeTab === 'competitor-pricing' && (
          <CompetitorPricingTab
            areaFilter={areaFilter}
            onAreaFilterChange={setAreaFilter}
            portalFilter={portalFilter}
            onPortalFilterChange={setPortalFilter}
            competitorPricing={competitorPricing}
            loading={loading}
            isArabic={isArabic}
            content={content}
            formatNumber={formatNumber}
          />
        )}
      </div>
    </div>
  );
}
