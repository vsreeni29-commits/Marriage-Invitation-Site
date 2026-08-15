import { useCallback, useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

const REVEAL_THRESHOLD = 0.55;

export function DateScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const moveCountRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [canvasAvailable, setCanvasAvailable] = useState(true);

  const completeReveal = useCallback(() => {
    setRevealed(true);
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) canvas.style.opacity = '0';
  }, []);

  const paintCover = useCallback(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      setCanvasAvailable(false);
      completeReveal();
      return;
    }

    const width = card.clientWidth;
    const height = card.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.scale(ratio, ratio);

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#31594a');
    gradient.addColorStop(0.52, '#24483d');
    gradient.addColorStop(1, '#17382f');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'rgba(207, 178, 116, .34)';
    context.lineWidth = 1;
    for (let x = -height; x < width + height; x += 26) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x + height, height);
      context.stroke();
    }
    context.fillStyle = '#f5efe3';
    context.textAlign = 'center';
    context.font = '600 12px Inter, system-ui, sans-serif';
    context.letterSpacing = '2px';
    context.fillText('SCRATCH TO REVEAL OUR DAY', width / 2, height / 2 + 4);
  }, [completeReveal, revealed]);

  useEffect(() => {
    paintCover();
    if (!('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(paintCover);
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [paintCover]);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, Math.max(24, rect.width * 0.045), 0, Math.PI * 2);
    context.fill();

    moveCountRef.current += 1;
    if (moveCountRef.current % 8 !== 0) return;

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    let sampled = 0;
    for (let index = 3; index < pixels.length; index += 4 * 20) {
      sampled += 1;
      if (pixels[index] < 64) transparent += 1;
    }
    if (transparent / sampled >= REVEAL_THRESHOLD) completeReveal();
  };

  return (
    <Section id="date" className="date-reveal" tone="sand" labelledBy="date-title">
      <div className="section-shell section-shell--narrow">
        <SectionHeading
          eyebrow="Save our day"
          title="A Date Worth Remembering"
          id="date-title"
          body="A small reveal for the day our two journeys become one."
        />
        <div
          ref={cardRef}
          className={'scratch-card' + (revealed ? ' is-revealed' : '')}
        >
          <div className="scratch-card__date" aria-live="polite">
            <span>Thursday</span>
            <strong>17</strong>
            <h3>September 2026</h3>
            <p>{weddingConfig.event.displayTime}</p>
          </div>
          {!revealed && canvasAvailable ? (
            <canvas
              ref={canvasRef}
              className="scratch-card__canvas"
              aria-hidden="true"
              onPointerDown={(event) => {
                drawingRef.current = true;
                event.currentTarget.setPointerCapture(event.pointerId);
                scratch(event);
              }}
              onPointerMove={scratch}
              onPointerUp={() => {
                drawingRef.current = false;
              }}
              onPointerCancel={() => {
                drawingRef.current = false;
              }}
            />
          ) : null}
        </div>
        {!revealed ? (
          <div className="scratch-card__fallback">
            <p>Scratch with your finger or cursor</p>
            <Button variant="secondary" onClick={completeReveal}>
              Reveal Date
            </Button>
          </div>
        ) : (
          <p className="scratch-card__revealed-message" role="status">
            Now it’s a date ♡
          </p>
        )}
      </div>
    </Section>
  );
}
