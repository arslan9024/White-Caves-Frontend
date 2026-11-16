import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import EmployeesCRMTab from '../EmployeesCRMTab';

describe('EmployeesCRMTab Component', () => {
  it('renders employees table cleanly', () => {
    expect(EmployeesCRMTab).toBeDefined();
    const { container, getByText } = render(<EmployeesCRMTab />);
    expect(container).toBeDefined();
    expect(getByText('Employees')).toBeDefined();
    expect(getByText('Arslan Malik')).toBeDefined();
  });
});

