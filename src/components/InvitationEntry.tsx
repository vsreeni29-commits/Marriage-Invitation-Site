import { FusionEmblem } from './ui/FusionEmblem';
import { Button } from './ui/Button';
import { weddingConfig } from '../config/weddingConfig';

type InvitationEntryProps = {
  onEnter: (withMusic: boolean) => void;
  leaving: boolean;
};

export function InvitationEntry({ onEnter, leaving }: InvitationEntryProps) {
  return (
    <div
      className={'invitation-entry' + (leaving ? ' invitation-entry--leaving' : '')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-title"
    >
      <div className="entry-pattern entry-pattern--kolam" aria-hidden="true">
        <svg viewBox="0 0 200 420">
          <path d="M180 22C75 22 75 126 180 126M180 126C75 126 75 230 180 230M180 230C75 230 75 334 180 334" />
          <circle cx="126" cy="74" r="28" />
          <circle cx="126" cy="178" r="28" />
          <circle cx="126" cy="282" r="28" />
        </svg>
      </div>
      <div className="entry-pattern entry-pattern--geometry" aria-hidden="true">
        <svg viewBox="0 0 200 420">
          <path d="M20 22 122 74 20 126 122 178 20 230 122 282 20 334" />
          <path d="m84 55 38 19-38 19-38-19Z" />
          <path d="m84 159 38 19-38 19-38-19Z" />
          <path d="m84 263 38 19-38 19-38-19Z" />
        </svg>
      </div>

      <div className="invitation-entry__content">
        <FusionEmblem animated className="invitation-entry__emblem" />
        <p className="entry-monogram">{weddingConfig.couple.monogram}</p>
        <h1 id="entry-title">
          {weddingConfig.couple.bride} <span>&</span> {weddingConfig.couple.groom}
        </h1>
        <p className="entry-line">{weddingConfig.copy.title}</p>
        <div className="invitation-entry__actions">
          <Button onClick={() => onEnter(true)}>Enter With Music ♪</Button>
          <Button variant="quiet" onClick={() => onEnter(false)}>
            Enter Quietly
          </Button>
        </div>
      </div>
    </div>
  );
}
