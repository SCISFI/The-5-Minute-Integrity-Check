import React, { useState } from 'react';
import { AppState, AssessmentData } from './types';
import Landing from './components/Landing';
import Intro from './components/Intro';
import PatternRecognition from './components/PatternRecognition';
import LonelinessAudit from './components/LonelinessAudit';
import PivotQuestion from './components/PivotQuestion';
import FinalCTA from './components/FinalCTA';

const STEPS = [AppState.INTRO, AppState.PATTERN, AppState.AUDIT, AppState.PIVOT];

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.LANDING);
  const [email, setEmail] = useState('');
  const [data, setData] = useState<AssessmentData>({
    patterns: new Array(8).fill(false),
    audit: {
      relationalExposure: -1,
      emotionalLiteracy: -1,
      maleBonding: -1,
      accountabilityDensity: -1
    },
    pivot: {
      cost: '',
      risk: '',
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

  const stepIndex = STEPS.indexOf(currentState);
  const showProgress = stepIndex >= 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-sm rounded-lg p-6 md:p-12">
        {showProgress && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Step {stepIndex + 1} of {STEPS.length}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1 rounded-full">
              <div
                className="bg-black h-1 rounded-full transition-all duration-500"
                style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {currentState === AppState.LANDING && (
          <Landing onStart={(e) => { setEmail(e); next(); }} />
        )}
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
        {currentState === AppState.RESULT && <FinalCTA data={data} email={email} />}
      </div>

      <footer className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest space-y-2">
        <p>SC-IFSI • PRIVATE INTEGRITY INSTRUMENT</p>
        <p>© {new Date().getFullYear()} INTEGRITY PROTOCOL</p>
      </footer>
    </div>
  );
};

export default App;
