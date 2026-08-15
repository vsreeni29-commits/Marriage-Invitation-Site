type FusionEmblemProps = {
  className?: string;
  label?: string;
  animated?: boolean;
};

export function FusionEmblem({
  className = '',
  label,
  animated = false,
}: FusionEmblemProps) {
  return (
    <svg
      className={['fusion-emblem', animated ? 'fusion-emblem--animated' : '', className]
        .filter(Boolean)
        .join(' ')}
      viewBox="0 0 240 240"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g className="emblem-kolam" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M120 24c-18 0-30 12-30 30s12 30 30 30 30-12 30-30-12-30-30-30Z" />
        <path d="M84 60c-18 0-30 12-30 30s12 30 30 30 30-12 30-30-12-30-30-30Z" />
        <path d="M156 60c-18 0-30 12-30 30s12 30 30 30 30-12 30-30-12-30-30-30Z" />
        <path d="M84 120c-18 0-30 12-30 30s12 30 30 30 30-12 30-30-12-30-30-30Z" />
        <path d="M156 120c-18 0-30 12-30 30s12 30 30 30 30-12 30-30-12-30-30-30Z" />
        <path d="M120 156c-18 0-30 12-30 30s12 30 30 30 30-12 30-30-12-30-30-30Z" />
      </g>
      <g className="emblem-arch" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M120 50 176 82v76l-56 32-56-32V82Z" />
        <path d="m120 72 37 21v54l-37 21-37-21V93Z" />
        <path d="M120 88c13 13 23 25 23 38a23 23 0 0 1-46 0c0-13 10-25 23-38Z" />
      </g>
      <g className="emblem-floral" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M120 118c-9-14-21-15-25-7-4 9 8 17 25 18 17-1 29-9 25-18-4-8-16-7-25 7Z" />
        <path d="M120 129c-13 9-15 21-7 25 9 4 17-8 18-25-1-17-9-29-18-25-8 4-7 16 7 25Z" />
        <circle cx="120" cy="129" r="4.5" fill="currentColor" stroke="none" />
      </g>
      <circle className="emblem-dot" cx="120" cy="24" r="2.5" fill="currentColor" />
      <circle className="emblem-dot" cx="54" cy="90" r="2.5" fill="currentColor" />
      <circle className="emblem-dot" cx="186" cy="90" r="2.5" fill="currentColor" />
      <circle className="emblem-dot" cx="54" cy="150" r="2.5" fill="currentColor" />
      <circle className="emblem-dot" cx="186" cy="150" r="2.5" fill="currentColor" />
      <circle className="emblem-dot" cx="120" cy="216" r="2.5" fill="currentColor" />
    </svg>
  );
}
