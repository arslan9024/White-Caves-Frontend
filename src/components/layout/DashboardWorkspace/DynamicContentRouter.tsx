// src/components/layout/DashboardWorkspace/DynamicContentRouter.tsx
import React, { Suspense, useMemo } from 'react';
import { featureRegistry, Feature } from './FeatureRegistry';
import {
  CloseButton,
  ContentActions,
  ContentContainer,
  ContentHeader,
  ContentTitle,
  ContentWrapper,
  EmptyStateContainer,
  ErrorContainer,
  ErrorMessage,
  ErrorTitle,
  LoadingContainer,
  Spinner,
} from './DynamicContentRouter.styles';

interface DynamicContentRouterProps {
  activeFeatureId: string | null;
  featureData?: Record<string, unknown>;
  onClose?: () => void;
  isLoading?: boolean;
  fallback?: React.ReactNode;
  errorFallback?: (error: Error) => React.ReactNode;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Feature rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>{this.state.error.message}</ErrorMessage>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

const DefaultLoadingFallback = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

export const DynamicContentRouter: React.FC<DynamicContentRouterProps> = ({
  activeFeatureId,
  featureData,
  onClose,
  isLoading = false,
  fallback,
  errorFallback,
}) => {
  const [feature, setFeature] = React.useState<Feature | undefined>(undefined);
  const [renderKey, setRenderKey] = React.useState(0);

  React.useEffect(() => {
    if (activeFeatureId) {
      const f = featureRegistry.getFeature(activeFeatureId);
      setFeature(f);
      setRenderKey(prev => prev + 1);
    } else {
      setFeature(undefined);
    }
  }, [activeFeatureId]);

  const renderContent = useMemo(() => {
    if (isLoading) {
      return fallback || <DefaultLoadingFallback />;
    }

    if (!activeFeatureId || !feature) {
      return (
        <EmptyStateContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p>Select a feature from the sidebar to get started</p>
        </EmptyStateContainer>
      );
    }

    if (feature.disabled) {
      return (
        <EmptyStateContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>This feature is currently disabled</p>
        </EmptyStateContainer>
      );
    }

    const Component = feature.component;

    return (
      <Component
        key={renderKey}
        featureId={feature.id}
        featureData={featureData}
        isActive={true}
        onClose={onClose}
      />
    );
  }, [activeFeatureId, feature, isLoading, fallback, featureData, onClose, renderKey]);

  return (
    <ContentContainer>
      {feature && !isLoading && (
        <ContentHeader>
          <ContentTitle>
            {feature.icon}
            {feature.label}
          </ContentTitle>
          <ContentActions>
            {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
          </ContentActions>
        </ContentHeader>
      )}

      <ContentWrapper>
        <ErrorBoundary fallback={errorFallback}>
          <Suspense fallback={fallback || <DefaultLoadingFallback />}>{renderContent}</Suspense>
        </ErrorBoundary>
      </ContentWrapper>
    </ContentContainer>
  );
};

export default DynamicContentRouter;
