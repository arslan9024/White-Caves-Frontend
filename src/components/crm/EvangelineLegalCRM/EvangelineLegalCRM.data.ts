/**
 * Evangeline Legal CRM — Data Layer (Mary Allen Wilkes Architecture)
 * Statutory templates, initial disputes registry, and DLD clause definitions
 */

import type { EvictionDispute, DldFormType } from './EvangelineLegalCRM.types';

export const INITIAL_DISPUTES: EvictionDispute[] = [
  {
    id: 'DISP-2026-01',
    tenant: 'Marcus Vance',
    unit: 'Villa 112 - Dubai Hills Estate',
    reason: '12-Month Notice for Owner Personal Use (Law 33/2008)',
    notaryDate: '2025-11-14',
    daysRemaining: 82,
    status: 'COURT_NOTICED',
  },
  {
    id: 'DISP-2026-02',
    tenant: 'Elena Rostova',
    unit: 'Penthouse 44 - Downtown',
    reason: 'Bounced Rent Cheque Notice (Central Bank Form 4)',
    notaryDate: '2026-08-01',
    daysRemaining: 12,
    status: 'RDC_HEARING_SCHEDULED',
  },
];

export const DLD_FORM_OPTIONS: DldFormType[] = ['Form A', 'Form B', 'Form F'];

export function generateContractText(params: {
  selectedForm: string;
  partyA: string;
  partyB: string;
  propertyRef: string;
  depositPercent: string;
  includeMortgageClause: boolean;
  includeDldFeeClause: boolean;
}): string {
  return `══════════════════════════════════════════════════════════════════════════════════
DUBAI LAND DEPARTMENT (DLD) OFFICIAL STANDARD CONTRACT (${params.selectedForm.toUpperCase()})
══════════════════════════════════════════════════════════════════════════════════
1. PARTIES:
   • First Party (Broker/Seller): ${params.partyA}
   • Second Party (Buyer/Client): ${params.partyB}

2. SUBJECT PROPERTY:
   • Property Description: ${params.propertyRef}
   • Jurisdiction: Emirate of Dubai, United Arab Emirates (RERA Regulatory Framework)

3. FINANCIAL TERMS & DEPOSITS:
   • Security Deposit: ${params.depositPercent}% held in Escrow account as statutory guarantee.
   ${params.includeDldFeeClause ? '• DLD Transfer Fee: 4.0% payable to Dubai Land Department at Trustee office registration.' : ''}

4. SPECIAL STATUTORY CONDITIONS:
   ${params.includeMortgageClause ? '• Mortgage Finance Contingency: 21 calendar days granted for buyer formal bank approval. In the event of lender rejection with certified proof, deposit is returned in full.' : '• Cash Purchase: Unconditional transaction without mortgage contingencies.'}
   • Governing Law: Dubai Law No. 7 of 2006 concerning Real Property Registration in the Emirate of Dubai.
══════════════════════════════════════════════════════════════════════════════════`;
}
