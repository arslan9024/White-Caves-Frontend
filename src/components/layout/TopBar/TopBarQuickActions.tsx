import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleCommandPalette } from '../../../store/slices/sidebarSlice';
import {
  ActionAnchor,
  QuickActionButton,
  DropdownOverlay,
  DropdownMenu,
  DropdownHeader,
  DropdownHeaderName,
  DropdownDivider,
  DropdownItem,
} from './styles';

interface QuickActionsMenuProps {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  onClose: () => void;
}

export const TopBarQuickActions: React.FC<QuickActionsMenuProps> = React.memo(
  function TopBarQuickActions({ isOpen, anchorRef, onToggle, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
      <ActionAnchor ref={anchorRef as any}>
        <QuickActionButton
          onClick={onToggle}
          aria-label="Quick actions"
          data-testid="quick-actions-btn"
        >
          <Plus size={16} />
          <span>Quick Actions</span>
        </QuickActionButton>
        {isOpen && (
          <>
            <DropdownOverlay onClick={onClose} />
            <DropdownMenu $align="right" data-testid="quick-actions-menu">
              <DropdownHeader>
                <DropdownHeaderName>Quick Actions</DropdownHeaderName>
              </DropdownHeader>
              <DropdownDivider />
              <DropdownItem
                onClick={() => {
                  navigate('/leads/new');
                  onClose();
                }}
              >
                Create Lead
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  navigate('/properties/new');
                  onClose();
                }}
              >
                Add Property
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  navigate('/transactions/new');
                  onClose();
                }}
              >
                New Transaction
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  dispatch(toggleCommandPalette());
                  onClose();
                }}
              >
                Global Search
              </DropdownItem>
            </DropdownMenu>
          </>
        )}
      </ActionAnchor>
    );
  }
);
