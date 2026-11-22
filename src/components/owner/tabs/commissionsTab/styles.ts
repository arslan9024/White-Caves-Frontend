import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export const Container = styled.div`
  padding: 1.5rem;
  animation: ${fadeIn} 0.35s ease;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Title = styled.h3`
  font-family: 'Cormorant Garamond', 'Poppins', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #fafafa;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div`
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(196, 30, 58, 0.3);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(196, 30, 58, 0.55);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(196, 30, 58, 0.15);
  }
`;

export const StatLabel = styled.span`
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(250, 250, 250, 0.55);
  margin-bottom: 0.4rem;
`;

export const StatValue = styled.span`
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: #c41e3a;
  text-shadow: 0 0 20px rgba(196, 30, 58, 0.3);
  line-height: 1.1;
`;

export const StatSub = styled.span`
  display: block;
  font-size: 0.78rem;
  color: rgba(250, 250, 250, 0.5);
  margin-top: 0.2rem;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const FilterSelect = styled.select`
  background: rgba(10, 10, 10, 0.7);
  border: 1px solid rgba(196, 30, 58, 0.25);
  border-radius: 8px;
  color: #fafafa;
  padding: 0.5rem 0.85rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover,
  &:focus {
    border-color: rgba(196, 30, 58, 0.6);
    outline: none;
  }

  option {
    background: #1a1a1a;
    color: #fafafa;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: rgba(250, 250, 250, 0.4);
  font-size: 0.9rem;
`;

export const LoadingRow = styled.div`
  height: 44px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(196, 30, 58, 0.07) 0%,
    rgba(196, 30, 58, 0.18) 40%,
    rgba(196, 30, 58, 0.07) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  margin-bottom: 0.5rem;
`;
