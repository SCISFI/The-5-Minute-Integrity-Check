
import React from 'react';
import { AssessmentData } from '../types';

interface Props {
  data: AssessmentData['pivot'];
  onChange: (pivot: AssessmentData['pivot']) => void;
  onNext: () => void;
  onBack: () => void;
}

const PivotQuestion: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const handleChange = (field: keyof typeof data, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2 border-b border-gray-100 pb-4 text-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Part III</span>
        <h2 className="text-xl font-bold tracking-tight underline decoration-1 underline-offset-8">The Pivot Question</h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-900 italic">If this pattern continues unchanged for 5 years:</p>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">What does it cost you?</label>
              <textarea
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-black outline-none h-20 text-sm"
                value={data.cost}
                onChange={(e) => handleChange('cost', e.target.value)}
                placeholder="Time, energy, authenticity..."
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">What does it risk?</label>
              <textarea
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-black outline-none h-20 text-sm"
                value={data.risk}
                onChange={(e) => handleChange('risk', e.target.value)}
                placeholder="Career, family, self-respect..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-bold text-gray-900">Now the harder question:</p>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">If you chose structure instead of secrecy — what changes first?</label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-black outline-none h-20 text-sm"
              value={data.change}
              onChange={(e) => handleChange('change', e.target.value)}
              placeholder="Who you call, what you admit..."
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Back</button>
        <button onClick={onNext} className="flex-[2] bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Generate Final Assessment</button>
      </div>
    </div>
  );
};

export default PivotQuestion;
