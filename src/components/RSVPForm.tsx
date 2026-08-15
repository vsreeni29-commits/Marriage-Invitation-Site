import { useState } from 'react';
import { rsvpService } from '../services/localWeddingServices';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

type AttendanceChoice = 'yes' | 'no' | null;

export function RSVPForm() {
  const [choice, setChoice] = useState<AttendanceChoice>(null);
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectChoice = (value: Exclude<AttendanceChoice, null>) => {
    setChoice(value);
    setSubmitted(false);
    setStatus('');
    if (value === 'no') setGuestCount(0);
    else if (guestCount === 0) setGuestCount(1);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!choice) {
      setStatus('Please tell us if you can join.');
      return;
    }
    if (name.trim().length < 2) {
      setStatus('Please enter your name.');
      return;
    }

    setSubmitting(true);
    setStatus('');
    try {
      await rsvpService.submit({
        attending: choice === 'yes',
        name: name.trim(),
        guestCount: choice === 'yes' ? guestCount : 0,
        note: note.trim() || undefined,
      });
      setSubmitted(true);
    } catch {
      setStatus('Your RSVP couldn’t be saved. Please try once more.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="rsvp" className="rsvp" labelledBy="rsvp-title">
      <div className="section-shell section-shell--narrow">
        <SectionHeading
          eyebrow="Your presence means a lot"
          title="Will You Celebrate With Us?"
          id="rsvp-title"
          body="A quick reply helps our families plan the evening with care."
        />

        {submitted ? (
          <div className="rsvp-success" role="status">
            <span aria-hidden="true">♡</span>
            <h3>{choice === 'yes' ? 'You’re on the list ♡' : 'We’ll miss you.'}</h3>
            <p>
              {choice === 'yes'
                ? 'We can’t wait to celebrate with you.'
                : 'We’re still glad you’re part of our story.'}
            </p>
            <Button variant="quiet" onClick={() => setSubmitted(false)}>
              Update RSVP
            </Button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={submit} noValidate>
            <fieldset className="rsvp-choice">
              <legend className="sr-only">Can you attend?</legend>
              <button
                className={choice === 'yes' ? 'is-selected' : ''}
                type="button"
                aria-pressed={choice === 'yes'}
                onClick={() => selectChoice('yes')}
              >
                <span aria-hidden="true">♡</span>
                Yes, wouldn’t miss it
              </button>
              <button
                className={choice === 'no' ? 'is-selected' : ''}
                type="button"
                aria-pressed={choice === 'no'}
                onClick={() => selectChoice('no')}
              >
                Sorry, I can’t make it
              </button>
            </fieldset>

            {choice ? (
              <div className="rsvp-form__fields">
                <div className="field">
                  <label htmlFor="guest-name">Guest Name</label>
                  <input
                    id="guest-name"
                    name="guestName"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                {choice === 'yes' ? (
                  <div className="field">
                    <span className="field-label" id="guest-count-label">
                      Number of People Attending
                    </span>
                    <div className="guest-counter" role="group" aria-labelledby="guest-count-label">
                      <button
                        type="button"
                        aria-label="Decrease guest count"
                        onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                        disabled={guestCount <= 1}
                      >
                        −
                      </button>
                      <output aria-live="polite">{guestCount}</output>
                      <button
                        type="button"
                        aria-label="Increase guest count"
                        onClick={() => setGuestCount((count) => Math.min(10, count + 1))}
                        disabled={guestCount >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : null}

                <div className="field">
                  <label htmlFor="rsvp-note">
                    Leave a note for us <span>(optional)</span>
                  </label>
                  <textarea
                    id="rsvp-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={4}
                    maxLength={300}
                  />
                </div>

                <Button type="submit" fullWidth disabled={submitting}>
                  {submitting ? 'Sending RSVP…' : 'Send RSVP'}
                </Button>
              </div>
            ) : null}

            <p className="form-status form-status--error" aria-live="polite">
              {status}
            </p>
          </form>
        )}
      </div>
    </Section>
  );
}
