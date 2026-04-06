'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Music, Share2, BarChart3, Upload, Play, CheckCircle2, Plus, Disc, ChevronRight, Loader2 } from 'lucide-react';
import { AuthButton } from '@/components/features/auth-button';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Link from 'next/link';

export default function LandingPage() {
  const { user } = useAuth();
  const [releases, setReleases] = React.useState<any[]>([]);
  const [loadingReleases, setLoadingReleases] = React.useState(false);

  React.useEffect(() => {
    const fetchReleases = async () => {
      if (!user) return;
      setLoadingReleases(true);
      try {
        const q = query(
          collection(db, 'releases'), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setReleases(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Błąd pobierania wydań:", err);
      } finally {
        setLoadingReleases(false);
      }
    };

    fetchReleases();
  }, [user]);

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
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span>Dystrybucja</span>
          </Link>
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

      {user ? (
        /* Dashboard for logged in users */
        <main className="pt-32 pb-24 container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Witaj, {user.displayName}</h1>
              <p className="text-neutral-400 text-lg">Zarządzaj swoją muzyką i dystrybucją.</p>
            </div>
            <Link 
              href="/wydania/nowe"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-5 h-5" />
              Nowe Wydanie
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Releases List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Disc className="w-5 h-5 text-blue-500" />
                    Twoje Wydania
                  </h2>
                  <Link href="/wydania" className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
                    Zobacz wszystkie
                  </Link>
                </div>

                {loadingReleases ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  </div>
                ) : releases.length > 0 ? (
                  <div className="space-y-4">
                    {releases.map((release) => (
                      <Link 
                        key={release.id}
                        href={`/wydania/${release.id}`}
                        className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-800 rounded-2xl hover:border-blue-500/50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-700 group-hover:text-blue-500 transition-colors">
                            <Disc className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold group-hover:text-blue-500 transition-colors">{release.title}</h3>
                            <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest">{release.type} • {release.status}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-neutral-700 group-hover:text-white transition-colors" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-neutral-800 rounded-2xl">
                    <Disc className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                    <p className="text-neutral-500 mb-6">Nie masz jeszcze żadnych wydań.</p>
                    <Link 
                      href="/wydania/nowe"
                      className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
                    >
                      Stwórz swoje pierwsze wydanie
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Stats/Quick Actions */}
            <div className="space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h2 className="text-lg font-bold mb-6">Statystyki</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Odtworzenia (30 dni)</p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Przychody</p>
                    <p className="text-3xl font-bold">0.00 PLN</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Zostań zweryfikowany</h3>
                  <p className="text-blue-100 text-sm mb-6">Zyskaj dostęp do zaawansowanych narzędzi promocyjnych.</p>
                  <button className="px-4 py-2 bg-white text-blue-600 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors">
                    Dowiedz się więcej
                  </button>
                </div>
                <Music className="absolute -bottom-4 -right-4 w-24 h-24 text-blue-500/20 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* Landing Page for guests */
        <>
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
        </>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800 text-center text-neutral-500 text-sm">
        <p>&copy; 2026 Dystrybucja Muzyki. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}
