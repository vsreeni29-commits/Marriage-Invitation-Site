import type { Blessing, BlessingService, RSVPResponse, RSVPService } from './types';

const BLESSINGS_KEY = 'rs-wedding-blessings-v1';
const RSVPS_KEY = 'rs-wedding-rsvps-v1';

function safelyRead<T>(key: string): T[] {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : [];
  } catch {
    return [];
  }
}

function safelyWrite<T>(key: string, value: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing and storage quotas must not block the invitation.
  }
}

function createId(prefix: string) {
  if ('randomUUID' in crypto) return prefix + '-' + crypto.randomUUID();
  return prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2);
}

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

export const blessingService: BlessingService = {
  async list() {
    return safelyRead<Blessing>(BLESSINGS_KEY);
  },
  async submit(message) {
    await delay(420);
    const blessing: Blessing = {
      id: createId('blessing'),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    const current = safelyRead<Blessing>(BLESSINGS_KEY);
    safelyWrite(BLESSINGS_KEY, [...current, blessing].slice(-40));
    return blessing;
  },
};

export const rsvpService: RSVPService = {
  async submit(response) {
    await delay(520);
    const saved: RSVPResponse = {
      ...response,
      id: createId('rsvp'),
      createdAt: new Date().toISOString(),
    };
    const current = safelyRead<RSVPResponse>(RSVPS_KEY);
    safelyWrite(RSVPS_KEY, [...current, saved].slice(-10));
    return saved;
  },
};
