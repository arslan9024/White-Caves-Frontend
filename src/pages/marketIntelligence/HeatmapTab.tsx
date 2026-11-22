import React, { lazy, Suspense } from 'react';
import DubaiGeospatialClusterViewer from '../../components/maps/DubaiGeospatialClusterViewer';
import { MarketIntelligenceContent, PriceIndexRow } from './types';

const MarketChoroplethMap = lazy(() => import('../../components/maps/MarketChoroplethMap'));

interface HeatmapTabProps {
  sortedIndex: PriceIndexRow[];
  loading: boolean;
  isArabic: boolean;
  content: MarketIntelligenceContent;
}

export const HeatmapTab: React.FC<HeatmapTabProps> = ({
  sortedIndex,
  loading,
  isArabic,
  content,
}) => (
  <div>
    {loading ? (
      <div className="text-center py-12 text-gray-500">{content.loading}</div>
    ) : (
      <div className="space-y-6">
        <DubaiGeospatialClusterViewer />
        <div className="p-3 bg-blue-900/30 border border-blue-700 rounded-lg text-blue-300 text-sm">
          {isArabic
            ? 'خريطة حرارية تقريبية تعتمد على متوسط السعر لكل قدم مربعة بحسب المنطقة.'
            : 'Approximate choropleth heatmap based on average price per sqft by area.'}
        </div>
        <Suspense
          fallback={<div className="text-center py-6 text-gray-500">{content.loading}</div>}
        >
          <MarketChoroplethMap rows={sortedIndex} />
        </Suspense>
      </div>
    )}
  </div>
);
