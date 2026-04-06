import Link from 'next/link';
import { Music, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Music className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-4">Strona nie została znaleziona</h2>
        <p className="text-neutral-400 mb-8">
          Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
        </p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}
