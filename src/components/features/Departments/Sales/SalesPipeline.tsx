import React from 'react';
import { formatCurrency } from '../../../../utils';
import { PipelineStageItem } from './types';
import { getStageColor } from './constants';
import {
  SectionCard,
  SectionTitle,
  PipelineContainer,
  PipelineStage,
  PipelineStageName,
  PipelineCount,
  PipelineValue,
} from './styled';

interface SalesPipelineProps {
  pipelineStages: PipelineStageItem[];
}

export const SalesPipeline: React.FC<SalesPipelineProps> = ({ pipelineStages }) => {
  return (
    <SectionCard>
      <SectionTitle>📊 Sales Pipeline</SectionTitle>
      <PipelineContainer>
        {pipelineStages.map((stage, idx) => (
          <PipelineStage
            key={idx}
            style={{ borderLeftColor: getStageColor(stage.name) }}
          >
            <PipelineStageName>{stage.name}</PipelineStageName>
            <PipelineCount>{stage.count} deals</PipelineCount>
            <PipelineValue>{formatCurrency(stage.value)}</PipelineValue>
          </PipelineStage>
        ))}
      </PipelineContainer>
    </SectionCard>
  );
};
