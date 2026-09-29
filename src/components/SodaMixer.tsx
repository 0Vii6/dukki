"use client";

import { useState } from "react";

const BOTANICAL_OPTIONS = [
  { id: "elderflower", name: "Elderflower Blossom", icon: "🌸", desc: "Floral light lift" },
  { id: "citrus-zest", name: "Citrus Zest", icon: "🍋", desc: "Crisp bright acidity" },
  { id: "wild-mint", name: "Crushed Wild Mint", icon: "🌿", desc: "Refreshing cool note" },
  { id: "ginger-root", name: "Spiced Ginger Root", icon: "🫚", desc: "Subtle warm kick" },
  { id: "pink-pepper", name: "Pink Peppercorn", icon: "🌶️", desc: "Exotic warm finish" },
];

interface CustomCan {
  name: string;
  carbonation: number;
  sweetness: number;
  botanicals: string[];
  calories: number;
}

interface SodaMixerProps {
  onAddCustomPack: (customCan: CustomCan) => void;
}

export default function SodaMixer({ onAddCustomPack }: SodaMixerProps) {
  const [canName, setCanName] = useState("MY ELECTRIC FIZZ");
  const [carbonation, setCarbonation] = useState(85);
  const [sweetness, setSweetness] = useState(20);
  const [selectedBotanicals, setSelectedBotanicals] = useState<string[]>(["citrus-zest", "elderflower"]);

  const toggleBotanical = (id: string) => {
    if (selectedBotanicals.includes(id)) {
      if (selectedBotanicals.length > 1) {
        setSelectedBotanicals(selectedBotanicals.filter((item) => item !== id));
      }
    } else {
      if (selectedBotanicals.length < 3) {
        setSelectedBotanicals([...selectedBotanicals, id]);
      }
    }
  };

  // Calculate live dynamic nutrition values
  const calories = Math.round(10 + (sweetness / 100) * 20);
  const sugar = (sweetness / 25).toFixed(1);

  const getCarbonationLabel = (val: number) => {
    if (val < 40) return "Gentle Sparkle";
    if (val < 75) return "Crisp Effervescence";
    return "⚡ Atomic High-Voltage Fizz";
  };

  const handleAdd = () => {
    onAddCustomPack({
      name: canName || "Custom Craft Soda",
      carbonation,
      sweetness,
      botanicals: selectedBotanicals.map(
        (id) => BOTANICAL_OPTIONS.find((b) => b.id === id)?.name || id
      ),
      calories,
    });
  };

  return (
    <section id="fizz-lab" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-3 block">
            Interactive Formulator
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-white mb-4">
            THE <span className="text-gradient">FIZZ LAB</span> CUSTOMIZER
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Formulate your own signature botanical craft soda. Adjust effervescence, sweetness, and infusion profiles in real time.
          </p>
        </div>

        {/* Customizer Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 glass-panel p-8 flex flex-col gap-8">
            {/* 1. Can Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Name Your Signature Can
              </label>
              <input
                type="text"
                value={canName}
                onChange={(e) => setCanName(e.target.value.toUpperCase())}
                maxLength={24}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-heading font-bold tracking-wide focus:outline-none focus:border-[var(--accent-primary)] transition-all"
                placeholder="E.G. CITRUS BURST 3000"
              />
            </div>

            {/* 2. Carbonation Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Carbonation Level
                </label>
                <span className="text-xs font-bold text-[var(--accent-primary)]">
                  {getCarbonationLabel(carbonation)} ({carbonation}%)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={carbonation}
                onChange={(e) => setCarbonation(Number(e.target.value))}
              />
            </div>

            {/* 3. Natural Sweetness Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. Organic Agave Sweetness
                </label>
                <span className="text-xs font-bold text-[var(--accent-primary)]">
                  {sweetness}% ({sugar}g Natural Sugar)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sweetness}
                onChange={(e) => setSweetness(Number(e.target.value))}
              />
            </div>

            {/* 4. Botanical Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  4. Choose Botanicals (Select up to 3)
                </label>
                <span className="text-xs text-slate-400">
                  {selectedBotanicals.length}/3 Selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BOTANICAL_OPTIONS.map((botanical) => {
                  const active = selectedBotanicals.includes(botanical.id);
                  return (
                    <button
                      key={botanical.id}
                      onClick={() => toggleBotanical(botanical.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        active
                          ? "bg-white/10 border-[var(--accent-primary)] text-white shadow-md shadow-[var(--accent-glow)]"
                          : "bg-white/5 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-2xl">{botanical.icon}</span>
                      <div>
                        <div className="text-xs font-bold">{botanical.name}</div>
                        <div className="text-[10px] text-slate-400">{botanical.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-5 glass-panel p-8 flex flex-col justify-between items-center text-center relative overflow-hidden border-2 border-[var(--accent-glow)]">
            <div className="w-full flex justify-between items-center text-xs font-mono text-slate-400 border-b border-white/10 pb-4">
              <span>FIZZ LAB BATCH #882</span>
              <span className="text-[var(--accent-primary)]">CUSTOM FORMULA</span>
            </div>

            {/* Visual Simulated Can Display */}
            <div className="my-8 relative w-48 h-72 rounded-3xl bg-gradient-to-b from-slate-900 to-black border-2 border-white/20 p-6 flex flex-col justify-between items-center shadow-2xl overflow-hidden group">
              <div className="absolute top-2 w-16 h-1 rounded-full bg-white/30" />
              
              {/* Animated Inner Effervescence */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, var(--accent-primary) 0%, transparent 80%)`,
                }}
              />

              <div className="text-[10px] font-mono tracking-widest text-[var(--accent-primary)] uppercase mt-2">
                FIZZORA LAB
              </div>

              <div className="my-auto">
                <div className="font-heading font-black text-xl text-white tracking-wider leading-tight">
                  {canName || "CUSTOM FIZZ"}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {selectedBotanicals
                    .map((id) => BOTANICAL_OPTIONS.find((b) => b.id === id)?.name)
                    .join(" • ")}
                </div>
              </div>

              <div className="w-full flex justify-between text-[9px] text-slate-400 font-mono border-t border-white/10 pt-2">
                <span>{carbonation}% FIZZ</span>
                <span>{calories} CAL</span>
              </div>
            </div>

            {/* Dynamic Formula Specs */}
            <div className="w-full bg-white/5 p-4 rounded-xl text-left text-xs font-mono text-slate-300 mb-6 flex flex-col gap-1.5 border border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-400">Effervescence:</span>
                <span className="text-white font-bold">{carbonation}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Calories / Can:</span>
                <span className="text-white font-bold">{calories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Natural Sugar:</span>
                <span className="text-white font-bold">{sugar}g</span>
              </div>
            </div>

            {/* Add Custom Pack CTA */}
            <button
              onClick={handleAdd}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-bold text-sm hover:shadow-xl hover:shadow-[var(--accent-glow)] transition-all transform hover:scale-[1.02] active:scale-95"
            >
              Order Custom 6-Pack ($24.00)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
