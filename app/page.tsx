'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Music, Share2, BarChart3, Upload, Play, CheckCircle2 } from 'lucide-react';
import { AuthButton } from '@/components/features/auth-button';

export default function LandingPage() {
  const features = [
    {
      icon: <Upload className="w-6 h-6 text-blue-500" />,
      title: "Szybka Dystrybucja",
      description: "Wysyłaj swoją muzykę do Spotify, Apple Music i setek innych sklepów w kilka minut."
    },
    {
      icon: <Share2 className="w-6 h-6 text-purple-500" />,
      title: "Promocja i Marketing",
      description: "Narzędzia do tworzenia smartlinków i kampanii promocyjnych dla Twoich wydań."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: "Analityka w Czasie Rzeczywistym",
      description: "Śledź swoje statystyki i przychody z każdego utworu na przejrzystym panelu."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-neutral-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span>Dystrybucja</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">Funkcje</a>
              <a href="#" className="hover:text-white transition-colors">Cennik</a>
              <a href="#" className="hover:text-white transition-colors">Pomoc</a>
            </div>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-neutral-950 z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
              <Music className="w-4 h-4" />
              <span>Twoja muzyka na całym świecie</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Dystrybucja <br /> bez granic
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
              Profesjonalne narzędzie do publikacji i promocji Twojej twórczości. 
              Zarządzaj swoją karierą muzyczną z jednego miejsca.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-2">
                Zacznij teraz <Play className="w-4 h-4 fill-current" />
              </button>
              <button className="px-8 py-4 bg-neutral-900 text-white font-semibold rounded-xl border border-neutral-800 hover:bg-neutral-800 transition-all">
                Zobacz demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-neutral-900/50 border-y border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 transition-colors group"
              >
                <div className="mb-6 p-3 bg-neutral-900 rounded-lg w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16">Dlaczego my?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "100% zysków dla artysty",
              "Dystrybucja w 24h",
              "Wsparcie 24/7",
              "Brak ukrytych opłat"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 justify-center text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800 text-center text-neutral-500 text-sm">
        <p>&copy; 2026 Dystrybucja Muzyki. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}
