import React, { FC, lazy, Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setProperties, type Property } from '../store/propertySlice';
import { HOME_PROPERTIES } from '../data/homeProperties';
import {
  clearError,
  fetchHomepageData,
  selectHomepageError,
  selectMarketStats,
  selectTopAgents,
  selectLocationTrends,
  selectFeaturedProperties,
  selectIsHomepageLoading,
  type HomepageProperty,
} from '../store/slices/homepageSlice';
import type { AppDispatch } from '../store/store';
import { buildHomepageJsonLd } from './homepageSeo';
import { buildOrganizationSchema } from '../utils/jsonLdSchemas';
import RoleSelectionModal from '../components/RoleSelectionModal';
import PublicLayout from '../components/layout/PublicLayout';
import PageMeta from '../components/seo/PageMeta';
import StructuredData from '../components/seo/StructuredData';
import { useRecentlyViewed } from '../components/RecentlyViewed';
import { cleanupHomepageHeroPreload, ensureHomepageHeroPreload } from './homePagePreload';

import '../styles/luxuryDesignSystem.css';
import './HomePage.css';

// Companion portal sections
const NewsletterSubscription = lazy(() => import('../components/NewsletterSubscription'));
const CompanyProfile = lazy(() => import('../components/CompanyProfile'));
const BlogSection = lazy(() => import('../components/BlogSection'));
const OnboardingGateway = lazy(() => import('../components/OnboardingGateway'));

const SectionLoader: FC = () => (
  <div className="home-page-section-loader" aria-hidden="true">
    <div className="home-page-section-loader__spinner" />
  </div>
);

const FALLBACK_FEATURED: HomepageProperty[] = HOME_PROPERTIES.slice(0, 6).map(p => ({
  id: String(p.id),
  title: p.title,
  description: p.description,
  type: p.type,
  status: 'available',
  price: p.price,
  currency: 'AED',
  bedrooms: p.beds,
  bathrooms: p.baths,
  sqft: p.sqft,
  location: p.location,
  amenities: p.amenities,
  images: [],
  featured: true,
}));

const HOME_PROPERTIES_FOR_STORE: Property[] = HOME_PROPERTIES.map(p => ({
  id: p.id,
  title: p.title,
  location: p.location,
  type: p.type,
  price: p.price,
  beds: p.beds,
  baths: p.baths,
  sqft: p.sqft,
  amenities: p.amenities,
}));

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const marketStats = useSelector(selectMarketStats);
  const topAgents = useSelector(selectTopAgents);
  const locationTrends = useSelector(selectLocationTrends);
  const featuredProperties = useSelector(selectFeaturedProperties);
  const isHomepageLoading = useSelector(selectIsHomepageLoading);
  const homepageError = useSelector(selectHomepageError);
  const navigate = useNavigate();

  useEffect(() => {
    ensureHomepageHeroPreload();
    return () => {
      cleanupHomepageHeroPreload();
    };
  }, []);

  const displayedFeatured = useMemo(
    () => (featuredProperties.length > 0 ? featuredProperties : FALLBACK_FEATURED),
    [featuredProperties]
  );

  const homepageJsonLd = useMemo(
    () =>
      buildHomepageJsonLd({
        marketStats,
        featuredProperties: displayedFeatured,
        topAgents,
        locationTrends,
      }),
    [marketStats, displayedFeatured, topAgents, locationTrends]
  );

  const structuredDataPayload = useMemo<Array<Record<string, unknown>>>(() => {
    const homepageSchemas = Array.isArray(homepageJsonLd) ? homepageJsonLd : [homepageJsonLd];
    return [...homepageSchemas, buildOrganizationSchema()].filter(
      (entry): entry is Record<string, unknown> => Boolean(entry)
    );
  }, [homepageJsonLd]);

  const trustHighlights = useMemo(
    () => [
      { label: 'Active Listings', value: marketStats.availableProperties.toLocaleString('en-US') },
      {
        label: 'Average Price',
        value: `AED ${Math.round(marketStats.averagePrice).toLocaleString('en-US')}`,
      },
      { label: 'Top Agents', value: String(topAgents.length || 0) },
      { label: 'Popular Areas', value: String(locationTrends.length || 0) },
    ],
    [
      marketStats.availableProperties,
      marketStats.averagePrice,
      topAgents.length,
      locationTrends.length,
    ]
  );

  const { addToRecent } = useRecentlyViewed();

  const pageTitle = 'White Caves Real Estate — Dubai Luxury Properties';
  const pageDescription =
    'Explore premium villas, penthouses, and investment-ready properties in Dubai with White Caves Real Estate. RERA-licensed agency serving luxury buyers and investors.';
  const pageKeywords = [
    'Dubai real estate',
    'luxury properties Dubai',
    'White Caves Real Estate',
    'Dubai villas',
    'RERA licensed',
    'property investment',
  ];

  const handlePropertyClick = (propertyId: number): void => {
    addToRecent(String(propertyId));
    navigate(`/property/${propertyId}`);
  };

  useEffect(() => {
    dispatch(setProperties(HOME_PROPERTIES_FOR_STORE));
    dispatch(fetchHomepageData());
  }, [dispatch]);

  useEffect(() => {
    const refreshIntervalMs = 120_000;
    const refreshTimer = window.setInterval(() => {
      dispatch(fetchHomepageData());
    }, refreshIntervalMs);

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === 'visible') {
        dispatch(fetchHomepageData());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!homepageError || isHomepageLoading) return;
    const retryTimer = window.setTimeout(() => {
      dispatch(fetchHomepageData());
    }, 45_000);
    return () => {
      window.clearTimeout(retryTimer);
    };
  }, [dispatch, homepageError, isHomepageLoading]);

  const handleHomepageRetry = (): void => {
    dispatch(clearError());
    dispatch(fetchHomepageData());
  };

  return (
    <PublicLayout>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        canonicalPath="/"
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=630&fit=crop&q=80"
        jsonLd={homepageJsonLd}
      />
      <StructuredData id="home-jsonld" data={structuredDataPayload} />
      <div className="home-page" role="main">
        {homepageError && !isHomepageLoading ? (
          <div role="status" aria-live="polite" className="homepage-live-data-alert">
            <span>Live market data is temporarily unavailable. Showing trusted fallback data.</span>
            <button
              type="button"
              onClick={handleHomepageRetry}
              className="homepage-live-data-alert__retry"
            >
              Retry live data
            </button>
          </div>
        ) : null}

        {/* Decoupled CRM Gateway Banner (Public Homepage migrated to White-Caves-Web) */}
        <section
          data-testid="crm-gateway-banner"
          aria-label="White Caves Enterprise Portal Gateway"
          className="py-12 px-6 max-w-7xl mx-auto"
        >
          <div className="rounded-3xl p-8 bg-slate-900/90 border border-red-500/30 shadow-2xl text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-extrabold uppercase tracking-wider mb-3">
              Sovereign CRM &amp; Client Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              White Caves Real Estate LLC — Enterprise Hub
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto mt-2">
              Access your role-based CRM workspace, DLD/Ejari compliance desk, or browse active
              portfolio inventory.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition"
              >
                Browse Inventory
              </button>
              <button
                type="button"
                onClick={() => handlePropertyClick(1)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition"
              >
                Featured Trophy Asset
              </button>
            </div>
          </div>
        </section>

        {/* Market Trust Strip */}
        <section className="home-page__trust-strip" aria-label="Market trust highlights">
          <div className="home-page__trust-grid">
            {trustHighlights.map((item, index) => (
              <motion.article
                key={item.label}
                className="home-page__trust-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="home-page__trust-label" aria-label={item.label}>
                  {item.label}
                </span>
                <span className="home-page__trust-value" aria-hidden="true">
                  {item.value}
                </span>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Companion portal sections */}
        <Suspense fallback={<SectionLoader />}>
          <CompanyProfile />
          <BlogSection
            marketStats={marketStats}
            featuredProperties={displayedFeatured}
            locationTrends={locationTrends}
          />
          <NewsletterSubscription />
          <OnboardingGateway />
        </Suspense>

        <RoleSelectionModal />
      </div>
    </PublicLayout>
  );
};

export default HomePage;
