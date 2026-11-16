import type { WhatsAppState } from "./types";


const initialState: WhatsAppState = {
  session: null,
  messages: [],
  queue: {
    size: 0,
    maxSize: 100,
    processing: 0,
    messages: [],
  },
  health: {
    activeSessions: 0,
    authenticatedSessions: 0,
    uptime: 0,
    status: 'offline',
  },
  loading: {
    connecting: false,
    disconnecting: false,
    sending: false,
    fetchingHistory: false,
  },
  error: null,
  success: null,
  qrCode: null,
  showModal: false,
  modalType: null,
};

// ================================
// Helpers
// ================================

/** Safely extract error message from a non-OK fetch Response */
async function extractErrorMessage(response: Response): Promise<string> {
  let errorData: Record<string, unknown> = {};
  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      errorData = await response.json();
    }
  } catch {
    // Response body not parseable — use default message
  }
  return (
    (typeof errorData?.message === 'string' ? errorData.message : '') ||
    (typeof errorData?.error === 'string' ? errorData.error : '') ||
    `Request failed with status ${response.status}`
  );
}

// ================================

export { initialState };

