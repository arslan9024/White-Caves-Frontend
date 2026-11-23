import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { VestaHandoverCRM } from '../VestaHandoverCRM';
import { VESTA_TAB_CONFIG, INITIAL_SNAGS, INITIAL_CHECKLIST } from '../vesta';

describe('VestaHandoverCRM', () => {
  it('renders without crashing and displays header', () => {
    render(<VestaHandoverCRM />);
    expect(screen.getByText('Vesta AI — Snagging, Move-In & Handover')).toBeDefined();
    expect(screen.getByText('Handover Protocol')).toBeDefined();
  });

  it('renders tabs properly', () => {
    render(<VestaHandoverCRM />);
    for (const tab of VESTA_TAB_CONFIG) {
      expect(screen.getByText(tab.label)).toBeDefined();
    }
  });

  it('renders snagging table on initial render', () => {
    render(<VestaHandoverCRM />);
    expect(screen.getByText('SNG-101')).toBeDefined();
    expect(screen.getByText('Marble countertop sealant hairline crack')).toBeDefined();
  });

  it('selects active tab via moduleId prop', () => {
    render(<VestaHandoverCRM moduleId="vesta-checklist" />);
    expect(screen.getByText('Move-In & Key Handover Readiness Gate')).toBeDefined();
  });
});
