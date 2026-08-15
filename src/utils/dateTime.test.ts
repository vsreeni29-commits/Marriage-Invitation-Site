import { describe, expect, it } from 'vitest';
import { buildCalendarEvent } from './calendar';
import { getTimeRemaining, padCountdown } from './dateTime';

describe('getTimeRemaining', () => {
  it('calculates countdown parts without negative values', () => {
    const target = '2026-09-17T18:00:00+05:30';
    const now = new Date('2026-09-16T18:00:00+05:30').getTime();
    expect(getTimeRemaining(target, now)).toMatchObject({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    expect(
      getTimeRemaining(target, new Date('2026-09-18T00:00:00+05:30').getTime()).total,
    ).toBe(0);
  });

  it('pads display values', () => {
    expect(padCountdown(4)).toBe('04');
    expect(padCountdown(12)).toBe('12');
  });
});

describe('calendar event', () => {
  it('contains the authoritative event details and IST timezone', () => {
    const event = buildCalendarEvent();
    expect(event).toContain('DTSTART;TZID=Asia/Kolkata:20260917T180000');
    expect(event).toContain('DTEND;TZID=Asia/Kolkata:20260917T220000');
    expect(event).toContain('Sree Gupta Bhavan');
    expect(event).toContain('https://maps.app.goo.gl/qxPLmU2nv74WX3Rw8');
  });
});
