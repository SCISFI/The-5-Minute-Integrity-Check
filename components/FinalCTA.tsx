import React, { useEffect, useState } from 'react';
import { AssessmentData } from '../types';
import { getClarityInsight } from '../services/geminiService';

interface Props {
  data: AssessmentData;
  email: string;
}

const FinalCTA: React.FC<Props> = ({ data, email }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const text = await getClarityInsight(data);
        setInsight(text || 'Clarity achieved. Review your path forward.');
      } catch (e) {
        setInsight('Review your audit results to identify your vulnerability vectors.');
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lowAuditKeys = (Object.entries(data.audit) as [string, number][])
    .filter(([_, v]) => v >= 0 && v <= 2)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

  const mailtoBody = [
    `Your 5-Minute Integrity Check Results`,
    ``,
    `Coping Indicators: ${data.patterns.filter(p => p).length} / 8`,
    `Primary Vulnerability: ${lowAuditKeys.length > 0 ? lowAuditKeys[0] : 'None Detected'}`,
    ``,
    `Clarity Memo:`,
    insight ?? 'Loading...',
    ``,
    `Next step: https://integrity.scifsi.com/`,
  ].join('\n');

  const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Your 5-Minute Integrity Check Results')}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Executive Summary</h2>
        <div className="h-1 w-20 bg-black mx-auto"></div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Clarity Memo</p>
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Synthesizing private data...</p>
            </div>
          ) : (
            <div className="prose prose-sm text-gray-700 leading-relaxed font-serif italic text-lg">
              &ldquo;{insight}&rdquo;
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-100 rounded-lg">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Coping Indicators</h3>
            <p className="text-2xl font-bold text-gray-900">{data.patterns.filter(p => p).length} / 8</p>
            <p className="text-xs text-gray-500 mt-1">Signs of sexual behavioral regulation</p>
          </div>
          <div className="p-6 border border-gray-100 rounded-lg">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Primary Vulnerability</h3>
            <p className="text-sm font-bold text-red-600 uppercase">
              {lowAuditKeys.length > 0 ? lowAuditKeys[0] : 'None Detected'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Vector of emotional isolation</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-gray-100 pt-10">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold">You don&apos;t need motivation.</h3>
          <p className="text-xl font-light text-gray-600">You need structure.</p>
        </div>

        <div className="text-sm text-gray-600 space-y-4 leading-relaxed bg-black/5 p-6 rounded-lg text-center">
          <p>
            The <strong>Integrity Protocol</strong> is not therapy. It is a structured weekly system
            designed specifically for professionals who use sexual behavior as a coping mechanism.
          </p>
          <p className="font-bold text-black uppercase tracking-tighter text-lg">Week 1 is free.</p>
        </div>

        <a
          href="https://integrity.scifsi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-black text-white text-center py-6 font-bold text-xl tracking-widest uppercase hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
        >
          Enter the Protocol →
        </a>

        {email && !loading && (
          <a
            href={mailtoLink}
            className="block w-full border border-gray-300 text-gray-700 text-center py-4 font-medium text-sm tracking-widest uppercase hover:border-black hover:text-black transition-all"
          >
            Email These Results to Myself
          </a>
        )}

        <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] pt-4">
          Strictly Confidential • No data persistent after session close
        </p>
      </div>
    </div>
  );
};

export default FinalCTA;
