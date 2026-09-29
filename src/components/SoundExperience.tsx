"use client";

import { useState, useRef, useEffect } from "react";

export default function SoundExperience() {
  const [isPouring, setIsPouring] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([20, 40, 60, 30, 80, 50, 90, 40, 70, 30, 80, 40]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const startPourAudio = () => {
    setIsPouring(true);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3500, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      noiseSourceRef.current = noise;
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const stopPourAudio = () => {
    setIsPouring(false);
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPouring) {
      interval = setInterval(() => {
        setWaveHeights(
          Array.from({ length: 16 }, () => Math.floor(Math.random() * 85) + 15)
        );
      }, 80);
    } else {
      setWaveHeights(Array.from({ length: 16 }, () => 15));
    }
    return () => clearInterval(interval);
  }, [isPouring]);

  return (
    <section id="sensory" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto glass-panel p-10 sm:p-16 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--accent-primary)]/10 blur-3xl" />

        <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-3 block">
          ASMR Sensory Experience
        </span>
        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
          THE <span className="text-gradient">SOUND OF FIZZ</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Press and hold the button below to trigger our real-time carbonation synthesizer and listen to the effervescent pour of cold sparkling soda.
        </p>

        {/* Audio Visualizer Waves */}
        <div className="flex justify-center items-end gap-2 h-24 mb-10">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className="w-2.5 rounded-full bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-100"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Press & Hold Trigger Button */}
        <button
          onMouseDown={startPourAudio}
          onMouseUp={stopPourAudio}
          onMouseLeave={stopPourAudio}
          onTouchStart={startPourAudio}
          onTouchEnd={stopPourAudio}
          className={`px-10 py-6 rounded-full font-heading font-black text-lg sm:text-xl tracking-wider uppercase transition-all duration-300 select-none shadow-2xl ${
            isPouring
              ? "bg-white text-black scale-95 shadow-[0_0_50px_var(--accent-primary)]"
              : "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black hover:scale-105"
          }`}
        >
          {isPouring ? "🥤 POURING... RELEASE TO STOP" : "🔴 PRESS & HOLD TO POUR SODA"}
        </button>
      </div>
    </section>
  );
}
