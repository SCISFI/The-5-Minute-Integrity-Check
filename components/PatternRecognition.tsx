
import React from 'react';

interface Props {
  data: boolean[];
  onChange: (patterns: boolean[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const questions = [
  "Do you find yourself using sexual behavior (porn, fantasy, messaging, secrecy) primarily to regulate stress, loneliness, or pressure?",
  "Does your behavior escalate when you feel emotionally disconnected — even if you’re socially surrounded?",
  "Have you promised yourself you would stop, reduce, or “manage it better” — but the pattern continues?",
  "Do you compartmentalize this area of your life from your professional identity?",
  "Would exposure of this behavior significantly disrupt your career or reputation?",
  "Do you experience a cycle of tension → behavior → relief → regret → resolve → repeat?",
  "Have you normalized the behavior because it “isn’t as bad as others”?",
  "Do you feel alone in this struggle despite being highly competent elsewhere?"
];

const PatternRecognition: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const toggle = (index: number) => {
    const newData = [...data];
    newData[index] = !newData[index];
    onChange(newData);
  };

  const yesCount = data.filter(Boolean).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2 border-b border-gray-100 pb-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Part I</span>
        <h2 className="text-xl font-bold tracking-tight">Pattern Recognition</h2>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors rounded-lg group cursor-pointer" onClick={() => toggle(i)}>
            <div className={`mt-1 h-5 w-5 flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-all ${data[i] ? 'bg-black border-black' : 'border-gray-300'}`}>
              {data[i] && <div className="h-2 w-2 bg-white rounded-full"></div>}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed group-hover:text-black">
              {q}
            </p>
          </div>
        ))}
      </div>

      {yesCount >= 3 && (
        <div className="bg-black text-white p-6 rounded-sm space-y-2 animate-in zoom-in-95 duration-300">
          <p className="text-xs uppercase tracking-widest font-bold opacity-70">Assessment Result</p>
          <p className="text-lg font-light leading-relaxed">
            You are not dealing with a habit. <br/>
            <span className="font-bold underline">You are managing a coping system.</span>
          </p>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Back</button>
        <button onClick={onNext} className="flex-[2] bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Continue to Audit</button>
      </div>
    </div>
  );
};

export default PatternRecognition;
