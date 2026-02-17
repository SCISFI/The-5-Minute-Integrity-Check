
import React, { useState, useCallback, useEffect } from 'react';
import { AppState, AssessmentData } from './types';
import Landing from './components/Landing';
import Intro from './components/Intro';
import PatternRecognition from './components/PatternRecognition';
import LonelinessAudit from './components/LonelinessAudit';
import PivotQuestion from './components/PivotQuestion';
import FinalCTA from './components/FinalCTA';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.LANDING);
  const [data, setData] = useState<AssessmentData>({
    patterns: new Array(8).fill(false),
    audit: {
      relationalExposure: 0,
      emotionalLiteracy: 0,
      maleBonding: 0,
      accountabilityDensity: 0
    },
    pivot: {
      cost: '',
      risk: '',
      shape: '',
      change: ''
    }
  });

  const next = () => {
    const states = Object.values(AppState);
    const currentIndex = states.indexOf(currentState);
    if (currentIndex < states.length - 1) {
      setCurrentState(states[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const back = () => {
    const states = Object.values(AppState);
    const currentIndex = states.indexOf(currentState);
    if (currentIndex > 0) {
      setCurrentState(states[currentIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  const updateData = (newData: Partial<AssessmentData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-sm rounded-lg p-6 md:p-12">
        {currentState === AppState.LANDING && <Landing onStart={next} />}
        {currentState === AppState.INTRO && <Intro onNext={next} />}
        {currentState === AppState.PATTERN && (
          <PatternRecognition 
            data={data.patterns} 
            onChange={(p) => updateData({ patterns: p })} 
            onNext={next} 
            onBack={back}
          />
        )}
        {currentState === AppState.AUDIT && (
          <LonelinessAudit 
            data={data.audit} 
            onChange={(a) => updateData({ audit: a })} 
            onNext={next} 
            onBack={back}
          />
        )}
        {currentState === AppState.PIVOT && (
          <PivotQuestion 
            data={data.pivot} 
            onChange={(p) => updateData({ pivot: p })} 
            onNext={next} 
            onBack={back}
          />
        )}
        {currentState === AppState.RESULT && <FinalCTA data={data} />}
      </div>
      
      <footer className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest space-y-2">
        <p>SC-IFSI • PRIVATE INTEGRITY INSTRUMENT</p>
        <p>© {new Date().getFullYear()} INTEGRITY PROTOCOL</p>
      </footer>
    </div>
  );
};

export default App;
