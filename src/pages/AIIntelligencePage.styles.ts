import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; }`;

export const PageWrap = styled.section`
  min-height: 100vh;
  padding: 2rem 1.5rem 4rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 60%, #141414 100%);
  color: #fafafa;
  animation: ${fadeIn} 0.4s ease both;
`;

export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: #fafafa;
  margin: 0 0 0.4rem;
  span {
    color: #c9a84c;
  }
`;

export const PageSubtitle = styled.p`
  color: rgba(250, 250, 250, 0.6);
  font-size: 0.95rem;
  margin: 0;
`;

export const SectionTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c9a84c;
  margin: 2rem 0 0.75rem;
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const KpiCard = styled.article<{ $trend?: 'up' | 'down' | 'neutral' }>`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(196, 30, 58, 0.22);
  border-radius: 12px;
  padding: 1.25rem 1rem;
  transition:
    border-color 0.2s,
    background 0.2s;
  &:hover {
    background: rgba(196, 30, 58, 0.07);
    border-color: rgba(196, 30, 58, 0.45);
  }
`;

export const KpiLabel = styled.p`
  font-size: 0.78rem;
  color: rgba(250, 250, 250, 0.55);
  margin: 0 0 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const KpiValue = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fafafa;
  margin: 0 0 0.25rem;
  direction: ltr;
`;

export const KpiChange = styled.span<{ $up: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $up }) => ($up ? '#22c55e' : '#ef4444')};
`;

export const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
`;

export const InsightTile = styled.article`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(196, 30, 58, 0.18);
  border-radius: 12px;
  padding: 1.25rem;
  transition: border-color 0.2s;
  &:hover {
    border-color: rgba(196, 30, 58, 0.4);
  }
`;

export const TileIcon = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
`;

export const TileTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #fafafa;
  margin: 0 0 0.4rem;
`;

export const TileBody = styled.p`
  font-size: 0.85rem;
  color: rgba(250, 250, 250, 0.6);
  margin: 0;
  line-height: 1.5;
`;

export const Badge = styled.span<{ $status: 'live' | 'coming-soon' | 'beta' }>`
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: ${({ $status }) =>
    $status === 'live'
      ? 'rgba(34,197,94,0.15)'
      : $status === 'beta'
        ? 'rgba(234,179,8,0.15)'
        : 'rgba(196,30,58,0.15)'};
  color: ${({ $status }) =>
    $status === 'live' ? '#22c55e' : $status === 'beta' ? '#eab308' : '#ff4d6d'};
  border: 1px solid currentColor;
`;

export const PerfBar = styled.div<{ $score: number }>`
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  margin-top: 0.5rem;
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $score }) => $score}%;
    border-radius: 3px;
    background: ${({ $score }) =>
      $score >= 90 ? '#10B981' : $score >= 50 ? '#C9A84C' : '#EF4444'};
    transition: width 0.6s ease;
  }
`;

export const AccessDeniedBanner = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(250, 250, 250, 0.45);
  font-size: 0.95rem;
`;
