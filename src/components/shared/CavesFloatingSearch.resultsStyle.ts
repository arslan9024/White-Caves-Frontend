import styled from 'styled-components';

export const ResultsSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

export const PropertyCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  background: #ffffff;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: #ef4444;
    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.12);
    transform: translateY(-2px);
  }

  .img-container {
    position: relative;
    height: 140px;
    background: #f1f5f9;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #ffffff;

      &.Available { background: #10b981; }
      &.Leased { background: #EF4444; }
      &.UnderMaintenance { background: #f59e0b; }
      &.Sold { background: #64748b; }
      &.Pending { background: #8b5cf6; }
    }
  }

  .card-body {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;

    .price {
      font-size: 16px;
      font-weight: 800;
      color: #ef4444;
    }

    .title {
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
      line-height: 1.3;
    }

    .meta {
      display: flex;
      gap: 12px;
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .community {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64748b;

  .icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  h4 {
    margin: 0 0 4px 0;
    color: #1e293b;
    font-size: 16px;
  }
`;
