import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage CRM Command Center', () => {
  it('renders the authenticated CRM Command Center with Department Floors 1–12 and AIAMS', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('crm-command-center')).toBeTruthy();
    expect(screen.getByText('White Caves CRM Command Center')).toBeTruthy();
    expect(screen.getByText('AIAMS Workforce')).toBeTruthy();
    expect(screen.getByText('Linda WhatsApp Sync')).toBeTruthy();
    expect(screen.getByText('Floor 1')).toBeTruthy();
    expect(screen.getByText('Floor 12')).toBeTruthy();
  });

  it('allows clicking a department floor card without crashing', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const floor1Btn = screen.getByText('Luxury Sales').closest('button');
    expect(floor1Btn).toBeTruthy();
    if (floor1Btn) fireEvent.click(floor1Btn);
  });
});

