import styled from 'styled-components';

export const PipelineBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const PipelineStage = styled.button<{ $active: boolean; $color: string }>`
  background: ${props => (props.$active ? props.$color : 'white')};
  color: ${props => (props.$active ? 'white' : '#555')};
  border: 1px solid ${props => (props.$active ? props.$color : '#ddd')};
  border-radius: 20px;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    border-color: ${props => props.$color};
    background: ${props => (props.$active ? props.$color : `${props.$color}10`)};
  }
`;
