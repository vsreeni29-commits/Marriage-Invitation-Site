type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  id?: string;
  align?: 'center' | 'left';
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  id,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <header className={'section-heading section-heading--' + align}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {body ? <p className="section-intro">{body}</p> : null}
    </header>
  );
}
