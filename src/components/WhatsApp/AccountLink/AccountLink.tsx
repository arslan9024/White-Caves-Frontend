import React, { useState, useEffect } from 'react';
import { useWhatsAppIntegration } from '../../../hooks/whatsapp';
import {
  Container, Title, Card, SelectAccountSection, Label, Select,
  ButtonGroup, Button, QRCodeSection, QRCodeImage, QRCodeText,
  PhoneVerificationForm, Input, ErrorMessage, SuccessMessage,
  LoadingSpinner, StepIndicator, StepBadge,
} from './AccountLink.styles';

interface AccountLinkProps {
  onSuccess?: (accountId: string) => void;
  onCancel?: () => void;
}

export const AccountLink: React.FC<AccountLinkProps> = ({ onSuccess, onCancel }) => {
  const {
    accounts,
    currentAccount: _currentAccount,
    isLoading,
    error,
    isLinking,
    qrCode,
    sessionId,
    selectAccount,
    linkDevice,
    confirmLink,
    clearError,
  } = useWhatsAppIntegration();

  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [step, setStep] = useState<'select' | 'qr' | 'verify'>('select');
  const [successMessage, setSuccessMessage] = useState('');

  // Set initial account
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccountId) {
      const init = async () => {
        setSelectedAccountId(accounts[0].accountId);
        selectAccount(accounts[0].accountId);
      };
      void init();
    }
  }, [accounts, selectedAccountId, selectAccount]);

  const handleAccountSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountId = e.target.value;
    setSelectedAccountId(accountId);
    selectAccount(accountId);
  };

  const handleStartLinking = async () => {
    if (!selectedAccountId || !phoneNumber) {
      return;
    }

    try {
      await linkDevice(selectedAccountId, phoneNumber);
      setStep('qr');
    } catch {
      // Error is handled by the hook
    }
  };

  const handleConfirmLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionId || !authToken || !phoneNumber) {
      return;
    }

    try {
      await confirmLink(sessionId, authToken, phoneNumber);
      setSuccessMessage('Account linked successfully!');
      setStep('select');
      setPhoneNumber('');
      setAuthToken('');

      setTimeout(() => {
        onSuccess?.(selectedAccountId);
      }, 1500);
    } catch {
      // Error is handled by the hook
    }
  };

  const handleReset = () => {
    setStep('select');
    setPhoneNumber('');
    setAuthToken('');
    setSelectedAccountId(accounts[0]?.accountId || '');
    clearError();
  };

  return (
    <Container>
      <Title>Link WhatsApp Account</Title>

      {error && (
        <ErrorMessage>
          {error}
          <button
            onClick={clearError}
            style={{
              marginLeft: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            ✕
          </button>
        </ErrorMessage>
      )}

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Card>
        <StepIndicator>
          <StepBadge active={step === 'select'} completed={step !== 'select'}>
            1
          </StepBadge>
          <StepBadge active={step === 'qr'} completed={step === 'verify'}>
            2
          </StepBadge>
          <StepBadge active={step === 'verify'}>3</StepBadge>
        </StepIndicator>

        {step === 'select' && (
          <SelectAccountSection>
            <Label>Select Account</Label>
            <Select value={selectedAccountId} onChange={handleAccountSelect} disabled={isLoading}>
              {accounts.map(account => (
                <option key={account.accountId} value={account.accountId}>
                  {account.phoneNumber || 'Unnamed Account'}
                </option>
              ))}
            </Select>

            <Label style={{ marginTop: '16px' }}>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              disabled={isLoading || isLinking}
            />

            <ButtonGroup>
              <Button
                variant="primary"
                onClick={handleStartLinking}
                disabled={isLoading || isLinking || !phoneNumber}
              >
                {isLinking ? 'Generating QR Code...' : 'Start Linking'}
              </Button>
              <Button variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </ButtonGroup>
          </SelectAccountSection>
        )}

        {step === 'qr' && qrCode && (
          <QRCodeSection>
            <h3 style={{ marginTop: 0 }}>Scan QR Code</h3>
            <QRCodeImage src={qrCode} alt="Device Linking QR Code" />
            <QRCodeText>
              Scan this QR code with your WhatsApp mobile app to link this account.
            </QRCodeText>
            <QRCodeText style={{ marginTop: '24px', fontSize: '12px', color: 'var(--color-999, #999)' }}>
              Trouble scanning? Enter your 6-digit authentication code below instead.
            </QRCodeText>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => setStep('verify')}>
                Enter Auth Code
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Try Again
              </Button>
            </ButtonGroup>
          </QRCodeSection>
        )}

        {step === 'verify' && (
          <PhoneVerificationForm onSubmit={handleConfirmLink}>
            <Label>6-Digit Authentication Code</Label>
            <Input
              type="text"
              placeholder="000000"
              value={authToken}
              onChange={e => setAuthToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              disabled={isLoading}
            />

            <ButtonGroup>
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading || authToken.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Confirm Linking'}
              </Button>
              <Button variant="secondary" type="button" onClick={handleReset}>
                Back
              </Button>
            </ButtonGroup>
          </PhoneVerificationForm>
        )}

        {(isLoading || isLinking) && step === 'qr' && <LoadingSpinner />}
      </Card>
    </Container>
  );
};

