import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SIDEBAR_DEPARTMENTS as DEPARTMENTS } from '../../../config/departmentConfig';
import {
  DrawerNavItem,
  DrawerNavIcon,
  DrawerNavBadge,
  DrawerSubItems,
  DrawerSubItem,
  DrawerSubDot,
} from './styles';

interface MobileDrawerDepartmentListProps {
  selectedDepartment: string | null;
  selectedSvc: string | null;
  expanded: Record<string, boolean>;
  badgeCounts: Record<string, number>;
  onDeptClick: (deptId: string) => void;
  onServiceClick: (deptId: string, service: string) => void;
}

export const MobileDrawerDepartmentList: React.FC<MobileDrawerDepartmentListProps> = ({
  selectedDepartment,
  selectedSvc,
  expanded,
  badgeCounts,
  onDeptClick,
  onServiceClick,
}) => {
  return (
    <>
      {Object.entries(DEPARTMENTS).map(([deptId, dept]) => {
        const Icon = dept.icon;
        const isActive = selectedDepartment === deptId;
        const isExpanded = !!expanded[deptId];
        const badge = dept.badgeKey ? badgeCounts[dept.badgeKey] : 0;

        return (
          <React.Fragment key={deptId}>
            <DrawerNavItem
              $active={isActive}
              $color={dept.color}
              onClick={() => onDeptClick(deptId)}
              aria-expanded={isExpanded}
              aria-label={dept.label}
            >
              <DrawerNavIcon $color={dept.color}>
                <Icon size={18} />
              </DrawerNavIcon>
              {dept.label}
              {badge > 0 && (
                <DrawerNavBadge aria-label={`${badge} items`}>
                  {badge > 99 ? '99+' : badge}
                </DrawerNavBadge>
              )}
              <ChevronDown
                size={14}
                style={{
                  marginLeft: badge > 0 ? '4px' : 'auto',
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.2s ease',
                  color: '#9CA3AF',
                }}
              />
            </DrawerNavItem>
            <DrawerSubItems $expanded={isExpanded}>
              {dept.services.map(service => {
                const isActiveSvc = selectedDepartment === deptId && selectedSvc === service;
                return (
                  <DrawerSubItem
                    key={service}
                    $active={isActiveSvc}
                    onClick={() => onServiceClick(deptId, service)}
                  >
                    <DrawerSubDot $color={dept.color} />
                    {service}
                  </DrawerSubItem>
                );
              })}
            </DrawerSubItems>
          </React.Fragment>
        );
      })}
    </>
  );
};

