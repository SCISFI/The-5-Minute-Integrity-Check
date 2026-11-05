import React, { useState } from 'react';
import CrisisCheck from './components/CrisisCheck';
import OriginalCheck from './components/OriginalCheck';
import PrivacyPolicy from './components/PrivacyPolicy';

type Mode = 'crisis' | 'original';

function isPrivacyPath(pathname: string): boolean {
  return pathname === '/privacy' || pathname === '/privacy/';
}

const Footer: React.FC = () => (
  <footer className="mt-10 text-center text-[11px] leading-relaxed text-[#6b6258] uppercase tracking-[0.12em] text-balance space-y-2">
    <p>SC-IFSI • PRIVATE INTEGRITY INSTRUMENT</p>
    <p>
      <a href="/privacy" className="underline underline-offset-2 hover:text-ink">Privacy Policy</a>
    </p>
    <p>© {new Date().getFullYear()} INTEGRITY PROTOCOL</p>
  </footer>
);

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('crisis');
  const showPrivacy = isPrivacyPath(window.location.pathname);

  return (
    <div className="min-h-screen bg-room text-ink flex flex-col items-center px-4 py-8 md:px-8 md:py-12">
      <div className={`w-full max-w-2xl ${showPrivacy ? 'mt-2' : 'my-auto'}`}>
        <div className="bg-paper border border-[#e4d9cc] shadow-[0_1px_1px_rgba(48,36,24,0.04),0_22px_40px_-30px_rgba(48,36,24,0.42)] rounded-lg px-6 py-10 md:px-16 md:py-16">
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
    </div>
  );
};

export default App;
