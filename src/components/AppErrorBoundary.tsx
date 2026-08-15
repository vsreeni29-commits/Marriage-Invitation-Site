import { Component, type ErrorInfo, type ReactNode } from 'react';
import { weddingConfig } from '../config/weddingConfig';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error(error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="fallback-invitation">
        <p className="eyebrow">You’re invited</p>
        <h1>Rinsha & Sreeni</h1>
        <p>{weddingConfig.event.displayDate}</p>
        <p>{weddingConfig.event.displayTime}</p>
        <h2>{weddingConfig.venue.name}</h2>
        <address>{weddingConfig.venue.address}</address>
        <a
          className="button button--primary"
          href={weddingConfig.venue.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Get Directions
        </a>
      </main>
    );
  }
}
