import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { getTimeRemaining, padCountdown } from '../utils/dateTime';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

const units = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
] as const;

export function Countdown() {
  const [remaining, setRemaining] = useState(() =>
    getTimeRemaining(weddingConfig.event.startsAtIso),
  );
  const now = Date.now();
  const eventEnd = new Date(weddingConfig.event.endsAtIso).getTime();
  const eventStart = new Date(weddingConfig.event.startsAtIso).getTime();

  useEffect(() => {
    const update = () =>
      setRemaining(getTimeRemaining(weddingConfig.event.startsAtIso));
    update();
    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const state =
    now >= eventEnd ? 'after' : now >= eventStart ? 'live' : 'counting';

  return (
    <Section className="countdown" tone="maroon" labelledBy="countdown-title">
      <div className="section-shell">
        {state === 'counting' ? (
          <>
            <SectionHeading
              eyebrow="Counting every moment"
              title="Until We Celebrate Together"
              id="countdown-title"
            />
            <div className="countdown__grid" role="timer" aria-live="off">
              {units.map(([key, label]) => (
                <div className="countdown__unit" key={key}>
                  <strong>{padCountdown(remaining[key])}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              {remaining.days} days, {remaining.hours} hours, {remaining.minutes}{' '}
              minutes remaining
            </p>
          </>
        ) : (
          <div className="countdown__complete">
            <p className="eyebrow">17 · 09 · 2026</p>
            <h2 id="countdown-title">
              {state === 'live'
                ? 'The Celebration Has Begun ♡'
                : 'Our New Chapter Has Begun.'}
            </h2>
          </div>
        )}
      </div>
    </Section>
  );
}
