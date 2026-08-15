import { weddingConfig } from '../config/weddingConfig';
import { AddToCalendar } from './AddToCalendar';
import { FusionEmblem } from './ui/FusionEmblem';
import { Section } from './ui/Section';

export function ReceptionDetails() {
  return (
    <Section className="reception-details" labelledBy="reception-title">
      <div className="section-shell">
        <article className="reception-card">
          <div className="reception-card__border" aria-hidden="true" />
          <FusionEmblem className="reception-card__emblem" />
          <p className="eyebrow">Together with our families</p>
          <h2 id="reception-title">Reception</h2>
          <p className="reception-card__date">{weddingConfig.event.displayDate}</p>
          <p className="reception-card__time">{weddingConfig.event.displayTime}</p>
          <div className="reception-card__divider" aria-hidden="true">
            <i />
            <span>✦</span>
            <i />
          </div>
          <p className="reception-card__copy">
            Dinner, conversations, laughter and a new beginning—we’d love to celebrate
            it with you.
          </p>
          <AddToCalendar />
        </article>
      </div>
    </Section>
  );
}
