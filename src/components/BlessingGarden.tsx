import { useEffect, useState } from 'react';
import { blessingService } from '../services/localWeddingServices';
import type { Blessing } from '../services/types';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

function positionFromId(id: string, index: number) {
  let hash = 0;
  for (const character of id) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  const left = 10 + Math.abs(hash % 78);
  const bottom = 8 + Math.abs((hash >> 3) % 54);
  const delay = (index % 6) * 0.35;
  const size = 0.72 + Math.abs((hash >> 6) % 30) / 100;
  return { left: left + '%', bottom: bottom + '%', '--delay': delay + 's', '--size': size };
}

export function BlessingGarden() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    blessingService
      .list()
      .then((saved) => {
        if (active) setBlessings(saved);
      })
      .catch(() => {
        if (active) setStatus('The garden is ready for your first blessing.');
      });
    return () => {
      active = false;
    };
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanMessage = message.trim();
    if (cleanMessage.length < 3) {
      setStatus('Please write at least a few words for us.');
      return;
    }

    setSubmitting(true);
    setStatus('');
    try {
      const blessing = await blessingService.submit(cleanMessage);
      setBlessings((current) => [...current, blessing].slice(-40));
      setMessage('');
      setStatus('Your blessing is now blooming in the garden ♡');
    } catch {
      setStatus('Your blessing couldn’t be saved just now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const visibleBlessings = blessings.slice(-16);

  return (
    <Section id="blessings" className="blessing-garden" tone="green" labelledBy="blessing-title">
      <div className="section-shell">
        <SectionHeading
          eyebrow="A garden made by our people"
          title="Leave Us a Little Love"
          id="blessing-title"
          body="A wish, a memory, a piece of advice—leave something for us to carry into this new chapter."
        />
        <div className="blessing-garden__layout">
          <div
            className="garden-scene"
            role="img"
            aria-label={
              visibleBlessings.length
                ? visibleBlessings.length + ' glowing jasmine blessings in the garden'
                : 'An empty jasmine garden waiting for a blessing'
            }
          >
            <div className="garden-scene__moon" aria-hidden="true" />
            <div className="garden-scene__arch" aria-hidden="true" />
            <div className="garden-scene__ground" aria-hidden="true" />
            {visibleBlessings.map((blessing, index) => (
              <button
                className="jasmine-bloom"
                key={blessing.id}
                type="button"
                style={positionFromId(blessing.id, index) as React.CSSProperties}
                title={blessing.message}
                aria-label={'Blessing: ' + blessing.message}
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <b />
              </button>
            ))}
            {!visibleBlessings.length ? (
              <p className="garden-scene__empty">Your first wish will become our first bloom.</p>
            ) : null}
          </div>
          <form className="blessing-form" onSubmit={submit} noValidate>
            <label htmlFor="blessing-message">Write your message</label>
            <textarea
              id="blessing-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="A wish, a memory, a piece of advice…"
              maxLength={220}
              rows={5}
              required
              aria-describedby="blessing-count blessing-status"
            />
            <div className="field-meta">
              <span id="blessing-count">{message.length}/220</span>
              <span>Saved on this device</span>
            </div>
            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? 'Planting your wish…' : 'Send Your Blessing'}
            </Button>
            <p className="form-status" id="blessing-status" aria-live="polite">
              {status}
            </p>
          </form>
        </div>
      </div>
    </Section>
  );
}
