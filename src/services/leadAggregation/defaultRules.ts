import type { DeduplicationRule, ScoringRule } from './types';

export function getDefaultDeduplicationRules(): DeduplicationRule[] {
  return [
    {
      name: 'exact_email_match',
      fields: ['email'],
      priority: 100,
      action: 'merge',
      merge: (existingLead, newLead) => {
        const rawPortals = [...(existingLead.portals || []), newLead.portalId || ''];
        const uniquePortals: string[] = [];
        for (const p of rawPortals) {
          if (p && uniquePortals.indexOf(p) === -1) {
            uniquePortals.push(p);
          }
        }

        return {
          ...existingLead,
          lastContactDate:
            newLead.createdAt &&
            existingLead.lastContactDate &&
            newLead.createdAt > existingLead.lastContactDate
              ? newLead.createdAt
              : existingLead.lastContactDate || newLead.createdAt,
          portals: uniquePortals,
          contactCount: (existingLead.contactCount || 0) + 1,
        };
      },
    },
    {
      name: 'phone_and_name_match',
      fields: ['phone', 'name'],
      priority: 80,
      action: 'merge',
    },
    {
      name: 'email_domain_and_phone',
      fields: ['email_domain', 'phone'],
      priority: 60,
      action: 'merge',
    },
  ];
}

export function getDefaultScoringRules(): ScoringRule[] {
  return [
    {
      name: 'has_email',
      condition: lead => Boolean(lead.email && lead.email.length > 0),
      points: 20,
    },
    {
      name: 'has_phone',
      condition: lead => Boolean(lead.phone && lead.phone.length > 0),
      points: 20,
    },
    {
      name: 'has_message',
      condition: lead => Boolean(lead.message && lead.message.length > 10),
      points: 15,
    },
    {
      name: 'from_trusted_portal',
      condition: lead => ['bayut', 'propertyfinder'].includes(lead.portalId || ''),
      points: 25,
    },
    {
      name: 'verified_contact',
      condition: lead => lead.verified === true,
      points: 30,
    },
    {
      name: 'quick_response_required',
      condition: lead => {
        if (!lead.createdAt) return false;
        const age = Date.now() - new Date(lead.createdAt).getTime();
        return age < 3600000; // Less than 1 hour
      },
      points: 20,
    },
  ];
}
