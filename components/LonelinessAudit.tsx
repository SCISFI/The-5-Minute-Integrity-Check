import React from 'react';
import { AssessmentData } from '../types';

interface Props {
  data: AssessmentData['audit'];
  onChange: (audit: AssessmentData['audit']) => void;
  onNext: () => void;
  onBack: () => void;
}

const auditItems = [
  { id: 'relationalExposure', label: 'Relational Exposure', sub: 'I am fully known by at least one safe adult male.' },
  { id: 'emotionalLiteracy', label: 'Emotional Literacy', sub: 'I can name what I am feeling before I act on it.' },
  { id: 'maleBonding', label: 'Male Bonding', sub: 'I have structured, consistent male connection beyond work.' },
  { id: 'accountabilityDensity', label: 'Accountability Density', sub: 'There are people in my life who can ask hard questions and expect real answers.' }
];

const LonelinessAudit: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const updateScore = (id: string, score: number) => {
    onChange({ ...data, [id]: score });
  };

  // Scores initialise at -1 (unrated). Once a user rates a category >= 0,
  // a score of 0–2 is considered a vulnerability vector.
  const hasVulnerability = (Object.values(data) as number[]).some(v => v >= 0 && v <= 2);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2 border-b border-gray-100 pb-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Part II</span>
        <h2 className="text-xl font-bold tracking-tight">The Loneliness Audit</h2>
        <p className="text-xs text-gray-500">Rate 0–5 (0 = absent, 5 = strong and consistent)</p>
      </div>

      <div className="space-y-8">
        {auditItems.map((item) => (
          <div key={item.id} className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">{item.label}</h3>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => updateScore(item.id, score)}
                  className={`h-10 w-10 md:h-12 md:w-12 rounded-full border text-sm font-medium transition-all ${
                    data[item.id as keyof typeof data] === score
                      ? 'bg-black text-white border-black scale-110'
                      : 'border-gray-200 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasVulnerability && (
        <div className="bg-gray-100 p-6 rounded-sm space-y-2">
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 italic">Finding</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Categories rated 2 or below represent your <span className="font-bold">vulnerability vector</span>.
            Behavior follows isolation.
          </p>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Back</button>
        <button onClick={onNext} className="flex-[2] bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Pivot Question</button>
      </div>
    </div>
  );
};

export default LonelinessAudit;
