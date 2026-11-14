import React from 'react';
import { employeeStyles as s } from './EmployeeManager.styles';
import { EmployeeItem } from './EmployeeManager.types';

export const getRoleBadgeClass = (tier: string) => {
  switch (tier) {
    case 'EXECUTIVE':
      return s.roleExecutive;
    case 'DIRECTOR':
      return s.roleDirector;
    case 'MANAGER':
      return s.roleManager;
    case 'SUPERVISOR':
      return s.roleSupervisor;
    case 'BROKER':
      return s.roleBroker;
    default:
      return s.roleSpecialist;
  }
};

export const getStatusClass = (status: string) => {
  switch (status) {
    case 'active':
      return s.statusActive;
    case 'onboarding':
      return s.statusOnboarding;
    case 'probation':
      return s.statusProbation;
    default:
      return s.statusStandby;
  }
};

export interface EmployeeCardItemProps {
  emp: EmployeeItem;
  isHighlighted: boolean;
  onOpenEdit: (emp: EmployeeItem) => void;
  onDemoteEmployee: (id: string, reason: string) => void;
}

export const EmployeeCardItem: React.FC<EmployeeCardItemProps> = ({
  emp,
  isHighlighted,
  onOpenEdit,
  onDemoteEmployee,
}) => {
  return (
    <div
      key={emp._id}
      id={`record-${emp._id || emp.employeeCode}`}
      className={s.card}
      style={
        isHighlighted
          ? {
              border: '2px solid #EF4444',
              boxShadow: '0 0 25px rgba(239, 68, 68, 0.45)',
              transition: 'all 0.3s ease',
            }
          : undefined
      }
      data-testid={`employee-card-${emp.employeeCode}`}
    >
      <div>
        <div className={s.cardTop}>
          <div className={s.cardIdentity}>
            <div className={s.avatar}>
              {emp.fullName
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className={s.codePill}>{emp.employeeCode}</span>
                <span className={`${s.roleBadge} ${getRoleBadgeClass(emp.roleTier)}`}>
                  {emp.roleTier}
                </span>
              </div>
              <h3 className={s.name}>{emp.fullName}</h3>
              <div className={s.designation}>{emp.designation}</div>
            </div>
          </div>
          <span className={`${s.statusPill} ${getStatusClass(emp.status)}`}>
            ● {emp.status.toUpperCase()}
          </span>
        </div>

        <div className={s.metaSection}>
          <div className={s.metaRow}>
            <span className={s.metaLabel}>Pillar</span>
            <span className="text-slate-300 font-semibold truncate max-w-[160px]">
              {emp.pillarName}
            </span>
          </div>
          <div className={s.metaRow}>
            <span className={s.metaLabel}>Reports To</span>
            <span className={s.metaValue}>{emp.supervisorName}</span>
          </div>
          {emp.reraCardNumber && (
            <div className={s.metaRow}>
              <span className={s.metaLabel}>RERA Card</span>
              <span className="text-amber-400 font-mono font-bold text-[11px]">
                {emp.reraCardNumber}
              </span>
            </div>
          )}
          <div className={s.metaRow}>
            <span className={s.metaLabel}>Compensation</span>
            <span className="text-emerald-400 font-mono text-[11px]">
              AED {emp.baseSalaryAED.toLocaleString()} + {emp.commissionRatePct}%
            </span>
          </div>
        </div>

        <div className={s.skillsRow}>
          {emp.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className={s.skillTag}>
              {skill}
            </span>
          ))}
          {emp.skills.length > 3 && (
            <span className={s.skillTag}>+{emp.skills.length - 3}</span>
          )}
        </div>
      </div>

      <div className={s.cardFooter}>
        <button
          onClick={() => onOpenEdit(emp)}
          className={s.editBtn}
          data-testid={`edit-emp-${emp.employeeCode}`}
        >
          <span>✏️</span>
          <span>Edit Profile</span>
        </button>
        <button
          onClick={() => onDemoteEmployee(emp._id, 'Moved to Standby Reserve')}
          className={s.demoteBtn}
          title="Shift to Standby Pool"
          data-testid={`demote-emp-${emp.employeeCode}`}
        >
          ⬇️
        </button>
      </div>
    </div>
  );
};
