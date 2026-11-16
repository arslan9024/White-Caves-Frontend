import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { TenancyAgreement, UserTenancyRole } from './TenancyAgreementSigning.types';

export const useTenancyAgreementSigning = () => {
  const currentUser = useSelector((state: any) => state?.user?.currentUser);
  const [agreements, setAgreements] = useState<TenancyAgreement[]>([]);
  const [selectedAgreement, setSelectedAgreement] = useState<TenancyAgreement | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [userRole, setUserRole] = useState<UserTenancyRole>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const signatureRef = useRef<any>(null);

  const fetchUserAgreements = useCallback(async () => {
    if (!currentUser?._id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/tenancy-agreements/user/${currentUser._id}`);
      const data = await response.json();
      setAgreements(Array.isArray(data) ? data : []);
    } catch {
      // Mock mode fallback
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserAgreements();
  }, [fetchUserAgreements]);

  const openSignatureModal = (agreement: TenancyAgreement, role: UserTenancyRole) => {
    setSelectedAgreement(agreement);
    setUserRole(role);
    setUserEmail(currentUser?.email || '');
    setFeedbackMsg('');
    setShowSignatureModal(true);
  };

  const openRejectModal = (agreement: TenancyAgreement, role: UserTenancyRole) => {
    setSelectedAgreement(agreement);
    setUserRole(role);
    setRejectionReason('');
    setFeedbackMsg('');
    setShowRejectModal(true);
  };

  const closeModals = () => {
    setShowSignatureModal(false);
    setShowRejectModal(false);
    setSelectedAgreement(null);
    setUserRole(null);
    setRejectionReason('');
    setFeedbackMsg('');
  };

  const handleSign = async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      setFeedbackMsg('Please provide a signature');
      return;
    }

    if (!userEmail || !userEmail.includes('@')) {
      setFeedbackMsg('Please enter a valid email address');
      return;
    }

    setSigning(true);
    setFeedbackMsg('');
    const signatureData = signatureRef.current.toDataURL();

    try {
      const response = await fetch(`/api/tenancy-agreements/${selectedAgreement?._id}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser._id,
          signatureData,
          userName: currentUser.name,
          userEmail,
          userRole,
        }),
      });

      if (response.ok) {
        const updatedAgreement = await response.json();
        setAgreements(prev =>
          prev.map(a => (a._id === updatedAgreement._id ? updatedAgreement : a))
        );
        closeModals();
      } else {
        const error = await response.json();
        setFeedbackMsg(error.error || 'Failed to sign agreement');
      }
    } catch {
      setFeedbackMsg('Failed to sign agreement');
    } finally {
      setSigning(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setFeedbackMsg('Please provide a reason for rejection');
      return;
    }

    setSigning(true);
    setFeedbackMsg('');

    try {
      const response = await fetch(`/api/tenancy-agreements/${selectedAgreement?._id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser._id,
          userRole,
          rejectionReason,
        }),
      });

      if (response.ok) {
        const updatedAgreement = await response.json();
        setAgreements(prev =>
          prev.map(a => (a._id === updatedAgreement._id ? updatedAgreement : a))
        );
        closeModals();
      } else {
        const error = await response.json();
        setFeedbackMsg(error.error || 'Failed to reject agreement');
      }
    } catch {
      setFeedbackMsg('Failed to reject agreement');
    } finally {
      setSigning(false);
    }
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const getUserRole = (agreement: TenancyAgreement): UserTenancyRole => {
    const landlordId =
      typeof agreement.landlordId === 'object' ? agreement.landlordId?._id : agreement.landlordId;
    const tenantId =
      typeof agreement.tenantId === 'object' ? agreement.tenantId?._id : agreement.tenantId;

    if (landlordId === currentUser?._id) {
      return 'landlord';
    } else if (tenantId === currentUser?._id) {
      return 'tenant';
    }
    return null;
  };

  const canSign = (agreement: TenancyAgreement) => {
    const role = getUserRole(agreement);
    if (!role) return false;
    if (agreement.status === 'REJECTED') return false;

    if (role === 'landlord') {
      return (
        !agreement.signatures?.landlord?.signed &&
        agreement.signatures?.landlord?.status !== 'REJECTED'
      );
    } else {
      return (
        !agreement.signatures?.tenant?.signed && agreement.signatures?.tenant?.status !== 'REJECTED'
      );
    }
  };

  const canReject = (agreement: TenancyAgreement) => {
    const role = getUserRole(agreement);
    if (!role) return false;

    if (role === 'landlord') {
      return (
        !agreement.signatures?.landlord?.signed &&
        agreement.signatures?.landlord?.status !== 'REJECTED'
      );
    } else {
      return (
        !agreement.signatures?.tenant?.signed && agreement.signatures?.tenant?.status !== 'REJECTED'
      );
    }
  };

  return {
    currentUser,
    agreements,
    selectedAgreement,
    showSignatureModal,
    showRejectModal,
    userRole,
    loading,
    signing,
    rejectionReason,
    setRejectionReason,
    userEmail,
    setUserEmail,
    feedbackMsg,
    signatureRef,
    openSignatureModal,
    openRejectModal,
    closeModals,
    handleSign,
    handleReject,
    clearSignature,
    getUserRole,
    canSign,
    canReject,
  };
};

