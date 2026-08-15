import { weddingConfig } from '../config/weddingConfig';
import { ShareInvitation } from './ShareInvitation';
import { FusionEmblem } from './ui/FusionEmblem';

export function Footer() {
  return (
    <footer className="closing">
      <div className="closing__foliage closing__foliage--left" aria-hidden="true" />
      <div className="closing__foliage closing__foliage--right" aria-hidden="true" />
      <div className="section-shell section-shell--narrow">
        <FusionEmblem className="closing__emblem" />
        <p className="closing__message">
          From Kerala to Tamil Nadu, from two traditions to one journey—thank you for
          being part of ours.
        </p>
        <h2>
          {weddingConfig.couple.bride} <span>&</span> {weddingConfig.couple.groom}
        </h2>
        <p className="closing__date">17 · 09 · 2026</p>
        <p className="closing__love">
          <span lang="ta">அன்புடன்</span> · <span lang="ml">സ്നേഹത്തോടെ</span> · With Love
        </p>
        <p className="closing__chennai">See you in Chennai ♡</p>
        <ShareInvitation />
      </div>
      <div className="closing__footerline">
        <span>Two roots, one story.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
