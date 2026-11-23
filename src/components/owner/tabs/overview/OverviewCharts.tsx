import React from 'react';
import {
  PRIMARY_COLOR,
  REVENUE_MONTHS_DATA,
  PROPERTY_DISTRIBUTION_DATA,
  type ModuleZone,
} from './overviewConstants';
import { OverviewExecutiveSection } from './OverviewExecutiveSection';

export interface OverviewChartsProps {
  isManagingDirector: boolean;
  moduleZones: ModuleZone[];
  assistantPreview: Array<{ id: string; name: string; avatar: string; department: string }>;
  snapshotsExpanded: boolean;
  onToggleSnapshots: () => void;
}

export const OverviewCharts: React.FC<OverviewChartsProps> = ({
  isManagingDirector,
  moduleZones,
  assistantPreview,
  snapshotsExpanded,
  onToggleSnapshots,
}) => {
  return (
    <div className="dashboard-row">
      <div className="chart-card">
        <div className="tab-section-heading">
          <div>
            <span className="tab-section-kicker">Revenue</span>
            <h3>Revenue Trend (2024)</h3>
          </div>

          {isManagingDirector && (
            <OverviewExecutiveSection
              moduleZones={moduleZones}
              assistantPreview={assistantPreview}
              snapshotsExpanded={snapshotsExpanded}
              onToggleSnapshots={onToggleSnapshots}
            />
          )}
          <p>Month-over-month performance in AED millions.</p>
        </div>
        <div className="simple-chart">
          {REVENUE_MONTHS_DATA.map((item, i) => (
            <div key={`revenue-month-${i}`} className="chart-bar-container">
              <div
                className="chart-bar"
                style={{
                  height: `${(item.value / 3.5) * 100}%`,
                  background: `linear-gradient(to top, ${PRIMARY_COLOR}, #F87171)`,
                }}
              />
              <span className="chart-label">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <span>Revenue in Millions (AED)</span>
        </div>
      </div>

      <div className="chart-card">
        <div className="tab-section-heading">
          <div>
            <span className="tab-section-kicker">Mix</span>
            <h3>Property Distribution</h3>
          </div>
          <p>Portfolio weighting by asset class.</p>
        </div>
        <div className="pie-chart-placeholder">
          <div className="pie-segments">
            {PROPERTY_DISTRIBUTION_DATA.map(segment => (
              <div
                key={segment.label}
                className="pie-segment"
                style={
                  {
                    '--segment-color': segment.color,
                    '--segment-percent': segment.percent,
                  } as React.CSSProperties
                }
              >
                <span>{segment.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
