// app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2 } from 'lucide-react';
import { registerUser } from '@/app/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert React state to FormData for the Server Action
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      // Call the server action
      const result = await registerUser(formDataObj);

      // If the server returns a specific error string, show it
      if (result?.error) {
        setError(result.error);
      } 
      // If successful, redirect
      else if (result?.success) {
        router.push('/login?registered=true');
      }
    } catch (err) {
      // If Next.js crashes completely, catch it here!
      console.error("Frontend caught an error:", err);
      setError("A critical server error occurred. Check your terminal logs.");
    } finally {
      // This ALWAYS runs, unlocking the button no matter what happens
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-4xl font-bold">E</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-white">ModernERP</h1>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-3xl p-10">
          <h2 className="text-3xl font-semibold text-white text-center mb-2">Create Account</h2>
          <p className="text-zinc-400 text-center mb-8">Start your 14-day free trial</p>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl mb-6 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400">First Name</label>
                <input
                  type="text"
                  className="w-full mt-1 bg-zinc-800 border border-zinc-700 text-white rounded-2xl px-5 py-3 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition disabled:opacity-50"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Last Name</label>
                <input
                  type="text"
                  className="w-full mt-1 bg-zinc-800 border border-zinc-700 text-white rounded-2xl px-5 py-3 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition disabled:opacity-50"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Company Name</label>
              <input
                type="text"
                className="w-full mt-1 bg-zinc-800 border border-zinc-700 text-white rounded-2xl px-5 py-3 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition disabled:opacity-50"
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">Business Email</label>
              <input
                type="email"
                className="w-full mt-1 bg-zinc-800 border border-zinc-700 text-white rounded-2xl px-5 py-3 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition disabled:opacity-50"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">Password</label>
              <input
                type="password"
                className="w-full mt-1 bg-zinc-800 border border-zinc-700 text-white rounded-2xl px-5 py-3 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition disabled:opacity-50"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 rounded-2xl font-semibold mt-6 hover:brightness-110 transition text-white flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin inline mr-2" size={20} />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="inline mr-2" size={20} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-zinc-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-violet-400 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}