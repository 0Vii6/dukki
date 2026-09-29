"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-white/10 pt-20 pb-12 px-6 relative z-10 bg-[#04050c]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center font-bold text-black text-xl">
              ⚡
            </div>
            <span className="font-heading font-black text-2xl tracking-wider text-white">
              FIZZ<span className="text-gradient">ORA</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            The next generation of craft effervescence. Powered by pure organic fruits, adaptogens, and crisp spring water.
          </p>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3 grid grid-cols-2 gap-4 text-xs text-slate-400">
          <div className="flex flex-col gap-2.5">
            <span className="font-bold uppercase text-white mb-1">Products</span>
            <a href="#flavors" className="hover:text-white transition-colors">Yuzu Electric</a>
            <a href="#flavors" className="hover:text-white transition-colors">Crimson Raspberry</a>
            <a href="#flavors" className="hover:text-white transition-colors">Midnight Blackberry</a>
            <a href="#fizz-lab" className="hover:text-white transition-colors">Fizz Lab Customizer</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-bold uppercase text-white mb-1">Company</span>
            <a href="#botanicals" className="hover:text-white transition-colors">Botanicals</a>
            <a href="#sensory" className="hover:text-white transition-colors">Sensory Lab</a>
            <a href="#" className="hover:text-white transition-colors">Sustainability</a>
            <a href="#" className="hover:text-white transition-colors">Press & Contact</a>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-4 flex flex-col items-start gap-3">
          <span className="font-heading font-bold text-white text-base">
            JOIN THE FIZZ CLUB
          </span>
          <p className="text-slate-400 text-xs">
            Subscribe for exclusive drop announcements and secret flavor testing access.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold w-full border border-emerald-500/30">
              ✓ Welcome to the Fizz Club! Check your inbox soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[var(--accent-primary)] transition-all"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>© {new Date().getFullYear()} FIZZORA BEVERAGE CO. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Ingredient Transparency</a>
        </div>
      </div>
    </footer>
  );
}
