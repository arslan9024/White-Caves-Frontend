import React from 'react';
import { Plus } from 'lucide-react';
import { Flex, Grid } from '../../ui/chakra';

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleCreate: (e: React.FormEvent) => void;
  cardBg: string;
  borderColor: string;
  textColor: string;
  subTextColor: string;
  inputBg: string;
}

export const AiAssistantCreateForm: React.FC<FormProps> = ({
  formData,
  setFormData,
  handleCreate,
  cardBg,
  borderColor,
  textColor,
  subTextColor,
  inputBg,
}) => {
  return (
          <form onSubmit={handleCreate}>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={12} m="0 0 12px 0">
              <div>
                <label
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: subtextColor,
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Agent ID (Key)
                </label>
                <input
                  required
                  placeholder="e.g. dept-02-sup-01"
                  value={formData.agentId}
                  onChange={e => setFormData({ ...formData, agentId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${borderTone}`,
                    background: isDark ? '#020617' : '#F8FAFC',
                    color: textColor,
                    fontSize: '0.8rem',
                  }}
                  data-testid="input-agent-id"
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: subtextColor,
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Agent Name
                </label>
                <input
                  required
                  placeholder="e.g. Una View Primitive"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${borderTone}`,
                    background: isDark ? '#020617' : '#F8FAFC',
                    color: textColor,
                    fontSize: '0.8rem',
                  }}
                  data-testid="input-agent-name"
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: subtextColor,
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Role & Specialization
                </label>
                <input
                  required
                  placeholder="e.g. UI/UX View Architect"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${borderTone}`,
                    background: isDark ? '#020617' : '#F8FAFC',
                    color: textColor,
                    fontSize: '0.8rem',
                  }}
                  data-testid="input-agent-role"
                />
              </div>
            </Grid>
            <Flex justify="flex-end" gap={8}>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${borderTone}`,
                  background: 'transparent',
                  color: textColor,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                data-testid="submit-create-agent-btn"
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#10B981',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Save Agent to Table
              </button>
            </Flex>
          </form>
  );
};
