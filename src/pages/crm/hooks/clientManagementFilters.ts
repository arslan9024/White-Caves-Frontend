import { Client } from './clientManagement.types';

export function filterClientsList(allClients: Client[], search: string, typeFilter: string, statusFilter: string): Client[] {
  return allClients.filter((c: Client) => {
    if (typeFilter !== 'ALL' && c.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = c.name?.toLowerCase().includes(q);
      const matchEmail = c.email?.toLowerCase().includes(q);
      const matchCompany = c.company?.toLowerCase().includes(q);
      const matchPhone = c.phone?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchCompany && !matchPhone) return false;
    }
    return true;
  });
}

export function computeClientTypeCounts(allClients: Client[]): Record<string, number> {
  const counts: Record<string, number> = { ALL: allClients.length };
  allClients.forEach((c: Client) => {
    const t = c.type || 'OTHER';
    counts[t] = (counts[t] || 0) + 1;
  });
  return counts;
}
