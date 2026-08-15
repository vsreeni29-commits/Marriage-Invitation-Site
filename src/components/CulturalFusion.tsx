import { FusionEmblem } from './ui/FusionEmblem';
import { Section } from './ui/Section';

export function CulturalFusion() {
  return (
    <Section className="cultural-fusion" tone="green" labelledBy="fusion-title">
      <div className="section-shell cultural-fusion__layout">
        <div className="cultural-fusion__visual">
          <span className="fusion-label fusion-label--one">Kolam line</span>
          <FusionEmblem
            animated
            label="A custom emblem weaving kolam, geometric arch and jasmine forms"
          />
          <span className="fusion-label fusion-label--two">Geometric arch</span>
          <span className="fusion-label fusion-label--three">Jasmine bloom</span>
        </div>
        <div className="cultural-fusion__copy">
          <p className="eyebrow">A shared visual language</p>
          <h2 id="fusion-title">Woven, not divided.</h2>
          <p>
            A kolam line meets an arch. A jasmine bloom grows through geometry. Kasavu
            gold warms a Kanchipuram-inspired border. Each detail keeps its roots while
            becoming part of something new.
          </p>
          <p className="cultural-fusion__statement">
            Hindu heritage. Muslim heritage.
            <br />
            One invitation that belongs to us.
          </p>
        </div>
      </div>
    </Section>
  );
}
