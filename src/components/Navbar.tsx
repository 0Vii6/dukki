"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeTheme: string;
}

export default function Navbar({ cartCount, onOpenCart, activeTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    setSoundOn(!soundOn);
    // Web audio beep/toggle feedback
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(soundOn ? 300 : 800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Audio not supported or blocked
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        scrolled
          ? "bg-[#060812]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-[var(--accent-glow)] transition-transform duration-300 group-hover:scale-110">
            ⚡
          </div>
          <span className="font-heading font-black text-2xl tracking-wider text-white">
            FIZZ<span className="text-gradient">ORA</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#flavors"
            className="hover:text-white transition-colors py-1 relative group"
          >
            Flavors
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#fizz-lab"
            className="hover:text-white transition-colors py-1 relative group"
          >
            Fizz Lab (Customizer)
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#botanicals"
            className="hover:text-white transition-colors py-1 relative group"
          >
            Botanicals
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#sensory"
            className="hover:text-white transition-colors py-1 relative group"
          >
            Sensory Sound
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? "Sound FX Enabled" : "Sound FX Muted"}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
          >
            {soundOn ? "🔊" : "🔇"}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold text-sm hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-[var(--accent-glow)] flex items-center gap-2"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Order Now</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
