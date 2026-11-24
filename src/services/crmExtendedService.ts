import api from './api';

export async function fetchClients(params?: Record<string, string>) {
  const res = await authFetch(`${API}/clients${buildQuery(params)}`);
  return parseResponse<unknown[]>(res);
}

export async function fetchClient(id: string) {
  const res = await authFetch(`${API}/clients/${id}`);
  return parseResponse<Record<string, unknown>>(res);
}

export async function createClient(data: Record<string, unknown>) {
  const res = await authFetch(`${API}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function updateClient(id: string, data: Record<string, unknown>) {
  const res = await authFetch(`${API}/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function deleteClient(id: string) {
  const res = await authFetch(`${API}/clients/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(await extractApiError(res, 'Failed to delete client'));
  }
  return id;
}

// ─── Notifications ──────────────────────────────────────────────────────

export async function fetchNotifications(params?: Record<string, string>) {
  const res = await authFetch(`${API}/notifications${buildQuery(params)}`);
  return parseResponse<unknown[]>(res);
}

export async function fetchUnreadCount() {
  const res = await authFetch(`${API}/notifications/unread-count`);
  return parseResponse<{ unreadCount: number }>(res);
}

export async function markNotificationRead(id: string) {
  const res = await authFetch(`${API}/notifications/${id}/read`, {
    method: 'PATCH',
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function markAllNotificationsRead() {
  const res = await authFetch(`${API}/notifications/read-all`, {
    method: 'PATCH',
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function deleteNotification(id: string) {
  const res = await authFetch(`${API}/notifications/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(await extractApiError(res, 'Failed to delete notification'));
  }
  return id;
}

// ─── Favorites ──────────────────────────────────────────────────────────

export async function fetchFavorites() {
  const res = await authFetch(`${API}/favorites`);
  return parseResponse<unknown[]>(res);
}

export async function addFavorite(propertyId: string) {
  const res = await authFetch(`${API}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ propertyId }),
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function removeFavorite(propertyId: string) {
  const res = await authFetch(`${API}/favorites/${propertyId}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(await extractApiError(res, 'Failed to remove favorite'));
  }
  return propertyId;
}

export async function checkFavorite(propertyId: string) {
  const res = await authFetch(`${API}/favorites/check/${propertyId}`);
  return parseResponse<{ isFavorited: boolean }>(res);
}

// ─── Users (Management) ────────────────────────────────────────────────

export async function fetchUsers(params?: Record<string, string>) {
  const res = await authFetch(`${API}/users${buildQuery(params)}`);
  return parseResponse<unknown[]>(res);
}

export async function fetchUser(id: string) {
  const res = await authFetch(`${API}/users/${id}`);
  return parseResponse<Record<string, unknown>>(res);
}

export async function updateUserRole(id: string, role: string) {
  const res = await authFetch(`${API}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function updateUserStatus(id: string, status: string) {
  const res = await authFetch(`${API}/users/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return parseResponse<Record<string, unknown>>(res);
}

// ─── Reporting ──────────────────────────────────────────────────────────

export async function fetchDashboardSummary() {
  const res = await authFetch(`${API}/dashboard/summary`);
  const payload = await parseResponse<DashboardSummaryPayload>(res);
  return normalizeDashboardSummary(payload);
}

export async function fetchExecutiveReport() {
  const res = await authFetch(`${API}/dashboard/executive`);
  const payload = await parseResponse<DashboardExecutivePayload>(res);
  return normalizeDashboardExecutive(payload);
}

export async function fetchKPIs() {
  const res = await authFetch(`${API}/dashboard/kpis`);
  const payload = await parseResponse<DashboardKpisPayload>(res);
  return normalizeDashboardKpis(payload);
}

export async function exportCrmData(params: Record<string, string>) {
  const res = await authFetch(`${API}/dashboard/activities${buildQuery(params)}`);
  return parseResponse<unknown[]>(res);
}

export async function exportDashboardExcel(entity: 'leads' | 'properties' = 'leads') {
  const res = await authFetch(`${API}/dashboard/${entity}/excel`);
  if (!res.ok) {
    throw new Error(await extractApiError(res, 'Failed to export Excel report'));
  }
  return res.blob();
}


