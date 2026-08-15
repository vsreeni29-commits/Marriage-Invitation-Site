import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

export function WeddingStory() {
  return (
    <>
      <Section id="invitation" className="invitation-message" labelledBy="invitation-title">
        <div className="section-shell section-shell--narrow">
          <p className="invitation-message__kicker">With grateful hearts</p>
          <h2 id="invitation-title">
            We invite you to celebrate the beginning of our journey together.
          </h2>
          <p>
            With the blessings of the people who shaped our lives, we gather for an
            evening of family, gratitude, laughter and a beautiful new beginning.
          </p>
          <div className="gold-thread" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <p className="invitation-message__closing">
            One journey began in Kerala. Another in Tamil Nadu.
            <br />
            On September 17, they become one.
          </p>
        </div>
      </Section>

      <Section id="story" className="roots" tone="sand" labelledBy="story-title">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Kerala × Tamil Nadu"
            title="Two Roots. One Story."
            id="story-title"
            body="Different landscapes, familiar values—and a golden thread that found its way home."
          />
          <div className="roots__story">
            <article className="root-card root-card--kerala">
              <div className="root-card__ornament" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <p className="root-card__script" lang="ml">
                സ്നേഹത്തോടെ
              </p>
              <h3>Rinsha</h3>
              <p className="root-card__place">Kerala</p>
              <p>
                Coconut-green landscapes, ivory kasavu lines and the quiet elegance of
                Kerala’s floral geometry.
              </p>
              <span className="root-card__note">Grace · warmth · family</span>
            </article>

            <div className="roots__connection" aria-hidden="true">
              <span />
              <b>♡</b>
              <span />
            </div>

            <article className="root-card root-card--tamil">
              <div className="root-card__kolam" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <p className="root-card__script" lang="ta">
                அன்புடன்
              </p>
              <h3>Sreeni</h3>
              <p className="root-card__place">Tamil Nadu</p>
              <p>
                Malligai, sandalwood warmth and fine kolam lines inspired by a Tamil
                home and its celebrations.
              </p>
              <span className="root-card__note">Light · hope · togetherness</span>
            </article>
          </div>
          <p className="roots__union">
            Rinsha <span>♡</span> Sreeni
          </p>
        </div>
      </Section>
    </>
  );
}
