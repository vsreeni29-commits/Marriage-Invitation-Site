import { weddingConfig } from '../config/weddingConfig';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

export function Venue() {
  return (
    <Section id="venue" className="venue" tone="sand" labelledBy="venue-title">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Gowriwakkam · Chennai"
          title="Where We Celebrate"
          id="venue-title"
          body="Come for the evening, stay for the memories."
        />
        <div className="venue__layout">
          <div className="venue-map" aria-hidden="true">
            <svg viewBox="0 0 640 420">
              <path className="map-road map-road--one" d="M-20 320C130 300 116 190 264 205s182-52 244-168" />
              <path className="map-road map-road--two" d="M92-20c16 88 130 93 116 194S248 344 362 448" />
              <path className="map-road map-road--three" d="M-20 92c112 24 168-48 256-11s159 131 424 95" />
              <path className="map-route" d="M72 335c87-41 87-135 191-130 81 4 128-31 188-114" />
              <circle className="map-route__start" cx="72" cy="335" r="6" />
              <g className="map-pin" transform="translate(430 55)">
                <path d="M31 3C14 3 3 16 3 32c0 23 28 55 28 55s28-32 28-55C59 16 48 3 31 3Z" />
                <circle cx="31" cy="31" r="10" />
              </g>
              <g className="map-palm" transform="translate(105 96)">
                <path d="M18 80c2-34 4-52 8-67" />
                <path d="M26 14C15 13 6 6 4 0M26 14C17 7 17 0 19-8M26 14c9-9 18-11 27-8M26 14c10 2 18 8 24 17" />
              </g>
              <g className="map-kolam" transform="translate(500 290)">
                <circle cx="35" cy="35" r="22" />
                <circle cx="13" cy="35" r="22" />
                <circle cx="57" cy="35" r="22" />
                <circle cx="35" cy="13" r="22" />
                <circle cx="35" cy="57" r="22" />
              </g>
            </svg>
            <div className="venue-map__label">
              <span>Velachery Main Road</span>
              <strong>SgB</strong>
            </div>
          </div>
          <div className="venue__details">
            <p className="eyebrow">Reception venue</p>
            <h3>{weddingConfig.venue.name}</h3>
            <address>{weddingConfig.venue.address}</address>
            <p className="venue__note">
              Tap below and your preferred maps app will take it from here.
            </p>
            <a
              className="button button--primary venue__direction"
              href={weddingConfig.venue.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
