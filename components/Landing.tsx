import React, { useState } from 'react';
import { captureEmail } from '../services/emailService';

interface Props {
  onStart: (email: string, firstName: string) => void;
}

const Landing: React.FC<Props> = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await captureEmail(email, firstName);
    } catch {
      // Non-blocking — proceed even if capture fails
    } finally {
      setLoading(false);
      onStart(email, firstName);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
          The 5-Minute Integrity Check
        </h1>
        <p className="text-lg text-gray-600 font-light">
          For High-Functioning Professionals Managing Private Sexual Coping.
        </p>
      </div>

      <div className="space-y-6">
        <div className="prose prose-sm text-gray-500">
          <p>
            You manage responsibilities. You meet expectations. You perform at a high level.
            But integrity is measured in private.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Corporate or Private Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Enter your email to begin privately"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Shedding Light...' : 'Send It Privately & Start'}
          </button>
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">
            Privacy Guaranteed. No data is stored on public servers.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Landing;
