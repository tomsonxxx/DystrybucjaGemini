'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { User, Music, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ArtistProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'artists'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setProfile(data);
          setName(data.name);
          setBio(data.bio || '');
        }
      } catch (err) {
        console.error("Błąd pobierania profilu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim()) {
      setError('Nazwa artysty jest wymagana.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const artistId = profile?.id || user.uid; // Uproszczenie: używamy UID jako ID dokumentu artysty
      await setDoc(doc(db, 'artists', artistId), {
        userId: user.uid,
        name: name.trim(),
        bio: bio.trim(),
        verified: profile?.verified || false,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      setProfile({ ...profile, name, bio });
      alert('Profil został zapisany pomyślnie!');
    } catch (err) {
      console.error("Błąd zapisywania profilu:", err);
      setError('Wystąpił błąd podczas zapisywania profilu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-white">Dostęp zabroniony</h1>
          <p className="text-neutral-400">Musisz być zalogowany, aby zarządzać profilem artysty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profil Artysty</h1>
              <p className="text-neutral-400">Zdefiniuj swoją tożsamość muzyczną</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Pseudonim Artystyczny *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Np. Twój Nick / Nazwa Zespołu"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Biografia (Opcjonalnie)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Opisz swoją twórczość..."
                rows={4}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none resize-none"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Zapisywanie...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Zapisz profil
                  </>
                )}
              </button>
            </div>
          </form>

          {profile?.verified && (
            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Twój profil jest zweryfikowany i gotowy do dystrybucji.</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
