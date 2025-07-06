'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Correctly extracts token from URL
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();

    // Check if token is present before making the request
    if (!token) {
      setMessage('Password reset token is missing from the URL.');
      return;
    }

    // Construct the URL with the token as a query parameter
    const res = await fetch(`http://localhost:3001/auth/reset-password?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Only send the new password in the body, as the token is in the URL
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } else {
      setMessage(data.message || 'Failed to reset password.');
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </main>
  );
}
