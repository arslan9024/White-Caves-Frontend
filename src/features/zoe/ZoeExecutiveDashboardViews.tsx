import React from 'react';
import {
  BusinessMetrics,
  RequirementItem,
  TimelineData,
  EscalationItem,
  ApprovedChange,
} from './ZoeExecutiveDashboard.types';

interface OverviewViewProps {
  businessMetrics: BusinessMetrics;
  requirements: RequirementItem[];
  timeline: TimelineData;
}

export const ZoeOverviewView: React.FC<OverviewViewProps> = ({
  businessMetrics,
  requirements,
  timeline,
}) => (
  <div className="zoe-overview-grid">
    {/* Business Metrics */}
    <section className="zoe-section">
      <h3>📊 Business Metrics Dashboard</h3>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Lead Conversion</div>
          <div className="metric-value">{businessMetrics.leadConversion}%</div>
          <div className="metric-target">Target: &gt;10%</div>
          <div
            className={`metric-status ${businessMetrics.leadConversion > 10 ? 'success' : 'pending'}`}
          >
            {businessMetrics.leadConversion > 10 ? '✓ On Track' : '⏳ In Progress'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Workflow Completion</div>
          <div className="metric-value">{businessMetrics.workflowCompletion}%</div>
          <div className="metric-target">Target: 95%+</div>
          <div
            className={`metric-status ${businessMetrics.workflowCompletion > 95 ? 'success' : 'pending'}`}
          >
            {businessMetrics.workflowCompletion > 95 ? '✓ Success' : '⏳ Testing'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Error Rate</div>
          <div className="metric-value">{businessMetrics.errorRate}%</div>
          <div className="metric-target">Target: &lt;0.5%</div>
          <div
            className={`metric-status ${businessMetrics.errorRate < 0.5 ? 'success' : 'warning'}`}
          >
            {businessMetrics.errorRate < 0.5 ? '✓ Acceptable' : '⚠ Monitor'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">API Response Time</div>
          <div className="metric-value">{businessMetrics.apiResponseTime}ms</div>
          <div className="metric-target">Target: &lt;500ms</div>
          <div
            className={`metric-status ${businessMetrics.apiResponseTime < 500 ? 'success' : 'warning'}`}
          >
            {businessMetrics.apiResponseTime < 500 ? '✓ Fast' : '⚠ Slow'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Concurrent Users</div>
          <div className="metric-value">{businessMetrics.concurrentUsers}</div>
          <div className="metric-target">Target: 80+</div>
          <div
            className={`metric-status ${businessMetrics.concurrentUsers >= 80 ? 'success' : 'pending'}`}
          >
            {businessMetrics.concurrentUsers >= 80 ? '✓ Capacity' : '⏳ Loading'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Contract Execution</div>
          <div className="metric-value">{businessMetrics.contractExecution}%</div>
          <div className="metric-target">Target: 95%+</div>
          <div
            className={`metric-status ${businessMetrics.contractExecution > 95 ? 'success' : 'pending'}`}
          >
            {businessMetrics.contractExecution > 95 ? '✓ Complete' : '⏳ Processing'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Compliance Score</div>
          <div className="metric-value">{businessMetrics.complianceScore}</div>
          <div className="metric-target">Target: 100</div>
          <div
            className={`metric-status ${businessMetrics.complianceScore === 100 ? 'success' : 'pending'}`}
          >
            {businessMetrics.complianceScore === 100 ? '✓ Compliant' : '⏳ Validating'}
          </div>
        </div>
      </div>
    </section>

    {/* Requirements Matrix */}
    <section className="zoe-section">
      <h3>✅ Zoe&apos;s Approved Requirements</h3>
      <table className="requirements-table">
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Business Metric</th>
            <th>Success Target</th>
            <th>Current Actual</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req, idx) => (
            <tr key={idx} className={`status-${req.status}`}>
              <td>{req.requirement}</td>
              <td>{req.metric}</td>
              <td className="target">{req.target}</td>
              <td className="actual">{req.actual}</td>
              <td>
                <span className={`status-badge ${req.status}`}>
                  {req.status === 'pending' ? '⏳' : req.status === 'success' ? '✓' : '⚠'}{' '}
                  {req.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    {/* Timeline Progress */}
    <section className="zoe-section">
      <h3>⏰ Wednesday Timeline Progress</h3>
      <div className="timeline-container">
        <div
          className={`timeline-phase ${timeline.morning?.complete ? 'complete' : 'in-progress'}`}
        >
          <div className="phase-header">Morning Session</div>
          <div className="phase-time">8 AM - 12:30 PM</div>
          <div className="phase-status">
            {timeline.morning?.complete ? '✓ Complete' : '⏳ In Progress'}
          </div>
        </div>

        <div className={`timeline-phase ${timeline.afternoon?.complete ? 'complete' : 'pending'}`}>
          <div className="phase-header">Afternoon Session</div>
          <div className="phase-time">1:30 PM - 5:00 PM</div>
          <div className="phase-status">
            {timeline.afternoon?.complete ? '✓ Complete' : '⏳ Pending'}
          </div>
        </div>

        <div className={`timeline-phase ${timeline.evening?.complete ? 'complete' : 'pending'}`}>
          <div className="phase-header">Evening Session</div>
          <div className="phase-time">5:00 PM - 7:00 PM</div>
          <div className="phase-status">
            {timeline.evening?.complete ? '✓ Complete' : '⏳ Pending'}
          </div>
        </div>
      </div>
    </section>
  </div>
);

interface EscalationsViewProps {
  escalations: EscalationItem[];
  onAction: (action: 'approved' | 'halted', escalationId: string) => void;
}

export const ZoeEscalationsView: React.FC<EscalationsViewProps> = ({ escalations, onAction }) => (
  <section className="zoe-section escalations-section">
    <h3>🚨 Escalations Requiring Zoe Approval</h3>
    {escalations.length === 0 ? (
      <div className="no-escalations">
        <p>✓ No active escalations</p>
      </div>
    ) : (
      <div className="escalations-list">
        {escalations.map((esc, idx) => (
          <div key={idx} className={`escalation-card severity-${esc.severity}`}>
            <div className="escalation-header">
              <span className="severity-badge">{esc.severity?.toUpperCase()}</span>
              <span className="escalation-service">{esc.service}</span>
              <span className="escalation-time">
                {esc.timestamp ? new Date(esc.timestamp).toLocaleTimeString() : ''}
              </span>
            </div>
            <div className="escalation-message">{esc.message}</div>
            <div className="escalation-actions">
              <button className="btn-approve" onClick={() => onAction('approved', esc.id)}>
                ✓ Approve & Continue
              </button>
              <button className="btn-halt" onClick={() => onAction('halted', esc.id)}>
                ✗ Halt Testing
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

interface ApprovedChangesViewProps {
  approvedChanges: ApprovedChange[];
}

export const ZoeApprovedChangesView: React.FC<ApprovedChangesViewProps> = ({ approvedChanges }) => (
  <section className="zoe-section approved-changes">
    <h3>📝 Zoe&apos;s Approved Requirement Changes</h3>
    {approvedChanges.length === 0 ? (
      <div className="no-changes">
        <p>No requirement changes yet. All requirements are per original plan.</p>
      </div>
    ) : (
      <div className="changes-list">
        {approvedChanges.map((change, idx) => (
          <div key={idx} className="change-card">
            <div className="change-header">
              <span className="change-timestamp">
                {change.timestamp ? new Date(change.timestamp).toLocaleString() : ''}
              </span>
              <span className="change-type">{change.type}</span>
            </div>
            <div className="change-detail">{change.description}</div>
            <div className="change-impact">
              <strong>Business Impact:</strong> {change.businessImpact}
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

