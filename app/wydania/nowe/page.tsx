'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Music, Upload, CheckCircle2, AlertCircle, Loader2, Disc, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function NewReleasePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  // Form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState('single');
  const [artistId, setArtistId] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'artists'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const artistList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArtists(artistList);
        if (artistList.length > 0) {
          setArtistId(artistList[0].id);
        }
      } catch (err) {
        console.error("Błąd pobierania artystów:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title || !artistId || !genre || !releaseDate) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const docRef = await addDoc(collection(db, 'releases'), {
        userId: user.uid,
        artistId,
        title,
        type,
        genre,
        releaseDate,
        status: 'draft',
        createdAt: serverTimestamp(),
      });

      router.push(`/wydania/${docRef.id}`);
    } catch (err) {
      console.error("Błąd tworzenia wydania:", err);
      setError('Wystąpił błąd podczas tworzenia wydania.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-white">Brak profilu artysty</h1>
          <p className="text-neutral-400 mb-6">Zanim stworzysz wydanie, musisz skonfigurować swój profil artysty.</p>
          <button 
            onClick={() => router.push('/profil')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all"
          >
            Stwórz profil artysty
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Nowe Wydanie</h1>
          <p className="text-neutral-400">Rozpocznij proces dystrybucji swojej muzyki</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-1 space-y-4">
            {[
              { id: 1, label: 'Podstawowe informacje', icon: Disc },
              { id: 2, label: 'Pliki i Okładka', icon: Upload, disabled: true },
              { id: 3, label: 'Finalizacja', icon: CheckCircle2, disabled: true },
            ].map((s) => (
              <div 
                key={s.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  step === s.id 
                    ? 'bg-blue-600/10 border-blue-500/50 text-blue-500' 
                    : 'bg-neutral-900/50 border-neutral-800 text-neutral-500'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  step === s.id ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-600'
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Tytuł Wydania *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Np. Letnie Noce"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Typ Wydania *</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none"
                    >
                      <option value="single">Singiel</option>
                      <option value="ep">EP</option>
                      <option value="album">Album</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Artysta *</label>
                    <select
                      value={artistId}
                      onChange={(e) => setArtistId(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none"
                    >
                      {artists.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Gatunek *</label>
                    <input
                      type="text"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="Np. Pop, Hip-Hop"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Data Wydania *</label>
                    <input
                      type="date"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Tworzenie...
                      </>
                    ) : (
                      <>
                        Kontynuuj
                        <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
