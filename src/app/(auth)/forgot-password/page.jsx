'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDisabled) return;

    const res = await fetch('http://localhost:3001/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("forgot password res:", data);
    if (res.ok) {
      setMessage('Password reset link sent to your email.');
      setIsDisabled(true);
      setTimer(120); // 2 minutes
    } else {
      setMessage(data.message || 'Failed to send reset link.');
    }
  };

  useEffect(() => {
    let interval;
    if (isDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isDisabled, timer]);

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, '0');
    const seconds = String(secs % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        {/* Timer Text */}
        {isDisabled && (
          <p className="text-sm text-red-600 text-center font-medium">
            You can send another email request in {formatTime(timer)} seconds
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-2 rounded text-white transition duration-200 ${
            isDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isDisabled ? 'Please wait...' : 'Send Reset Link'}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </main>
  );
}
