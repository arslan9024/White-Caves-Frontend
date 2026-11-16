/**
 * assistants35Registry.data.ts — 🔱 The 35 AI Assistants Master Registry
 * White Caves Real Estate LLC — 12 Corporate Departments
 *
 * 1. Luxury Sales & Brokerage: AI_CLARA, AI_SOPHIA, AI_HAMDAN
 * 2. Strategic Off-Plan Developments: AI_ZAYED, AI_RACHID
 * 3. Commercial Real Estate & Investment: AI_MAKTOUM, AI_TARIK
 * 4. Portfolio Management & Residential Leasing: AI_NADIA, AI_YASMIN
 * 5. Asset Management & Facilities (DH2 Hub): AI_SENTINEL, AI_FARAH
 * 6. Revenue, Finance & Treasury: AI_THEODORA, AI_ESCROW_GUARD
 * 7. Performance Marketing & Lead Acquisition: AI_OLIVIA, AI_AD_MATRIX
 * 8. Corporate Communications & Client Experience: AI_CHATS_ROUTER, AI_VIP_RECEPTION
 * 9. Executive Office & Corporate Governance: AI_ZOE, AI_LION_HEART
 * 10. Regulatory Affairs & RERA Compliance: AI_LAILA, AI_AML_SHIELD
 * 11. Conveyancing & Transaction Management: AI_EVANGELINE, AI_TRUSTEE_BOT
 * 12. Market Intelligence & IoT Data Science: AI_PREDICT, AI_HEATMAP
 * Plus 9 Cross-Department Utility & Operations Agents (Total: 35 Agents).
 */

export interface DepartmentDef {
  id: string;
  name: string;
  code: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
}

export interface AssistantDef {
  id: string;
  name: string;
  code: string;
  title: string;
  departmentId: string;
  departmentName: string;
  icon: string;
  color: string;
  avatar: string;
  status: 'active' | 'optimal' | 'standby';
  description: string;
  specialty: string;
  capabilities: string[];
  slaResponseTime: string;
  metrics: {
    accuracyRate: number;
    tasksCompletedToday: number;
    systemHealth: 'optimal' | 'good' | 'warning';
  };
  apiEndpoints: string[];
  dataFlows: {
    inputs: string[];
    outputs: string[];
  };
}

