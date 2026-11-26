import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import type { AppUser } from '../../store/userSlice';
import { useToast } from '../Toast';
import { useFormValidation } from '../../hooks/useFormValidation';
import {
  required,
  minLength,
  maxLength,
  emailValidator,
  matchesPattern,
} from '../../utils/validation';
import {
  handleSocialSignIn,
  handleEmailAuth as doEmailAuth,
  sendPhoneOTP,
  verifyPhoneOTP,
  handleLogout,
  resolveFirebaseError,
} from './Auth.logic';
import { getAuthToken, setAuthToken, getStoredUser, setStoredUser } from './Auth.data';
import { firebaseAuth as auth } from '../../auth/firebaseInit';
import type { AuthMode, AuthUser } from './Auth.types';
import type { ConfirmationResult } from 'firebase/auth';

const PHONE_UAE_RE = /^\+?[1-9]\d{1,14}$/;

function toAppUser(u: AuthUser): AppUser {
  return {
    id: u.id,
    email: u.email ?? '',
    name: u.name,
    phone: u.phone ?? undefined,
    photoURL: u.photoUrl ?? undefined,
  };
}

export function useAuthController(onLogin: (user: AuthUser) => void) {
  const dispatch = useDispatch();
  const toast = useToast();

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('phone');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);
  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const stored = getStoredUser<AuthUser>();
    const token = getAuthToken();
    if (stored && token) {
      setCurrentUser(stored);
      dispatch(setUser(toAppUser(stored)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (otpCountdown <= 0) return;
    const t = setTimeout(() => setOtpCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [otpCountdown]);

  const { values, errors, touched, handleChange, handleBlur, isValid, setFieldValue } =
    useFormValidation(
      {
        email: [required(), emailValidator()],
        password: [required(), minLength(6)],
        confirmPassword: [],
        name: isSignUp ? [required()] : [],
        phone:
          authMode === 'phone'
            ? [
                required(),
                matchesPattern(PHONE_UAE_RE, 'Please enter a valid phone number with country code'),
              ]
            : [],
        otp: confirmationResult !== null ? [required(), minLength(6), maxLength(6)] : [],
      },
      { email: '', password: '', confirmPassword: '', name: '', phone: '', otp: '' }
    );

  const onSuccess = useCallback(
    (user: AuthUser) => {
      setCurrentUser(user);
      dispatch(setUser(toAppUser(user)));
      onLogin(user);
    },
    [dispatch, onLogin]
  );

  const handleSocial = useCallback(
    async (provider: 'google' | 'facebook' | 'apple') => {
      if (!auth) {
        toast.error('Firebase is not configured. Please add Firebase credentials.');
        return;
      }
      setLoading(true);
      try {
        const user = await handleSocialSignIn(provider);
        toast.success(`Successfully signed in with ${provider}!`);
        onSuccess(user);
      } catch (err: unknown) {
        const e = err as { code?: string; message?: string };
        toast.error(
          resolveFirebaseError(e.code, e.message ?? `Failed to sign in with ${provider}`)
        );
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, toast]
  );

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) {
        toast.error('Please fix the form errors');
        return;
      }
      if (isSignUp && values.password !== values.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (!auth) {
        toast.error('Firebase is not configured.');
        return;
      }
      setLoading(true);
      try {
        const user = await doEmailAuth(values.email, values.password, values.name, isSignUp);
        toast.success(isSignUp ? 'Account created successfully!' : 'Successfully signed in!');
        onSuccess(user);
      } catch (err: unknown) {
        const e = err as { code?: string; message?: string };
        if (e.code === 'auth/email-already-in-use') setIsSignUp(false);
        if (e.code === 'auth/user-not-found') setIsSignUp(true);
        toast.error(resolveFirebaseError(e.code, e.message ?? 'Authentication failed.'));
      } finally {
        setLoading(false);
      }
    },
    [isSignUp, isValid, onSuccess, toast, values]
  );

  const handleSendOTP = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) {
        toast.error('Please enter a valid phone number');
        return;
      }
      if (!auth) {
        toast.error('Firebase is not configured.');
        return;
      }
      setLoading(true);
      try {
        const result = await sendPhoneOTP(values.phone);
        setConfirmationResult(result);
        setOtpCountdown(60);
        toast.success('OTP sent to your phone!');
      } catch (err: unknown) {
        const e = err as { code?: string };
        toast.error(
          resolveFirebaseError(e.code, 'Failed to send OTP. Please check your phone number.')
        );
        if (typeof window !== 'undefined') window.recaptchaVerifier = null;
      } finally {
        setLoading(false);
      }
    },
    [isValid, toast, values.phone]
  );

  const handleVerifyOTP = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!values.otp || values.otp.length !== 6) {
        toast.error('Please enter the 6-digit OTP');
        return;
      }
      if (!confirmationResult) {
        toast.error('Please send OTP first');
        return;
      }
      setLoading(true);
      try {
        const user = await verifyPhoneOTP(confirmationResult, values.otp, values.phone);
        toast.success('Successfully signed in!');
        onSuccess(user);
      } catch (err: unknown) {
        const e = err as { code?: string };
        toast.error(resolveFirebaseError(e.code, 'Verification failed. Please try again.'));
      } finally {
        setLoading(false);
      }
    },
    [confirmationResult, onSuccess, toast, values.otp, values.phone]
  );

  const onLogout = useCallback(async () => {
    try {
      await handleLogout();
      setCurrentUser(null);
      setConfirmationResult(null);
      dispatch(setUser(null));
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  }, [dispatch, toast]);

  const onProfileComplete = useCallback(
    (user: AuthUser, token: string) => {
      setAuthToken(token);
      setStoredUser(user);
      setCurrentUser(user);
      dispatch(setUser(toAppUser(user)));
      setShowProfileCompletion(false);
      setPendingUser(null);
      setPendingToken(null);
      onLogin(user);
    },
    [dispatch, onLogin]
  );

  const onProfileSkip = useCallback(() => {
    if (pendingUser && pendingToken) {
      setAuthToken(pendingToken);
      setStoredUser(pendingUser);
      setCurrentUser(pendingUser);
      dispatch(setUser(toAppUser(pendingUser)));
      onLogin(pendingUser);
    }
    setShowProfileCompletion(false);
    setPendingUser(null);
    setPendingToken(null);
  }, [dispatch, onLogin, pendingToken, pendingUser]);

  return {
    currentUser,
    authMode,
    setAuthMode,
    isSignUp,
    setIsSignUp,
    loading,
    confirmationResult,
    setConfirmationResult,
    showProfileCompletion,
    pendingUser,
    pendingToken,
    otpCountdown,
    showPassword,
    setShowPassword,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSocial,
    handleEmailSubmit,
    handleSendOTP,
    handleVerifyOTP,
    onLogout,
    onProfileComplete,
    onProfileSkip,
  };
}
