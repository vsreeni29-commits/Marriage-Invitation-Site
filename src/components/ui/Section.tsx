import type { ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

type SectionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: 'ivory' | 'sand' | 'green' | 'maroon';
  labelledBy?: string;
};

export function Section({
  as: Tag = 'section',
  children,
  className = '',
  id,
  tone = 'ivory',
  labelledBy,
}: SectionProps) {
  const { ref, isInView } = useInView<HTMLElement>();
  const classes = [
    'section',
    'section--' + tone,
    'reveal-section',
    isInView ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} id={id} aria-labelledby={labelledBy}>
      {children}
    </Tag>
  );
}
