import { useRef, useState } from 'react';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { BlessingGarden } from './components/BlessingGarden';
import { Countdown } from './components/Countdown';
import { CulturalFusion } from './components/CulturalFusion';
import { DateScratchReveal } from './components/DateScratchReveal';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { InvitationEntry } from './components/InvitationEntry';
import {
  MusicPlayer,
  type MusicPlayerHandle,
} from './components/MusicPlayer';
import { Navigation } from './components/Navigation';
import { ReceptionDetails } from './components/ReceptionDetails';
import { RSVPForm } from './components/RSVPForm';
import { Venue } from './components/Venue';
import { WeddingStory } from './components/WeddingStory';

export function App() {
  const [entered, setEntered] = useState(false);
  const [leavingIntro, setLeavingIntro] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const enter = (withMusic: boolean) => {
    if (withMusic) musicRef.current?.start();
    else musicRef.current?.stop();

    setLeavingIntro(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => {
      setEntered(true);
      window.requestAnimationFrame(() => {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      });
    }, reduceMotion ? 0 : 620);
  };

  return (
    <AppErrorBoundary>
      {!entered ? <InvitationEntry onEnter={enter} leaving={leavingIntro} /> : null}
      {entered ? <Navigation /> : null}

      <MusicPlayer ref={musicRef} visible={entered} />

      {entered ? (
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <WeddingStory />
          <CulturalFusion />
          <DateScratchReveal />
          <Countdown />
          <ReceptionDetails />
          <section className="cultural-quote" aria-label="A note from Rinsha and Sreeni">
            <div className="cultural-quote__line" aria-hidden="true" />
            <p>
              “The roads that brought us here began in different places.
              <br />
              The road ahead is ours to walk together.”
            </p>
            <span>R + S</span>
          </section>
          <Venue />
          <BlessingGarden />
          <RSVPForm />
          <Footer />
        </main>
      ) : null}
    </AppErrorBoundary>
  );
}
