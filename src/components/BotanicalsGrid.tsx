"use client";

const FEATURES = [
  {
    icon: "🌱",
    title: "100% Organic Cold-Pressed Juices",
    desc: "We extract raw juices at peak ripeness from certified organic orchards, retaining native vitamins and vivid natural flavors.",
  },
  {
    icon: "🌸",
    title: "Adaptogenic Botanical Infusions",
    desc: "Infused with elderflower, ashwagandha, and white tea antioxidants for a clean mind-body uplift without jittery crashes.",
  },
  {
    icon: "🚫",
    title: "Zero Artificial Dyes or Erythritol",
    desc: "No synthetic colors, no artificial sweeteners, no sugar alcohols. Pure natural taste powered by genuine fruits.",
  },
  {
    icon: "♻️",
    title: "100% Infinite Recyclable Aluminum",
    desc: "Packaged in lightweight aluminum cans that recycle infinitely in as little as 60 days, supporting a zero-waste future.",
  },
];

export default function BotanicalsGrid() {
  return (
    <section id="botanicals" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-3 block">
            Pure Uncompromising Quality
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-white mb-4">
            REDEFINING THE <span className="text-gradient">BEVERAGE CAN</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Traditional sodas are loaded with high-fructose corn syrup and artificial dyes. We engineered FIZZORA to elevate soda into a functional art form.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 flex flex-col items-start text-left relative overflow-hidden group hover:border-[var(--accent-primary)]/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
