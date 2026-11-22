import styled, { keyframes } from 'styled-components';

// ─── Animations ──────────────────────────────────────────────────────────────
export const fadeIn = keyframes`from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); }`;

// ─── Layout ───────────────────────────────────────────────────────────────────
export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #070b14 0%, #0f172a 100%);
  padding: 0 0 80px;
`;

export const Hero = styled.div`
  text-align: center;
  padding: 60px 20px 40px;
  animation: ${fadeIn} 0.6s ease;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 12px;
  font-family: 'Inter', sans-serif;
  span {
    color: #ef4444;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: #64748b;
  max-width: 650px;
  margin: 0 auto 24px;
  font-family: 'Inter', sans-serif;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const StatPill = styled.div`
  padding: 8px 20px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.82rem;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
`;

export const WaveSection = styled.section`
  max-width: 1240px;
  margin: 0 auto 48px;
  padding: 0 20px;
  animation: ${fadeIn} 0.5s ease;
`;

export const WaveTitle = styled.h2`
  font-size: 1rem;
  font-weight: 800;
  color: #ef4444;
  margin: 0 0 20px;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(239, 68, 68, 0.06);
  border-left: 3px solid #ef4444;
  border-radius: 0 8px 8px 0;
`;

export const ComponentGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols || 2}, 1fr);
  gap: 20px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const Skeleton = styled.div`
  height: 200px;
  border-radius: 14px;
  background: linear-gradient(
    90deg,
    rgba(30, 41, 59, 0.5) 0%,
    rgba(51, 65, 85, 0.5) 50%,
    rgba(30, 41, 59, 0.5) 100%
  );
  background-size: 200% 100%;
  animation: ${fadeIn} 1s ease infinite;
`;

// ─── Wave Tabs ───────────────────────────────────────────────────────────────
export const TabBar = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 20px 32px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid ${p => (p.$active ? '#EF4444' : 'rgba(100,116,139,0.25)')};
  background: ${p => (p.$active ? 'rgba(239,68,68,0.12)' : 'transparent')};
  color: ${p => (p.$active ? '#EF4444' : '#64748B')};
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  &:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
`;
