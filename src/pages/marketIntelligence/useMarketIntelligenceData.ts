import { useState, useEffect } from 'react';
import { CompetitorPricingRow, IndicatorData, PriceIndexRow, ReraRow, Tab } from './types';

interface UseMarketIntelligenceParams {
  activeTab: Tab;
  zoneFilter: string;
  areaFilter: string;
  portalFilter: string;
  isArabic: boolean;
}

interface UseMarketIntelligenceResult {
  priceIndex: PriceIndexRow[];
  indicators: IndicatorData | null;
  reraIndex: ReraRow[];
  competitorPricing: CompetitorPricingRow[];
  loading: boolean;
  error: string;
}

const authFetch = (url: string): Promise<Response> => {
  const token = localStorage.getItem('token') ?? '';
  return fetch(url, { headers: { Authorization: `Bearer ${token}` } });
};

export function useMarketIntelligenceData({
  activeTab,
  zoneFilter,
  areaFilter,
  portalFilter,
  isArabic,
}: UseMarketIntelligenceParams): UseMarketIntelligenceResult {
  const [priceIndex, setPriceIndex] = useState<PriceIndexRow[]>([]);
  const [indicators, setIndicators] = useState<IndicatorData | null>(null);
  const [reraIndex, setReraIndex] = useState<ReraRow[]>([]);
  const [competitorPricing, setCompetitorPricing] = useState<CompetitorPricingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPriceIndex = async () => {
      setLoading(true);
      setError('');
      try {
        const url = `/api/market/price-index${zoneFilter ? `?zone=${zoneFilter}` : ''}`;
        const res = await authFetch(url);
        const json = await res.json();
        if (json.success) setPriceIndex(json.data);
        else
          setError(
            json.message ?? (isArabic ? 'تعذر تحميل مؤشر الأسعار.' : 'Failed to load price index.')
          );
      } catch {
        setError(
          isArabic
            ? 'خطأ في الشبكة أثناء تحميل مؤشر الأسعار.'
            : 'Network error loading price index.'
        );
      } finally {
        setLoading(false);
      }
    };

    const loadIndicators = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await authFetch('/api/market/indicators');
        const json = await res.json();
        if (json.success) setIndicators(json.data);
        else
          setError(
            json.message ?? (isArabic ? 'تعذر تحميل المؤشرات.' : 'Failed to load indicators.')
          );
      } catch {
        setError(
          isArabic ? 'خطأ في الشبكة أثناء تحميل المؤشرات.' : 'Network error loading indicators.'
        );
      } finally {
        setLoading(false);
      }
    };

    const loadReraIndex = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await authFetch('/api/market/rera-index');
        const json = await res.json();
        if (json.success) setReraIndex(json.data);
        else
          setError(
            json.message ?? (isArabic ? 'تعذر تحميل مؤشر ريرا.' : 'Failed to load RERA index.')
          );
      } catch {
        setError(
          isArabic ? 'خطأ في الشبكة أثناء تحميل مؤشر ريرا.' : 'Network error loading RERA index.'
        );
      } finally {
        setLoading(false);
      }
    };

    const loadCompetitorPricing = async () => {
      setLoading(true);
      setError('');
      try {
        const query = new URLSearchParams();
        if (areaFilter) query.set('area', areaFilter);
        if (portalFilter) query.set('portal', portalFilter);
        const qs = query.toString();

        const res = await authFetch(`/api/market/competitor-pricing${qs ? `?${qs}` : ''}`);
        const json = await res.json();

        if (json.success) setCompetitorPricing(json.data);
        else
          setError(
            json.message ??
              (isArabic ? 'تعذر تحميل أسعار المنافسين.' : 'Failed to load competitor pricing.')
          );
      } catch {
        setError(
          isArabic
            ? 'خطأ في الشبكة أثناء تحميل أسعار المنافسين.'
            : 'Network error loading competitor pricing.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'price-index' || activeTab === 'heatmap') void loadPriceIndex();
    if (activeTab === 'indicators') void loadIndicators();
    if (activeTab === 'rera-index') void loadReraIndex();
    if (activeTab === 'competitor-pricing') void loadCompetitorPricing();
  }, [activeTab, zoneFilter, areaFilter, portalFilter, isArabic]);

  return {
    priceIndex,
    indicators,
    reraIndex,
    competitorPricing,
    loading,
    error,
  };
}
