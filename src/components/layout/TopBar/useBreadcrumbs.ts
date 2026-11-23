import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  selectSelectedDepartment,
  selectSelectedService,
  selectSelectedAssistant,
  clearSelectedAssistant,
} from '../../../store/slices/sidebarSlice';
import { DEPARTMENT_LABELS, ASSISTANT_LABELS } from './constants';
import type { BreadcrumbCrumb } from './types';

/**
 * Custom hook to generate breadcrumbs based on route, department, service, and assistant
 * Decomposed under AEGIS V5.1 AEG-042 (< 310 lines)
 */
export function useBreadcrumbs(): BreadcrumbCrumb[] {
  const dispatch = useDispatch();
  const location = useLocation();
  const department = useSelector(selectSelectedDepartment);
  const service = useSelector(selectSelectedService);
  const assistant = useSelector(selectSelectedAssistant);

  const crumbs: BreadcrumbCrumb[] = [{ label: 'Dashboard', path: '/crm' }];

  // Add path-based breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);
  const [rolePart, ...remainingParts] = pathParts;
  if (pathParts.length > 1 && rolePart && rolePart !== 'dashboard') {
    crumbs[0] = {
      label: rolePart.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      path: '/crm',
    };
    for (const [idx, part] of remainingParts.entries()) {
      crumbs.push({
        label: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        path: `/${pathParts.slice(0, idx + 2).join('/')}`,
      });
    }
  }

  // Department level
  if (department && Object.prototype.hasOwnProperty.call(DEPARTMENT_LABELS, department)) {
    const alreadyInPath = crumbs.some(c => c.label.toLowerCase() === department);
    if (!alreadyInPath) {
      crumbs.push({
        label: DEPARTMENT_LABELS[department],
        action: () => {
          dispatch(clearSelectedAssistant());
        },
      });
    }
  }

  // Service level
  if (service) {
    crumbs.push({
      label: service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      action: () => {
        dispatch(clearSelectedAssistant());
      },
    });
  }

  // Assistant level (deepest)
  if (assistant) {
    const label =
      ASSISTANT_LABELS[assistant] ??
      assistant.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    crumbs.push({ label });
  }

  return crumbs;
}
