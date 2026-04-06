'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { Disc, Plus, Loader2, ChevronRight, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function AllReleasesPage() {
  const { user } = useAuth();
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReleases = async () => {
      if (!user) return;
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
        setLoading(false);
      }
    };

    fetchReleases();
  }, [user]);

  const filteredReleases = releases.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Twoje Wydania</h1>
            <p className="text-neutral-400">Zarządzaj swoim katalogiem muzycznym.</p>
          </div>
          <Link 
            href="/wydania/nowe"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-5 h-5" />
            Nowe Wydanie
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input 
              type="text"
              placeholder="Szukaj wydania..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <button className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-2 text-neutral-400 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
            Filtruj
          </button>
        </div>

        {filteredReleases.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredReleases.map((release) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link 
                  href={`/wydania/${release.id}`}
                  className="flex items-center justify-between p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-neutral-950 rounded-xl flex items-center justify-center text-neutral-700 group-hover:text-blue-500 transition-colors overflow-hidden relative">
                      {release.coverUrl ? (
                        <Image 
                          src={release.coverUrl} 
                          alt={release.title} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Disc className="w-8 h-8" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{release.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{release.type}</span>
                        <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                        <span className={`text-xs font-bold uppercase tracking-widest ${
                          release.status === 'draft' ? 'text-neutral-500' : 'text-green-500'
                        }`}>{release.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden md:block text-right">
                      <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-1">Data wydania</p>
                      <p className="text-sm text-neutral-300">{release.releaseDate}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-neutral-700 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-900/50 border-2 border-dashed border-neutral-800 rounded-3xl">
            <Disc className="w-16 h-16 text-neutral-800 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Brak wydań</h2>
            <p className="text-neutral-500 mb-8">Nie znaleźliśmy żadnych wydań pasujących do Twoich kryteriów.</p>
            <Link 
              href="/wydania/nowe"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Stwórz nowe wydanie
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
