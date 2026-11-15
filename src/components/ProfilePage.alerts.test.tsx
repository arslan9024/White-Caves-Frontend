import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfilePage from './ProfilePage';
import userReducer from '../store/userSlice';
import authReducer from '../store/authSlice';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { CurrencyProvider } from '../context/CurrencyContext';
import { UserRoleProvider } from '../context/UserRoleContext';

vi.mock('./ProfilePage.css', () => ({}));
vi.mock('./Toast', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
}));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user-1', name: 'Test User' } }),
}));

describe('ProfilePage — alert elimination', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows inline status banner when profile save succeeds (no window.alert)', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
      }),
    });

    const store = configureStore({
      reducer: {
        user: userReducer,
        auth: authReducer,
      },
      preloadedState: {
        user: {
          currentUser: {
            id: 'user-1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'agent',
          },
          loading: false,
          error: null,
        } as unknown as ReturnType<typeof userReducer>,
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <UserRoleProvider>
                <MemoryRouter>
                  <ProfilePage />
                </MemoryRouter>
              </UserRoleProvider>
            </CurrencyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    );

    const saveBtn = await screen.findByRole('button', { name: /Save Profile Changes/i });
    fireEvent.click(saveBtn);

    const banner = await screen.findByRole('status');
    expect(banner).toHaveAttribute('data-testid', 'profile-status-banner');
    expect(banner).toHaveTextContent('Profile updated successfully!');

    await waitFor(() => {
      expect(alertSpy).not.toHaveBeenCalled();
    });
  });
});
