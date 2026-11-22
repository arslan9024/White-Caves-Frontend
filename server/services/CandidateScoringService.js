import { PrismaClient } from '@prisma/client';
import { normalizeCandidateScore } from './recruitmentRecordMapper.js';
import { DEFAULT_WEIGHTS, SKILL_CATEGORIES } from './candidateScoring/scoringConstants.js';
import {
  calculateCulturalFitScore,
  calculateEducationScore,
  calculateExperienceScore,
  calculateLocationMatchScore,
  calculateSkillsScore,
} from './candidateScoring/factorCalculators.js';
import {
  computeWeightedOverallScore,
  determineScreeningStatus,
  generateFeedback,
} from './candidateScoring/scoringFeedback.js';
import {
  formatPhoneForWhatsApp,
  sendScoringResultViaMeta,
  sendTemplateMessageViaMeta,
} from './candidateScoring/whatsappNotifications.js';

const prisma = new PrismaClient();

/**
 * Candidate Scoring Service - Phase 1B
 *
 * Implements a 5-factor scoring algorithm for resume screening:
 * 1. Skills Match (0-100) - Percentage of job-required skills found
 * 2. Experience Level (0-100) - Years of experience vs. job requirement
 * 3. Education Fit (0-100) - Degree type and field alignment
 * 4. Cultural Fit (0-100) - Company values indicators from resume
 * 5. Location Match (0-100) - Geographic alignment with job location
 *
 * Overall Score = Weighted average of the 5 factors
 * Weights can be adjusted per job or using defaults
 */
export class CandidateScoringService {
  static DEFAULT_WEIGHTS = DEFAULT_WEIGHTS;
  static SKILL_CATEGORIES = SKILL_CATEGORIES;

  /**
   * Score a single candidate against a specific job
   */
  static async scoreCandidateForJob(candidateId, jobId, weights = null) {
    try {
      const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId },
        include: { applications: true },
      });

      const job = await prisma.job.findUnique({
        where: { id: jobId },
      });

      if (!candidate || !job) {
        throw new Error('Candidate or Job not found');
      }

      const finalWeights = weights || this.DEFAULT_WEIGHTS;

      const skillsScore = this.calculateSkillsScore(candidate, job);
      const experienceScore = this.calculateExperienceScore(candidate, job);
      const educationScore = this.calculateEducationScore(candidate, job);
      const culturalScore = this.calculateCulturalFitScore(candidate, job);
      const locationScore = this.calculateLocationMatchScore(candidate, job);

      const factorScores = {
        skills: skillsScore,
        experience: experienceScore,
        education: educationScore,
        cultural_fit: culturalScore,
        location_match: locationScore,
      };

      const overallScore = computeWeightedOverallScore(factorScores, finalWeights);

      const scoreRecord = await prisma.candidateScore.create({
        data: {
          candidate_id: candidateId,
          job_id: jobId,
          overall_score: overallScore,
          skills_score: skillsScore,
          experience_score: experienceScore,
          education_score: educationScore,
          cultural_fit: culturalScore,
          location_match: locationScore,
          scoring_method: 'rule_based_v1',
          feedback: this.generateFeedback(factorScores),
        },
      });

      let messageSent = false;
      if (candidate.phone || candidate.whatsapp_phone) {
        try {
          messageSent = Boolean(
            await this.sendScoringResultViaMeta(
              candidate,
              job,
              normalizeCandidateScore(scoreRecord)
            )
          );
        } catch (whatsappError) {
          console.warn('Failed to send WhatsApp message:', whatsappError.message);
        }
      }

      return { ...normalizeCandidateScore(scoreRecord), message_sent: messageSent };
    } catch (error) {
      console.error('Error scoring candidate:', error);
      throw error;
    }
  }

  static async sendTemplateMessageViaMeta(candidate, templateId, variables, messageType = 'text') {
    return sendTemplateMessageViaMeta(candidate, templateId, variables, messageType, {
      formatPhone: this.formatPhoneForWhatsApp.bind(this),
    });
  }

  static async sendScoringResultViaMeta(candidate, job, scoreRecord) {
    return sendScoringResultViaMeta(candidate, job, scoreRecord, {
      sendTemplateMessage: this.sendTemplateMessageViaMeta.bind(this),
      formatPhone: this.formatPhoneForWhatsApp.bind(this),
    });
  }

  static formatPhoneForWhatsApp(phone) {
    return formatPhoneForWhatsApp(phone);
  }

  static calculateSkillsScore(candidate, job) {
    return calculateSkillsScore(candidate, job);
  }

  static calculateExperienceScore(candidate) {
    return calculateExperienceScore(candidate);
  }

  static calculateEducationScore(candidate, job) {
    return calculateEducationScore(candidate, job);
  }

  static calculateCulturalFitScore(candidate, job) {
    return calculateCulturalFitScore(candidate, job);
  }

  static calculateLocationMatchScore(candidate, job) {
    return calculateLocationMatchScore(candidate, job);
  }

  static determineScreeningStatus(score) {
    return determineScreeningStatus(score);
  }

  static generateFeedback(scores) {
    return generateFeedback(scores);
  }

  /**
   * Batch score multiple candidates for a job
   */
  static async batchScoreCandidatesForJob(jobId, weights = null) {
    try {
      const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: {
          applications: {
            include: { candidate: true },
            where: { status: { in: ['applied', 'screening'] } },
          },
        },
      });

      if (!job) {
        throw new Error('Job not found');
      }

      const scores = [];
      for (const application of job.applications) {
        const score = await this.scoreCandidateForJob(application.candidate_id, jobId, weights);
        scores.push(score);
      }

      scores.sort((a, b) => b.overall_score - a.overall_score);
      return scores;
    } catch (error) {
      console.error('Error batch scoring candidates:', error);
      throw error;
    }
  }

  /**
   * Get top candidates for a job above a score threshold
   */
  static async getTopCandidatesForJob(jobId, threshold = 75, limit = 10) {
    try {
      const topCandidates = await prisma.candidateScore.findMany({
        where: {
          job_id: jobId,
          overall_score: { gte: threshold },
        },
        include: {
          candidate: true,
          job: true,
        },
        orderBy: { overall_score: 'desc' },
        take: limit,
      });

      return topCandidates;
    } catch (error) {
      console.error('Error fetching top candidates:', error);
      throw error;
    }
  }

  /**
   * Update job weights for scoring
   */
  static async updateJobScoringWeights(jobId, weights) {
    try {
      const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
      if (Math.abs(totalWeight - 1.0) > 0.01) {
        throw new Error('Weights must sum to 1.0');
      }

      await prisma.job.update({
        where: { id: jobId },
        data: {
          scoring_weights: JSON.stringify(weights),
        },
      });

      return weights;
    } catch (error) {
      console.error('Error updating job scoring weights:', error);
      throw error;
    }
  }
}
