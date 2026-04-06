'use client';

import React from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import Link from 'next/link';
import { LogIn, LogOut, User as UserIcon, Music } from 'lucide-react';

export const AuthButton = () => {
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Sprawdź czy użytkownik istnieje w Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Jeśli nie, stwórz nowy profil
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'artist', // Domyślna rola
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) return <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />;

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/profil"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-colors"
        >
          {user.photoURL ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image 
                src={user.photoURL} 
                alt={user.displayName || ""} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <UserIcon className="w-4 h-4 text-neutral-400" />
          )}
          <span className="text-sm font-medium hidden sm:inline">{user.displayName}</span>
        </Link>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
          title="Wyloguj się"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
    >
      <LogIn className="w-4 h-4" />
      <span>Zaloguj się</span>
    </button>
  );
};
