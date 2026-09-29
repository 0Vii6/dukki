"use client";

const REVIEWS = [
  {
    quote: "FIZZORA has done the impossible: created a soda that feels decadent, functional, and ridiculously clean. The Yuzu Electric is our daily essential.",
    author: "Vogue Magazine",
    role: "Culinary & Lifestyle",
    rating: "★★★★★",
  },
  {
    quote: "The carbonation curve and natural botanical lift rival high-end sparkling wines. Unquestionably the best craft soda release of the decade.",
    author: "Bon Appétit",
    role: "Beverage Lab Review",
    rating: "★★★★★",
  },
  {
    quote: "Finally, a zero-artificial soda that delivers actual crisp flavor without leaving a synthetic sweetener aftertaste in your mouth.",
    author: "WIRED",
    role: "Product Design Excellence",
    rating: "★★★★★",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-3 block">
            Critical Acclaim
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-white mb-4">
            LOVED BY <span className="text-gradient">TASTEMAKERS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 flex flex-col justify-between text-left hover:border-white/20 transition-all"
            >
              <div>
                <div className="text-amber-400 text-sm mb-4 tracking-widest">
                  {rev.rating}
                </div>
                <p className="text-slate-200 text-base leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="font-heading font-bold text-white text-base">
                  {rev.author}
                </div>
                <div className="text-xs text-slate-400">{rev.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
