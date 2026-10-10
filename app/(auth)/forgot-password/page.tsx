// app/(auth)/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center text-slate-400 hover:text-white mb-8">
          <ArrowLeft size={20} className="mr-2" /> Back to Login
        </Link>

        <div className="glass rounded-3xl p-10">
          <h2 className="text-3xl font-semibold text-center mb-2">Reset Password</h2>
          <p className="text-slate-400 text-center mb-8">We'll send you a reset link</p>

          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 focus:border-violet-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-2xl font-semibold"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center py-10">
              <p className="text-green-400 text-xl">✅ Reset link sent!</p>
              <p className="text-slate-400 mt-4">Please check your inbox</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}