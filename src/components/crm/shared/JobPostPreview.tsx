import React from 'react';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';
import * as S from './JobComponents.styles';

export interface JobData {
  title?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  experienceLevel?: string;
  salaryMin?: string;
  salaryMax?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  [key: string]: unknown;
}

export const JobPostPreview: React.FC<{ formData: JobData }> = ({ formData }) => {
  return (
    <S.JobPreview>
      <h4>Job Preview</h4>
      <S.PreviewCard>
        <S.PreviewHeader>
          <h3>{formData.title || 'Job Title'}</h3>
          <span className="company">White Caves Real Estate</span>
        </S.PreviewHeader>
        <S.PreviewMeta>
          <span>
            <MapPin size={14} /> {formData.location || 'Location'}
          </span>
          <span>
            <Clock size={14} /> {formData.employmentType}
          </span>
          <span>
            <Users size={14} /> {formData.department || 'Department'}
          </span>
          {formData.salaryMin && formData.salaryMax && (
            <span>
              <DollarSign size={14} /> AED {formData.salaryMin} - {formData.salaryMax}/month
            </span>
          )}
        </S.PreviewMeta>
        {formData.description && (
          <S.PreviewSection>
            <h5>Description</h5>
            <p>{formData.description}</p>
          </S.PreviewSection>
        )}
        {formData.requirements && (
          <S.PreviewSection>
            <h5>Requirements</h5>
            <p>{formData.requirements}</p>
          </S.PreviewSection>
        )}
        {formData.benefits && (
          <S.PreviewSection>
            <h5>Benefits</h5>
            <p>{formData.benefits}</p>
          </S.PreviewSection>
        )}
      </S.PreviewCard>
    </S.JobPreview>
  );
};

