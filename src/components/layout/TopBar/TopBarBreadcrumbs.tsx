import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbsSection, BreadcrumbItem, BreadcrumbSeparator } from './styles';
import type { BreadcrumbCrumb } from './types';

interface BreadcrumbsProps {
  crumbs: BreadcrumbCrumb[];
}

export const TopBarBreadcrumbs: React.FC<BreadcrumbsProps> = React.memo(function TopBarBreadcrumbs({
  crumbs,
}) {
  const navigate = useNavigate();

  return (
    <BreadcrumbsSection aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <React.Fragment key={i}>
          {i > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
          <BreadcrumbItem
            $isLast={i === crumbs.length - 1}
            onClick={() => {
              if (i < crumbs.length - 1) {
                if (crumb.action) {
                  crumb.action();
                } else if (crumb.path) {
                  navigate(crumb.path);
                }
              }
            }}
            aria-current={i === crumbs.length - 1 ? 'page' : undefined}
          >
            {crumb.label}
          </BreadcrumbItem>
        </React.Fragment>
      ))}
    </BreadcrumbsSection>
  );
});
