
import React from 'react';

const Intro: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-12 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight uppercase">High-Functioning. Privately Struggling.</h2>
        <div className="space-y-2 text-gray-600 font-light">
          <p>You manage responsibilities.</p>
          <p>You meet expectations.</p>
          <p>You perform at a high level.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 border-l-4 border-black space-y-4">
        <p className="font-semibold text-gray-900">But integrity is not measured publicly.</p>
        <p className="text-gray-700 italic">It’s measured in private.</p>
      </div>

      <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
        <p>This is not a diagnosis. It’s not a recovery program.</p>
        <p>It’s a <strong>clarity instrument</strong>.</p>
        <p className="text-gray-900 font-medium underline">Answer honestly. No one sees this but you.</p>
      </div>

      <button
        onClick={onNext}
        className="w-full border-2 border-black py-4 font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
      >
        I am ready for clarity
      </button>
    </div>
  );
};

export default Intro;
