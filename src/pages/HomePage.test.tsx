import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage Landing & Authentication Portal', () => {
  it('renders the welcome hero and authentication gateways without departments', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('crm-command-center')).toBeTruthy();
    expect(screen.getByText('White Caves Real Estate')).toBeTruthy();
    expect(screen.getByText('Welcome to White Caves')).toBeTruthy();
    expect(screen.getByText('Operator & Client Access')).toBeTruthy();
    expect(screen.getByText('New Registration')).toBeTruthy();

    // Departments should NOT be present on the landing page
    expect(screen.queryByText('Floor 1')).toBeNull();
    expect(screen.queryByText('Department Floors (1–12)')).toBeNull();
    expect(screen.queryByText('Luxury Sales')).toBeNull();
  });

  it('allows clicking sign in / sign up buttons without crashing', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const signInBtns = screen.getAllByRole('button', { name: /sign in/i });
    expect(signInBtns.length).toBeGreaterThan(0);
    fireEvent.click(signInBtns[0]);
  });
});
