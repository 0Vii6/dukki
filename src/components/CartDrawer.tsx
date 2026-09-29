"use client";

import { useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
  image?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkedOut, setCheckedOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingMin = 40;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingMin) * 100);

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => {
      onClearCart();
      setCheckedOut(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#0b0e1b] border-l border-white/10 h-full p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h3 className="font-heading font-black text-xl text-white">
              YOUR FIZZORA BAG
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="my-4 p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>
              {subtotal >= freeShippingMin
                ? "🎉 You qualified for FREE Cold-Chain Shipping!"
                : `Add $${(freeShippingMin - subtotal).toFixed(2)} more for FREE Shipping`}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
          {checkedOut ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 text-3xl flex items-center justify-center mb-4 animate-bounce">
                ✓
              </div>
              <h4 className="font-heading font-black text-2xl text-white mb-2">
                ORDER PLACED!
              </h4>
              <p className="text-slate-300 text-sm">
                Your cold-crafted soda box is being prepared for immediate dispatch. Stay effervescent!
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
              <span className="text-4xl mb-3">🥤</span>
              <p className="text-sm">Your bag is empty.</p>
              <p className="text-xs text-slate-500 mt-1">Select a flavor above to begin.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-white text-sm">
                    {item.name}
                  </h4>
                  {item.details && (
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.details}</div>
                  )}
                  <div className="text-xs font-bold text-[var(--accent-primary)] mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 border border-white/10 rounded-lg px-2 py-1 bg-black/40">
                  <button
                    onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                    className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-white px-1">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        {items.length > 0 && !checkedOut && (
          <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cold-Chain Shipping:</span>
                <span className="text-emerald-400">
                  {subtotal >= freeShippingMin ? "FREE" : "$5.99"}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total:</span>
                <span className="text-gradient">
                  ${(subtotal + (subtotal >= freeShippingMin ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-bold text-sm hover:shadow-xl hover:shadow-[var(--accent-glow)] transition-all transform hover:scale-[1.02] active:scale-95"
            >
              Checkout Now →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
