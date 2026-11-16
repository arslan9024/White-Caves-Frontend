import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyStatusUpdater from './PropertyStatusUpdater';

describe('PropertyStatusUpdater', () => {
  const mockProperty = {
    id: 1,
    title: 'Test Villa',
    furnishing: 'furnished',
    occupancyStatus: 'vacant',
    marketAvailability: 'available',
    constructionStage: 'handed_over',
    legalStatus: 'registered',
  };

  it('renders empty state when no property is provided', () => {
    render(<PropertyStatusUpdater />);
    expect(screen.getByText('No property selected')).toBeInTheDocument();
  });

  it('renders property status badges in view mode', () => {
    render(<PropertyStatusUpdater property={mockProperty} />);
    expect(screen.getByText('Property Status')).toBeInTheDocument();
    expect(screen.getByText('Furnished')).toBeInTheDocument();
    expect(screen.getByText('Vacant')).toBeInTheDocument();
  });

  it('toggles into edit mode when Update button is clicked', () => {
    render(<PropertyStatusUpdater property={mockProperty} />);
    const updateBtn = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateBtn);
    expect(screen.getByText('Furnishing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update status/i })).toBeInTheDocument();
  });
});

