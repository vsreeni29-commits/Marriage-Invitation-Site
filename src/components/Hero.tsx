import { weddingConfig } from '../config/weddingConfig';
import { FusionEmblem } from './ui/FusionEmblem';

const petals = Array.from({ length: 9 }, (_, index) => index);

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__paper" aria-hidden="true" />
      <div className="hero__halo" aria-hidden="true" />
      <FusionEmblem className="hero__emblem hero__emblem--left" />
      <FusionEmblem className="hero__emblem hero__emblem--right" />
      <div className="hero__petals" aria-hidden="true">
        {petals.map((petal) => (
          <i key={petal} style={{ '--petal': petal } as React.CSSProperties} />
        ))}
      </div>

      <div className="hero__content">
        <p className="eyebrow">Together with our families</p>
        <h1>
          <span>{weddingConfig.couple.bride}</span>
          <b>&</b>
          <span>{weddingConfig.couple.groom}</span>
        </h1>
        <p className="hero__line">{weddingConfig.copy.hero}</p>
        <div className="hero__date" aria-label="17 September 2026">
          17 <i>·</i> 09 <i>·</i> 2026
        </div>
        <a className="button button--primary" href="#invitation">
          Celebrate With Us
        </a>
      </div>

      <a className="scroll-cue" href="#invitation" aria-label="Scroll to invitation">
        <span>Discover our story</span>
        <i aria-hidden="true" />
      </a>
    </header>
  );
}
