import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { weddingConfig } from '../config/weddingConfig';

export type MusicPlayerHandle = {
  start: () => void;
  stop: () => void;
  toggle: () => void;
};

type MusicPlayerProps = {
  visible: boolean;
};

const MUSIC_PREFERENCE_KEY = 'rs-wedding-music-v1';

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  function MusicPlayer({ visible }, ref) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const fadeFrame = useRef(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [unavailable, setUnavailable] = useState(false);

    const fadeTo = (target: number, pauseWhenDone = false) => {
      const audio = audioRef.current;
      if (!audio) return;
      window.cancelAnimationFrame(fadeFrame.current);
      const startVolume = audio.volume;
      const startTime = performance.now();
      const duration = 650;

      const step = (time: number) => {
        const progress = Math.min(1, (time - startTime) / duration);
        audio.volume = startVolume + (target - startVolume) * progress;
        if (progress < 1) {
          fadeFrame.current = window.requestAnimationFrame(step);
        } else if (pauseWhenDone) {
          audio.pause();
        }
      };

      fadeFrame.current = window.requestAnimationFrame(step);
    };

    const start = () => {
      const audio = audioRef.current;
      if (!audio || unavailable) return;
      audio.volume = 0;
      void audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setUnavailable(false);
          window.sessionStorage.setItem(MUSIC_PREFERENCE_KEY, 'on');
          fadeTo(0.52);
        })
        .catch(() => {
          setUnavailable(true);
          setIsPlaying(false);
        });
    };

    const stop = () => {
      if (!audioRef.current) return;
      fadeTo(0, true);
      setIsPlaying(false);
      window.sessionStorage.setItem(MUSIC_PREFERENCE_KEY, 'off');
    };

    const toggle = () => {
      if (isPlaying) stop();
      else start();
    };

    useImperativeHandle(ref, () => ({ start, stop, toggle }));

    useEffect(
      () => () => {
        window.cancelAnimationFrame(fadeFrame.current);
      },
      [],
    );

    return (
      <>
        <audio
          ref={audioRef}
          src={import.meta.env.BASE_URL + weddingConfig.assets.music}
          loop
          preload="none"
          onError={() => {
            setUnavailable(true);
            setIsPlaying(false);
          }}
          aria-hidden="true"
        />
        <button
          className={'music-toggle' + (visible ? ' is-visible' : '')}
          type="button"
          onClick={toggle}
          aria-label={
            unavailable
              ? 'Background music unavailable'
              : isPlaying
                ? 'Turn background music off'
                : 'Turn background music on'
          }
          aria-pressed={isPlaying}
          disabled={unavailable}
        >
          <span className="music-toggle__icon" aria-hidden="true">
            {unavailable ? '–' : isPlaying ? '♫' : '♪'}
          </span>
          <span>{unavailable ? 'Music unavailable' : isPlaying ? 'Music On' : 'Music Off'}</span>
          {isPlaying ? (
            <span className="music-toggle__bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          ) : null}
        </button>
      </>
    );
  },
);
