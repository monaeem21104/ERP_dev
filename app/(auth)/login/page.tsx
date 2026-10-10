// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header / Logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-white text-6xl font-black tracking-tighter">E</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tighter">ModernERP</h1>
          <p className="text-zinc-400 mt-1">Enterprise Solution</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 shadow-xl">
          <h2 className="text-3xl font-semibold text-white text-center mb-2">Sign In</h2>
          <p className="text-zinc-400 text-center mb-8">Access your business dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-violet-400 hover:text-violet-300 text-sm">
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 transition-all py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 text-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <LogIn size={24} />}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-8 text-zinc-400 text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-violet-400 font-medium hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}