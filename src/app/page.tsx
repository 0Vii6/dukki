"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FlavorSelector, { FLAVORS, Flavor } from "@/components/FlavorSelector";
import SodaMixer from "@/components/SodaMixer";
import BotanicalsGrid from "@/components/BotanicalsGrid";
import SoundExperience from "@/components/SoundExperience";
import Testimonials from "@/components/Testimonials";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "starter-pack",
      name: "Variety Starter 6-Pack",
      price: 21.0,
      quantity: 1,
      details: "2x Yuzu, 2x Raspberry, 2x Blackberry",
    },
  ]);
  const [activeTheme, setActiveTheme] = useState("yuzu");

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddFlavor = (flavor: Flavor) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === flavor.id);
      if (existing) {
        return prev.map((item) =>
          item.id === flavor.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: flavor.id,
          name: `${flavor.name} 6-Pack`,
          price: 21.0,
          quantity: 1,
          details: flavor.subtitle,
          image: flavor.image,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleAddCustomPack = (customCan: any) => {
    const customId = `custom-${Date.now()}`;
    setCartItems((prev) => [
      ...prev,
      {
        id: customId,
        name: `Custom: ${customCan.name} (6-Pack)`,
        price: 24.0,
        quantity: 1,
        details: `${customCan.botanicals.join(", ")} | ${customCan.carbonation}% Fizz`,
      },
    ]);
    setCartOpen(true);
  };

  const handleUpdateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <main className="min-h-screen bg-[#060812] text-slate-100 overflow-x-hidden selection:bg-[var(--accent-primary)] selection:text-black">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        activeTheme={activeTheme}
      />

      {/* Hero Section */}
      <Hero onQuickAdd={() => handleAddFlavor(FLAVORS[0])} />

      {/* Flavor Matrix Switcher */}
      <FlavorSelector
        onAddFlavor={handleAddFlavor}
        onThemeChange={(theme) => setActiveTheme(theme)}
      />

      {/* Interactive Soda Customizer */}
      <SodaMixer onAddCustomPack={handleAddCustomPack} />

      {/* Organic Botanicals Showcase */}
      <BotanicalsGrid />

      {/* ASMR Sound Synthesizer Experience */}
      <SoundExperience />

      {/* Press & Tastemaker Testimonials */}
      <Testimonials />

      {/* Slide-over Shopping Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
