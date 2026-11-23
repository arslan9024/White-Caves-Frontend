import React from 'react';
import { SoloLeasingDeal } from './types';
import { Card, Badge, MetaRow } from './styles';
import { generatePdcSchedule } from '../../utils/generatePdcSchedule';

interface InvoicingTabProps {
  deals: SoloLeasingDeal[];
}

export const InvoicingTab: React.FC<InvoicingTabProps> = ({ deals }) => {
  return (
    <Card>
      <h3>Commission Tax Invoicing & Post-Dated Cheques (Law 50/2022)</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
        Automated UAE 5% FTA VAT invoice generation + Post-Dated Cheque schedules.
      </p>
      {deals.map(deal => {
        const pdcSchedule = generatePdcSchedule(
          deal.annualRent,
          deal.chequeCount,
          '2026-12-01',
          deal.landlordName
        );
        return (
          <div
            key={deal.id}
            style={{
              border: '1px solid #334155',
              padding: '16px',
              borderRadius: '6px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>
                {deal.propertyTitle} — Unit {deal.unitNumber}
              </strong>
              <Badge $bg="#059669">Total Invoiced: AED {deal.totalInvoiceAed.toLocaleString()}</Badge>
            </div>
            <MetaRow>
              <span>Commission (5% Base):</span>
              <span>AED {deal.commissionAed.toLocaleString()}</span>
            </MetaRow>
            <MetaRow>
              <span>UAE FTA VAT (5% on Commission):</span>
              <span>AED {deal.vatAed.toFixed(2)}</span>
            </MetaRow>

            <h4 style={{ margin: '12px 0 6px', fontSize: '0.85rem', color: '#f8fafc' }}>
              PDC Schedule ({deal.chequeCount} Cheques):
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {pdcSchedule.map((cheque, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    background: '#0f172a',
                    padding: '6px 10px',
                    borderRadius: '4px',
                  }}
                >
                  <span>
                    Cheque #{idx + 1} ({cheque.dueDate})
                  </span>
                  <strong>AED {cheque.amountAED.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Card>
  );
};
