import React, { useState } from 'react';
import CrisisCheck from './components/CrisisCheck';
import OriginalCheck from './components/OriginalCheck';
import PrivacyPolicy from './components/PrivacyPolicy';

type Mode = 'crisis' | 'original';

function isPrivacyPath(pathname: string): boolean {
  return pathname === '/privacy' || pathname === '/privacy/';
}

const Footer: React.FC = () => (
  <footer className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest space-y-2">
    <p>SC-IFSI • PRIVATE INTEGRITY INSTRUMENT</p>
    <p>
      <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>
    </p>
    <p>© {new Date().getFullYear()} INTEGRITY PROTOCOL</p>
  </footer>
);

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('crisis');
  const showPrivacy = isPrivacyPath(window.location.pathname);

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 md:p-8 ${showPrivacy ? 'justify-start' : 'justify-center'}`}>
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-sm rounded-lg p-6 md:p-12">
        {showPrivacy ? (
          <PrivacyPolicy />
        ) : mode === 'crisis' ? (
          <CrisisCheck onSwitchToOriginal={() => setMode('original')} />
        ) : (
          <OriginalCheck onSwitchToCrisis={() => setMode('crisis')} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
