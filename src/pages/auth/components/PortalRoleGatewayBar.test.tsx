import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PortalRoleGatewayBar } from './PortalRoleGatewayBar';

describe('PortalRoleGatewayBar', () => {
  it('renders Managing Director, Landlord, and Tenant portal selectors with target routes', () => {
    const onSelectRole = vi.fn();
    render(<PortalRoleGatewayBar selectedRole="managing_director" onSelectRole={onSelectRole} />);

    expect(screen.getByTestId('portal-role-gateway')).toBeInTheDocument();
    expect(screen.getByText('/dashboard')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('portal-gateway-landlord'));
    expect(onSelectRole).toHaveBeenCalledWith('landlord');

    fireEvent.click(screen.getByTestId('portal-gateway-tenant'));
    expect(onSelectRole).toHaveBeenCalledWith('tenant');
  });

  it('displays Landlord target route when landlord role is active', () => {
    render(<PortalRoleGatewayBar selectedRole="landlord" onSelectRole={vi.fn()} />);
    expect(screen.getByText('/landlord-portal')).toBeInTheDocument();
  });

  it('displays Tenant target route when tenant role is active', () => {
    render(<PortalRoleGatewayBar selectedRole="tenant" onSelectRole={vi.fn()} />);
    expect(screen.getByText('/tenant-portal')).toBeInTheDocument();
  });
});
