'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your authentication logic here
      // For now, we'll just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      router.push('/dashboard'); // Navigate to dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Add error handling here
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push('/dashboard'); // Navigate to home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2F2F]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-emerald-600 mb-8">
          Login
        </h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all pl-10"
                required
                disabled={isLoading}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all pl-10"
                required
                disabled={isLoading}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-right">
            <Link 
              href="/forgot-password" 
              className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-3 text-white font-medium bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition-colors duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={handleGoBack}
              disabled={isLoading}
              className={`w-full px-4 py-3 text-emerald-600 font-medium bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg transition-colors duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
