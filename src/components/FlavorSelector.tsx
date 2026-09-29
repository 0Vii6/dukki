"use client";

import { useState } from "react";
import Image from "next/image";

export interface Flavor {
  id: string;
  theme: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  badge: string;
  topNote: string;
  bodyNote: string;
  finishNote: string;
  carbonation: number; // 1-100
  sweetness: number;   // 1-100
  calories: string;
  sugar: string;
}

export const FLAVORS: Flavor[] = [
  {
    id: "yuzu-electric",
    theme: "yuzu",
    name: "Yuzu Electric",
    subtitle: "Citrus Gold & Elderflower Sparkle",
    tagline: "High-voltage citrus balance with clean botanical lift.",
    description: "Sun-ripened Japanese Yuzu citrus blended with organic elderflower blossoms and sparkling spring water. Sharp, zesty, and infinitely refreshing.",
    image: "/flavor_yuzu.png",
    color: "#ffd200",
    badge: "⚡ #1 BESTSELLER",
    topNote: "Wild Japanese Yuzu & Lime Zest",
    bodyNote: "Organic Elderflower Infusion",
    finishNote: "Crisp Mineral Effervescence",
    carbonation: 88,
    sweetness: 25,
    calories: "15 Cal",
    sugar: "3g Natural",
  },
  {
    id: "raspberry-rush",
    theme: "raspberry",
    name: "Crimson Raspberry",
    subtitle: "Wild Ruby Berries & Pink Pepper",
    tagline: "Bold berry tartness ignited by subtle warm botanical pepper.",
    description: "Cold-pressed Pacific Northwest raspberries paired with crushed pink peppercorn and organic hibiscus. Rich, tangy, and unapologetically vibrant.",
    image: "/flavor_raspberry.png",
    color: "#ff0055",
    badge: "🍓 FAN FAVORITE",
    topNote: "Tart Northwest Raspberries",
    bodyNote: "Crushed Pink Peppercorn",
    finishNote: "Warm Hibiscus Glow",
    carbonation: 75,
    sweetness: 35,
    calories: "18 Cal",
    sugar: "4g Natural",
  },
  {
    id: "blackberry-fizz",
    theme: "blackberry",
    name: "Midnight Blackberry",
    subtitle: "Velvet Indigo & Dark Mint",
    tagline: "Deep dark berries harmonized with crushed mountain mint.",
    description: "Juicy organic blackberries steeped with crushed peppermint leaves and dark lemon peel. Smooth, mysterious, and complex.",
    image: "/flavor_blackberry.png",
    color: "#a855f7",
    badge: "🫐 LIMITED EDITION",
    topNote: "Deep Sun-Drenched Blackberry",
    bodyNote: "Cool Mountain Mint",
    finishNote: "Zesty Lemon Twist",
    carbonation: 82,
    sweetness: 20,
    calories: "12 Cal",
    sugar: "2g Natural",
  },
];

interface FlavorSelectorProps {
  onAddFlavor: (flavor: Flavor) => void;
  onThemeChange: (theme: string) => void;
}

export default function FlavorSelector({ onAddFlavor, onThemeChange }: FlavorSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>("yuzu-electric");

  const activeFlavor = FLAVORS.find((f) => f.id === selectedId) || FLAVORS[0];

  const handleSelect = (flavor: Flavor) => {
    setSelectedId(flavor.id);
    onThemeChange(flavor.theme);
    document.documentElement.setAttribute("data-theme", flavor.theme);
  };

  return (
    <section id="flavors" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-3 block">
            Crafted for Discriminating Palates
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-white mb-4">
            EXPLORE THE <span className="text-gradient">FLAVOR MATRIX</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Each flavor is meticulously formulated with organic cold-pressed fruits and adaptogenic herbs. Click any can to shift the environment.
          </p>
        </div>

        {/* Flavor Selector Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          {FLAVORS.map((flavor) => {
            const isSelected = flavor.id === selectedId;
            return (
              <button
                key={flavor.id}
                onClick={() => handleSelect(flavor)}
                className={`px-6 py-3.5 rounded-full font-heading font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-3 ${
                  isSelected
                    ? "bg-white text-black shadow-xl shadow-[var(--accent-glow)] scale-105"
                    : "glass-panel text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: flavor.color }}
                />
                <span>{flavor.name}</span>
              </button>
            );
          })}
        </div>

        {/* Flavor Showcase Grid */}
        <div className="glass-panel p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Can Visual & Glow */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div
              className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-40 transition-all duration-700"
              style={{ backgroundColor: activeFlavor.color }}
            />
            <div className="relative w-full max-w-[280px] aspect-[3/4] animate-float">
              <Image
                src={activeFlavor.image}
                alt={activeFlavor.name}
                fill
                style={{ objectFit: "contain" }}
                className="drop-shadow-2xl transition-all duration-500"
              />
            </div>
          </div>

          {/* Details & Flavor Notes */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white border border-white/15">
              {activeFlavor.badge}
            </div>

            {/* Flavor Title & Description */}
            <div>
              <h3 className="font-heading font-black text-3xl sm:text-4xl text-white mb-1">
                {activeFlavor.name}
              </h3>
              <p className="text-sm font-semibold text-[var(--accent-primary)] mb-3">
                {activeFlavor.subtitle}
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                {activeFlavor.description}
              </p>
            </div>

            {/* Sensory Tasting Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-white/10">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Top Note
                </span>
                <span className="text-xs font-semibold text-white">
                  {activeFlavor.topNote}
                </span>
              </div>
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Heart Body
                </span>
                <span className="text-xs font-semibold text-white">
                  {activeFlavor.bodyNote}
                </span>
              </div>
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Clean Finish
                </span>
                <span className="text-xs font-semibold text-white">
                  {activeFlavor.finishNote}
                </span>
              </div>
            </div>

            {/* Meter Indicators */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                  <span>Effervescence (Fizz)</span>
                  <span className="text-[var(--accent-primary)]">{activeFlavor.carbonation}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-500"
                    style={{ width: `${activeFlavor.carbonation}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                  <span>Natural Sweetness</span>
                  <span className="text-[var(--accent-primary)]">{activeFlavor.sweetness}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-500"
                    style={{ width: `${activeFlavor.sweetness}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold font-heading text-white">
                  $3.50 <span className="text-xs text-slate-400 font-normal">/ 12oz can</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  {activeFlavor.calories}
                </span>
              </div>

              <button
                onClick={() => onAddFlavor(activeFlavor)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-bold text-sm hover:shadow-lg hover:shadow-[var(--accent-glow)] transition-all transform hover:scale-105 active:scale-95"
              >
                + Add {activeFlavor.name} to Pack
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
