import React, { useState } from 'react';
import CrisisCheck from './components/CrisisCheck';
import OriginalCheck from './components/OriginalCheck';

type Mode = 'crisis' | 'original';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('crisis');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-sm rounded-lg p-6 md:p-12">
        {mode === 'crisis' ? (
          <CrisisCheck onSwitchToOriginal={() => setMode('original')} />
        ) : (
          <OriginalCheck onSwitchToCrisis={() => setMode('crisis')} />
        )}
      </div>

      <footer className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest space-y-2">
        <p>SC-IFSI • PRIVATE INTEGRITY INSTRUMENT</p>
        <p>© {new Date().getFullYear()} INTEGRITY PROTOCOL</p>
      </footer>
    </div>
  );
};

export default App;
