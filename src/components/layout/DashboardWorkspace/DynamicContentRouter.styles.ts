import styled from 'styled-components';
import { MEDIA_QUERIES, theme as rawTheme } from '../../../styles/theme';

const theme: any = rawTheme;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--bg-primary, ${theme.colors.gray[50]});
  position: relative;
  min-height: 0;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing[4]};

  ${MEDIA_QUERIES.mobile} {
    padding: ${theme.spacing[3]};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  gap: ${theme.spacing[3]};
  color: var(--text-secondary, ${theme.colors.gray[600]});
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  padding: ${theme.spacing[6]};
  text-align: center;
  color: var(--text-primary, ${theme.colors.gray[900]});
`;

export const ErrorTitle = styled.h2`
  margin: 0 0 ${theme.spacing[2]} 0;
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: #ef4444;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: ${theme.typography.fontSize.base};
  color: var(--text-secondary, ${theme.colors.gray[600]});
  max-width: 500px;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  padding: ${theme.spacing[6]};
  text-align: center;
  color: var(--text-secondary, ${theme.colors.gray[500]});
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  background: var(--bg-secondary, #ffffff);
  border-bottom: 1px solid var(--border-color, ${theme.colors.gray[200]});
  margin-bottom: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
`;

export const ContentTitle = styled.h2`
  margin: 0;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: var(--text-primary, ${theme.colors.gray[900]});
`;

export const ContentActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

export const CloseButton = styled.button`
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  background: transparent;
  border: 1px solid var(--border-color, ${theme.colors.gray[300]});
  border-radius: ${theme.borderRadius.md};
  color: var(--text-secondary, ${theme.colors.gray[700]});
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-hover, ${theme.colors.gray[100]});
    color: var(--text-primary, ${theme.colors.gray[900]});
  }
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color, ${theme.colors.gray[200]});
  border-top-color: #ef4444;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

