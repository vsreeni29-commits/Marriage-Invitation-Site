"""Create an original, lightweight ambient wedding loop.

This is deterministic synthesis—no sampled or copyrighted recording is used.
Run from the repository root. It writes the MP3 through ffmpeg.
"""

from __future__ import annotations

import math
import os
import random
import struct
import subprocess
import tempfile
import wave
from pathlib import Path


SAMPLE_RATE = 32_000
DURATION = 24.0
TAU = math.tau
random.seed(17092026)


def envelope(t: float, start: float, length: float, attack: float = 0.08) -> float:
    local = t - start
    if local < 0 or local > length:
        return 0.0
    rise = min(1.0, local / attack)
    decay = math.exp(-3.5 * local / length)
    tail = min(1.0, (length - local) / 0.22)
    return rise * decay * tail


def note_frequency(midi: int) -> float:
    return 440.0 * 2 ** ((midi - 69) / 12)


def synth_sample(t: float) -> tuple[float, float]:
    progression = [
        (50, 57, 62),
        (47, 54, 59),
        (43, 50, 55),
        (45, 52, 57),
    ]
    chord = progression[int(t // 12) % len(progression)]

    drone = 0.0
    for index, midi in enumerate(chord):
        frequency = note_frequency(midi)
        phase = TAU * frequency * t
        drone += (math.sin(phase) + 0.22 * math.sin(phase * 2.002)) * (0.038 - index * 0.006)
    drone *= 0.65 + 0.35 * math.sin(math.pi * (t % 12) / 12) ** 2

    pluck = 0.0
    arpeggio = [62, 69, 66, 69, 59, 66, 62, 66, 55, 62, 59, 62, 57, 64, 61, 64]
    step = 1.5
    current = int(t // step)
    for offset in range(max(0, current - 2), current + 1):
        start = offset * step
        amp = envelope(t, start, 2.8, 0.018)
        if amp:
            frequency = note_frequency(arpeggio[offset % len(arpeggio)])
            local = t - start
            bend = 1.0 + 0.004 * math.exp(-8 * local)
            phase = TAU * frequency * local * bend
            pluck += amp * (
                0.11 * math.sin(phase)
                + 0.045 * math.sin(phase * 2.01)
                + 0.018 * math.sin(phase * 3.98)
            )

    flute = 0.0
    melody = [74, 76, 78, 81, 78, 76, 74, 69, 71, 74, 76, 74]
    melody_step = 4.0
    melody_index = int(t // melody_step)
    start = melody_index * melody_step + 0.35
    amp = envelope(t, start, 3.1, 0.34)
    if amp:
        frequency = note_frequency(melody[melody_index % len(melody)])
        local = t - start
        vibrato = 1.0 + 0.003 * math.sin(TAU * 5.2 * local)
        phase = TAU * frequency * local * vibrato
        breath = random.uniform(-1.0, 1.0) * 0.002
        flute = amp * (0.055 * math.sin(phase) + 0.014 * math.sin(phase * 2) + breath)

    pulse = 0.0
    beat = int(t / 3.0)
    pulse_amp = envelope(t, beat * 3.0, 0.42, 0.01)
    if pulse_amp:
        pulse = 0.018 * pulse_amp * math.sin(TAU * 92 * (t - beat * 3.0))

    fade = min(1.0, t / 2.5, (DURATION - t) / 2.5)
    base = (drone + pluck + flute + pulse) * max(0.0, fade)
    shimmer = 0.008 * math.sin(TAU * 0.07 * t)
    return base * (1.0 + shimmer), base * (1.0 - shimmer)


def main() -> None:
    output = Path("public/audio/rinsha-sreeni-ambient.mp3")
    output.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temporary:
        wav_path = temporary.name

    try:
        with wave.open(wav_path, "wb") as audio:
            audio.setnchannels(2)
            audio.setsampwidth(2)
            audio.setframerate(SAMPLE_RATE)
            for sample_index in range(int(SAMPLE_RATE * DURATION)):
                left, right = synth_sample(sample_index / SAMPLE_RATE)
                left_int = max(-32767, min(32767, int(left * 32767)))
                right_int = max(-32767, min(32767, int(right * 32767)))
                audio.writeframesraw(struct.pack("<hh", left_int, right_int))

        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-loglevel",
                "error",
                "-i",
                wav_path,
                "-codec:a",
                "libmp3lame",
                "-b:a",
                "48k",
                str(output),
            ],
            check=True,
        )
        print("Created " + str(output) + " (" + str(round(output.stat().st_size / 1024)) + " KiB)")
    finally:
        if os.path.exists(wav_path):
            os.remove(wav_path)


if __name__ == "__main__":
    main()
