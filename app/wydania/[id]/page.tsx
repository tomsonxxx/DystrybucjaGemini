'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Image from 'next/image';
import { Music, Upload, CheckCircle2, AlertCircle, Loader2, Disc, Calendar, Tag, Trash2, ArrowLeft, Play, FileAudio, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ReleaseDetailsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const releaseId = params.id as string;

  const [release, setRelease] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchRelease = async () => {
      if (!user || !releaseId) return;
      try {
        const docRef = doc(db, 'releases', releaseId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.userId !== user.uid) {
            setError('Dostęp zabroniony.');
          } else {
            setRelease({ id: docSnap.id, ...data });
          }
        } else {
          setError('Wydanie nie zostało znalezione.');
        }
      } catch (err) {
        console.error("Błąd pobierania wydania:", err);
        setError('Wystąpił błąd podczas pobierania danych.');
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, [user, releaseId]);

  const handleDelete = async () => {
    if (!window.confirm('Czy na pewno chcesz usunąć to wydanie? Tej operacji nie można cofnąć.')) return;
    
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'releases', releaseId));
      router.push('/'); // Powrót na główną lub listę wydań
    } catch (err) {
      console.error("Błąd usuwania:", err);
      alert('Nie udało się usunąć wydania.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-white">Błąd</h1>
          <p className="text-neutral-400 mb-6">{error}</p>
          <Link 
            href="/"
            className="inline-block bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center overflow-hidden relative group">
              {release.coverUrl ? (
                <Image 
                  src={release.coverUrl} 
                  alt={release.title} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Disc className="w-16 h-16 text-neutral-700 group-hover:text-blue-500 transition-colors" />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-3 bg-blue-600 rounded-full text-white">
                  <Upload className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex-1 pt-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-blue-600/20 text-blue-500 text-xs font-bold uppercase tracking-wider rounded border border-blue-500/20">
                  {release.type}
                </span>
                <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded border ${
                  release.status === 'draft' ? 'bg-neutral-800 text-neutral-400 border-neutral-700' : 'bg-green-600/20 text-green-500 border-green-500/20'
                }`}>
                  {release.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{release.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>{release.genre}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{release.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-3 bg-neutral-900 border border-neutral-800 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              title="Usuń wydanie"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
              Wyślij do weryfikacji
            </button>
          </div>
        </div>

        {/* Content Tabs/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracks Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileAudio className="w-5 h-5 text-blue-500" />
                  Utwory
                </h2>
                <button className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
                  + Dodaj utwór
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Placeholder for tracks */}
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-between group hover:border-neutral-700 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-600 group-hover:text-blue-500 transition-colors">
                      <Play className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{release.title} (Main Mix)</h3>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest">WAV • 44.1kHz • 24bit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-500">3:42</span>
                    <button className="p-2 text-neutral-600 hover:text-white transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 border-2 border-dashed border-neutral-800 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mb-3 text-neutral-600 group-hover:text-blue-500 transition-colors">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">Przeciągnij pliki audio tutaj</p>
                  <p className="text-xs text-neutral-600 mt-1">WAV lub FLAC, min. 16bit/44.1kHz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                Checklista
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Metadane podstawowe', done: true },
                  { label: 'Okładka (3000x3000px)', done: false },
                  { label: 'Pliki audio (WAV)', done: false },
                  { label: 'Kody ISRC/UPC', done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      item.done ? 'bg-green-500 text-neutral-950' : 'bg-neutral-800 text-neutral-600'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-sm ${item.done ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
              <h2 className="text-lg font-bold mb-4">Informacje dodatkowe</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-1">Kod UPC</p>
                  <p className="text-sm font-mono text-neutral-300">{release.upc || 'Zostanie wygenerowany'}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-1">Wytwórnia</p>
                  <p className="text-sm text-neutral-300">Self-Released</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
