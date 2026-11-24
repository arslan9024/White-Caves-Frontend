export LeaseProperty {
  id: string;
  title: string;
  location: string;
  type: string;
}

export LeaseTenant {
  id: string;
  name: string;
  phone: string | null;
}

export Lease {
  id: string;
  property: LeaseProperty;
  tenant: LeaseTenant;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: string;
  ejariNumber: string | null;
  nextPaymentDue: string | null;
}

export OverdueQueueItem {
  id: string;
  chequeNumber: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'pending' | 'bounced' | 'presented' | 'cleared';
  daysOverdue: number;
  lease: {
    id: string;
    leaseNumber: string | null;
    property: { id: string; title: string; location: string };
    tenant: { id: string; name: string; email: string; phone: string | null };
  };
}

export EjariSummary {
  total: number;
  pending: number;
  registered: number;
  expired: number;
  cancelled: number;
  expiringSoon: number;
}

export defaultEjariSummary: EjariSummary = {
  total: 0,
  pending: 0,
  registered: 0,
  expired: 0,
  cancelled: 0,
  expiringSoon: 0,
};

export buildEjariSummaryFromLeases = (rawLeases: Lease[]): EjariSummary => {
  return {
    total: rawLeases.length,
    pending: rawLeases.filter(lease => lease.ejariNumber == null || lease.ejariNumber === '')
      .length,
    registered: rawLeases.filter(lease => lease.ejariNumber != null && lease.ejariNumber !== '')
      .length,
    expired: rawLeases.filter(lease => lease.status.toLowerCase() === 'expired').length,
    cancelled: rawLeases.filter(lease => lease.status.toLowerCase() === 'terminated').length,
    expiringSoon: rawLeases.filter(lease => lease.status.toLowerCase() === 'expiring').length,
  };
};

