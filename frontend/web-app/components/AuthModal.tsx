import React from "react";
import { signIn } from "next-auth/react";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-stone-900 rounded-xl p-8 border border-stone-700 shadow-2xl text-center">
        <h2 className="text-xl font-bold text-amber-400 mb-4">Login Required</h2>
        <p className="text-stone-300 mb-6">You need to be logged in to perform this action.</p>
        <button
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded mr-2"
          onClick={() => signIn('id-server', { redirectTo: '/' }, { prompt: 'login' })}
        >
          Go to Login
        </button>
        <button
          className="bg-stone-700 hover:bg-stone-800 text-stone-200 font-semibold px-6 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}