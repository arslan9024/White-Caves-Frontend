import React, { FC, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppShell from './components/layout/AppShell';
import { PageLoader } from './components/layout/PageLoader';

// Lazy loaded chunks
const HomeView = lazy(() => import('./views/HomeView'));
const MarketingView = lazy(() => import('./views/MarketingView'));
const SalesView = lazy(() => import('./views/SalesView'));
const OffPlanView = lazy(() => import('./views/OffPlanView'));
const DocumentsView = lazy(() => import('./views/DocumentsView'));
const SettingsView = lazy(() => import('./views/SettingsView'));
const FeatureStatusView = lazy(() => import('./views/FeatureStatusView'));
const MdPortalView = lazy(() => import('./portals/md'));
const EmployeePortalView = lazy(() => import('./portals/employee'));
const LandlordPortalView = lazy(() => import('./portals/landlord'));
const TenantPortalView = lazy(() => import('./portals/tenant'));
const BuyerPortalView = lazy(() => import('./portals/buyer'));
const SellerPortalView = lazy(() => import('./portals/seller'));

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <HomeView />
              </Suspense>
            }
          />
          <Route
            path="marketing"
            element={
              <Suspense fallback={<PageLoader />}>
                <MarketingView />
              </Suspense>
            }
          />
          <Route
            path="sales"
            element={
              <Suspense fallback={<PageLoader />}>
                <SalesView />
              </Suspense>
            }
          />
          <Route
            path="off-plan"
            element={
              <Suspense fallback={<PageLoader />}>
                <OffPlanView />
              </Suspense>
            }
          />
          <Route
            path="documents"
            element={
              <Suspense fallback={<PageLoader />}>
                <DocumentsView />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<PageLoader />}>
                <SettingsView />
              </Suspense>
            }
          />
          <Route
            path="feature-status"
            element={
              <Suspense fallback={<PageLoader />}>
                <FeatureStatusView />
              </Suspense>
            }
          />
          <Route
            path="md/command-center"
            element={
              <Suspense fallback={<PageLoader />}>
                <MdPortalView />
              </Suspense>
            }
          />
          <Route
            path="employee/workspace"
            element={
              <Suspense fallback={<PageLoader />}>
                <EmployeePortalView />
              </Suspense>
            }
          />
          <Route
            path="landlord/portfolio"
            element={
              <Suspense fallback={<PageLoader />}>
                <LandlordPortalView />
              </Suspense>
            }
          />
          <Route
            path="tenant/lease"
            element={
              <Suspense fallback={<PageLoader />}>
                <TenantPortalView />
              </Suspense>
            }
          />
          <Route
            path="buyer/acquisitions"
            element={
              <Suspense fallback={<PageLoader />}>
                <BuyerPortalView />
              </Suspense>
            }
          />
          <Route
            path="seller/listings"
            element={
              <Suspense fallback={<PageLoader />}>
                <SellerPortalView />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
