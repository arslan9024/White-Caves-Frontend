import styled from 'styled-components';

export const RouterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f9fafb;
  overflow: hidden;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Spinner = styled.div`
  border: 4px solid #f3f4f6;
  border-top: 4px solid #EF4444;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  text-align: center;
`;

export const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const ErrorTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
`;

export const ErrorMessage = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
`;

export const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #EF4444;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #DC2626;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
`;

export const EmptyStateMessage = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
`;

export const AccessDeniedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  text-align: center;
`;

export const LockIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const AccessDeniedTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #EF4444;
  margin: 0 0 0.5rem 0;
`;

export const AccessDeniedMessage = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;
  background-color: #f9fafb;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;

    &:hover {
      background: #9ca3af;
    }
  }
`;

/**
 * View Component Registry
 * Maps (department, service) to component
 */
