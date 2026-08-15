import { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const links = [
  { href: '#story', label: 'Our Story' },
  { href: '#date', label: 'The Date' },
  { href: '#venue', label: 'Venue' },
  { href: '#blessings', label: 'Blessings' },
  { href: '#rsvp', label: 'RSVP' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to invitation
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: 'scaleX(' + progress + ')' }} />
      </div>
      <nav className={'floating-nav' + (open ? ' is-open' : '')} aria-label="Invitation">
        <a className="floating-nav__mark" href="#top" aria-label="Rinsha and Sreeni — top">
          R<span>+</span>S
        </a>
        <button
          className="floating-nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="invitation-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
        <div className="floating-nav__links" id="invitation-menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
