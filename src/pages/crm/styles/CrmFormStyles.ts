import styled from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #EF4444;
  margin-bottom: 0.45rem;
`;

export const FormInput = styled.input`
  width: 100%;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
  outline: none;
  box-sizing: border-box;
  background: #FFFFFF;
  color: #1E293B;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &::placeholder {
    color: #94A3B8;
  }

  &:focus {
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
  outline: none;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;
  background: #FFFFFF;
  color: #1E293B;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &::placeholder {
    color: #94A3B8;
  }

  &:focus {
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 0.65rem 0.75rem;
  font-size: 0.85rem;
  outline: none;
  background: #FFFFFF;
  color: #1E293B;
  box-sizing: border-box;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:focus {
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const LoadingBanner = styled.div`
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #EF4444;
`;

export const ErrorBanner = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #EF4444;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;
