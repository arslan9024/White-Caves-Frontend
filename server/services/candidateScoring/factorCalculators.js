import { ResumeParserService } from '../ResumeParserService.js';
import {
  CULTURAL_RED_FLAGS,
  DEGREE_VALUES,
  POSITIVE_CULTURAL_INDICATORS,
  TECH_FIELD_KEYWORDS,
  TECH_ROLE_KEYWORDS,
} from './scoringConstants.js';

/**
 * Calculate Skills Match Score (0-100)
 * Based on percentage of job-required skills found in resume
 */
export function calculateSkillsScore(candidate, job) {
  try {
    const resumeData = ResumeParserService.parseResumeText(candidate.resume_text || '');
    const candidateSkills = resumeData.skills.map(s => s.toLowerCase());
    const requiredSkills = (job.required_skills || []).map(s => s.toLowerCase());

    if (requiredSkills.length === 0) return 50;

    const matchedSkills = requiredSkills.filter(skill =>
      candidateSkills.some(cSkill => cSkill.includes(skill) || skill.includes(cSkill))
    );

    const skillMatchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
    const additionalSkillsCount = candidateSkills.length - matchedSkills.length;
    const additionalBonus = Math.min(additionalSkillsCount * 2, 15);

    return Math.min(Math.round(skillMatchPercentage + additionalBonus), 100);
  } catch (error) {
    console.error('Error calculating skills score:', error);
    return 0;
  }
}

/**
 * Calculate Experience Level Score (0-100)
 * Based on years of experience vs. job requirements
 */
export function calculateExperienceScore(candidate) {
  try {
    const resumeData = ResumeParserService.parseResumeText(candidate.resume_text || '');
    const experiences = resumeData.experience || [];

    let totalYears = 0;
    experiences.forEach(exp => {
      const durationMatch = exp.duration?.match(/(\d+)/);
      if (durationMatch) {
        totalYears += parseInt(durationMatch[1], 10);
      }
    });

    if (totalYears === 0 && experiences.length === 0) {
      totalYears = 0;
    } else if (totalYears === 0 && experiences.length > 0) {
      totalYears = experiences.length;
    }

    if (totalYears === 0) return 30;
    if (totalYears <= 2) return 60;
    if (totalYears <= 5) return 85;
    return 100;
  } catch (error) {
    console.error('Error calculating experience score:', error);
    return 0;
  }
}

/**
 * Calculate Education Fit Score (0-100)
 * Based on degree type and field of study
 */
export function calculateEducationScore(candidate, job) {
  try {
    const resumeData = ResumeParserService.parseResumeText(candidate.resume_text || '');
    const educations = resumeData.education || [];

    if (educations.length === 0) {
      return 40;
    }

    let highestScore = 0;
    const jobDepartment = (job.department || '').toLowerCase();
    const jobTitle = (job.title || '').toLowerCase();
    const isTechRole =
      jobDepartment.includes('tech') ||
      TECH_ROLE_KEYWORDS.some(keyword => jobTitle.includes(keyword));

    educations.forEach(edu => {
      const degreeText = edu.degree.toLowerCase();
      let degreeScore = 40;

      Object.keys(DEGREE_VALUES).forEach(degree => {
        if (degreeText.includes(degree)) {
          degreeScore = DEGREE_VALUES[degree];
        }
      });

      const fieldText = edu.field.toLowerCase();
      const isTechField = TECH_FIELD_KEYWORDS.some(keyword => fieldText.includes(keyword));
      const fieldBonus = isTechField && isTechRole ? 10 : 0;

      const totalScore = Math.min(degreeScore + fieldBonus, 100);
      highestScore = Math.max(highestScore, totalScore);
    });

    return highestScore;
  } catch (error) {
    console.error('Error calculating education score:', error);
    return 40;
  }
}

/**
 * Calculate Cultural Fit Score (0-100)
 * Based on indicators in resume (values, interests, previous roles)
 */
export function calculateCulturalFitScore(candidate, job) {
  try {
    const resumeText = (candidate.resume_text || '').toLowerCase();
    let culturalScore = 50;

    const positiveMatches = POSITIVE_CULTURAL_INDICATORS.filter(indicator =>
      resumeText.includes(indicator)
    ).length;
    culturalScore += Math.min(positiveMatches * 3, 30);

    const jobDescription = (job.description || '').toLowerCase();
    const descriptionKeywords = jobDescription.match(/\b\w+\b/g) || [];

    if (descriptionKeywords.length > 0) {
      const alignmentScore = descriptionKeywords.filter(
        keyword => resumeText.includes(keyword) && keyword.length > 4
      ).length;
      culturalScore += Math.min(alignmentScore * 2, 15);
    }

    const redFlagMatches = CULTURAL_RED_FLAGS.filter(flag => resumeText.includes(flag)).length;
    culturalScore -= redFlagMatches * 10;

    return Math.max(Math.min(culturalScore, 100), 0);
  } catch (error) {
    console.error('Error calculating cultural fit score:', error);
    return 50;
  }
}

/**
 * Calculate Location Match Score (0-100)
 * Based on geographic alignment with job location
 */
export function calculateLocationMatchScore(candidate, job) {
  try {
    const candidateLocation = (candidate.location || '').toLowerCase().trim();
    const jobLocation = (job.location || '').toLowerCase().trim();

    if (!candidateLocation || !jobLocation) {
      return 50;
    }

    if (candidateLocation === jobLocation) {
      return 100;
    }

    const candidateParts = candidateLocation.split(/[,\s]+/);
    const jobParts = jobLocation.split(/[,\s]+/);

    const matchedParts = candidateParts.filter(part =>
      jobParts.some(jobPart => jobPart === part)
    ).length;

    if (matchedParts > 0) {
      if (candidateParts[0] === jobParts[0]) {
        return 95;
      }
      return 75;
    }

    const resumeText = (candidate.resume_text || '').toLowerCase();
    const isRemoteCandidate = resumeText.includes('remote') || resumeText.includes('relocation');
    const isRemoteJob = jobLocation.includes('remote') || jobLocation.includes('anywhere');

    if (isRemoteCandidate && isRemoteJob) return 90;
    if (isRemoteJob) return 80;
    if (isRemoteCandidate) return 70;

    return 30;
  } catch (error) {
    console.error('Error calculating location match score:', error);
    return 50;
  }
}
