"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface HeroProps {
  onQuickAdd: () => void;
}

export default function Hero({ onQuickAdd }: HeroProps) {
  const [transformStyle, setTransformStyle] = useState("");
  const [popped, setPopped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect for 3D can floating experience
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 20;
    const rotateY = (x / rect.width) * 20;

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  // Real-time audio synthesizer for "Pop the Tab" fizz sound effect!
  const playPopAndFizz = () => {
    setPopped(true);
    setTimeout(() => setPopped(false), 2500);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // 1. Pop Sound (Short low pop burst)
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = "sine";
      popOsc.frequency.setValueAtTime(400, ctx.currentTime);
      popOsc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      popGain.gain.setValueAtTime(0.4, ctx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start();
      popOsc.stop(ctx.currentTime + 0.08);

      // 2. White Noise Fizz (Simulated sparkling carbonation pour)
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Filter noise for crisp high frequency hiss
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(4000, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(ctx.currentTime + 0.05);
    } catch (e) {
      console.log("Audio not supported or blocked");
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-20 px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-primary)]/20 rounded-full filter blur-[120px] animate-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-secondary)]/15 rounded-full filter blur-[120px] animate-glow pointer-events-none" />

      {/* Floating Ambient Bubbles */}
      <div className="bubble-container">
        <div className="bubble w-4 h-4 left-[15%]" style={{ animationDelay: "0s" }} />
        <div className="bubble w-6 h-6 left-[35%]" style={{ animationDelay: "2s" }} />
        <div className="bubble w-3 h-3 left-[65%]" style={{ animationDelay: "4s" }} />
        <div className="bubble w-8 h-8 left-[80%]" style={{ animationDelay: "1s" }} />
        <div className="bubble w-5 h-5 left-[50%]" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Hero Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-ping" />
            <span>The Future of Effervescence</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-black text-5xl sm:text-6xl xl:text-7xl leading-[1.08] tracking-tight">
            ELECTRIC <br />
            <span className="text-gradient">BOTANICAL FIZZ</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
            Crafted with real organic fruit juice, adaptogenic botanicals, and zero artificial sweeteners. Pure crisp sparkling euphoria in every drop.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onQuickAdd}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-bold text-base hover:shadow-xl hover:shadow-[var(--accent-glow)] transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              Get The Starter 6-Pack →
            </button>

            <button
              onClick={playPopAndFizz}
              className="px-6 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md font-semibold text-sm text-white flex items-center gap-3 transition-all hover:border-white/30"
            >
              <span>{popped ? "💥 POPPED!" : "🔊 Pop The Tab"}</span>
              {popped && (
                <span className="text-xs text-[var(--accent-primary)] animate-bounce">
                  *Fizzing*
                </span>
              )}
            </button>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-4 pt-8 w-full max-w-lg border-t border-white/10">
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gradient">
                0g
              </span>
              <span className="text-xs text-slate-400 font-medium">Refined Sugar</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gradient">
                100%
              </span>
              <span className="text-xs text-slate-400 font-medium">Real Organic Juice</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gradient">
                15 Cal
              </span>
              <span className="text-xs text-slate-400 font-medium">Guilt-Free Spark</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Floating Can Visual */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Can Backdrop Glow Ring */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-[var(--accent-primary)]/30 bg-gradient-to-tr from-[var(--accent-primary)]/10 to-transparent blur-2xl animate-pulse pointer-events-none" />

          {/* Floating Soda Can Card */}
          <div
            className="relative w-full max-w-[340px] aspect-[3/4] transition-transform duration-200 ease-out preserve-3d cursor-pointer"
            style={{ transform: transformStyle }}
            onClick={playPopAndFizz}
          >
            <div className="absolute inset-0 glass-panel p-4 flex flex-col items-center justify-between overflow-hidden shadow-2xl">
              {/* Top Can Tag */}
              <div className="w-full flex justify-between items-center text-xs text-slate-400 font-mono tracking-widest uppercase">
                <span>FIZZORA № 01</span>
                <span className="text-[var(--accent-primary)]">COLD SERVED</span>
              </div>

              {/* Can Image Showcase */}
              <div
                style={{ position: "relative", width: "100%", height: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}
                className="animate-float"
              >
                <Image
                  src="/hero_can.png"
                  alt="FIZZORA Craft Soda Can"
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  style={{ objectFit: "contain" }}
                  priority
                  className="drop-shadow-[0_25px_35px_rgba(0,242,254,0.35)]"
                />
              </div>

              {/* Bottom Interactive Hint */}
              <div className="w-full py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-semibold text-slate-300 backdrop-blur-md flex items-center justify-center gap-2">
                <span>✨ Hover or Click to Interactive Tilt & Pop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
