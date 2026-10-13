import React, { useEffect, useState } from 'react';
import { AssessmentData } from '../types';
import { getClarityInsight } from '../services/geminiService';
import { sendResultsEmail } from '../services/emailService';
import { buildProtocolHandoff } from '../services/protocolHandoff';

interface Props {
  data: AssessmentData;
  email: string;
  firstName: string;
}

const FinalCTA: React.FC<Props> = ({ data, email, firstName }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handoff = buildProtocolHandoff(data);
  const featuredAreas = handoff.lowAreas.slice(0, 2);
  const otherLowAreas = handoff.lowAreas.slice(2);
  const patternLine = firstName
    ? `${firstName}, ${handoff.patternLine.charAt(0).toLowerCase()}${handoff.patternLine.slice(1)}`
    : handoff.patternLine;

  useEffect(() => {
    getClarityInsight(data)
      .then(text => setInsight(text || 'Clarity achieved. Review your path forward.'))
      .catch(() => setInsight('Review your audit results to identify your vulnerability vectors.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSendEmail = async () => {
    if (!insight || emailStatus === 'sending' || emailStatus === 'sent') return;
    setEmailStatus('sending');
    try {
      await sendResultsEmail(email, firstName, data, insight);
      setEmailStatus('sent');
    } catch {
      setEmailStatus('error');
    }
  };

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
              <p className="text-xs text-gray-500 uppercase tracking-widest">Writing your clarity memo...</p>
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Lowest loneliness area</h3>
            <p className="text-sm font-bold text-red-600 uppercase">
              {handoff.primaryLabel}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {handoff.primaryScore === null ? 'No area at 2 or below' : `Rated ${handoff.primaryScore} of 5`}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-gray-100 pt-10">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold">You don&apos;t need motivation.</h3>
          <p className="text-xl font-light text-gray-600">You need structure.</p>
        </div>

        <div className="text-sm text-gray-700 space-y-4 leading-relaxed bg-black/5 p-6 rounded-lg text-left">
          <p>{patternLine}</p>
          {handoff.steadyLine && <p>{handoff.steadyLine}</p>}
          {featuredAreas.map((area) => (
            <p key={area.key}>
              <span className="font-semibold text-gray-900">{area.label}</span>
              {`, rated ${area.score} of 5. ${area.tie}`}
            </p>
          ))}
          {otherLowAreas.length > 0 && (
            <p>
              Also low: {otherLowAreas.map((area) => `${area.label} (${area.score} of 5)`).join(', ')}.
            </p>
          )}
          {handoff.pivotLine && <p>{handoff.pivotLine}</p>}
          <p>{handoff.trackSummary}</p>
          <p className="font-bold text-black text-base">{handoff.offerLine}</p>
          <p className="text-xs text-gray-500">{handoff.priceLine}</p>
        </div>

        <a
          href={handoff.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-black text-white text-center py-6 px-4 font-bold text-base sm:text-lg tracking-widest uppercase hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
        >
          {handoff.buttonLabel} &rarr;
        </a>
        <p className="text-center text-xs text-gray-500 -mt-2">
          Opens the signup page with {handoff.trackName} selected. You can change the program, then choose a mentor and set a password. No credit card on that page.
        </p>

        {email && !loading && (
          <button
            onClick={handleSendEmail}
            disabled={emailStatus === 'sending' || emailStatus === 'sent'}
            className="block w-full border border-gray-300 text-gray-700 text-center py-4 font-medium text-sm tracking-widest uppercase hover:border-black hover:text-black transition-all disabled:opacity-50 disabled:cursor-default"
          >
            {emailStatus === 'sent'
              ? '\u2713 Results Sent to Your Email'
              : emailStatus === 'sending'
              ? 'Sending...'
              : emailStatus === 'error'
              ? 'Try sending again'
              : 'Email These Results to Myself'}
          </button>
        )}

        {emailStatus === 'error' && (
          <p className="text-center text-xs text-red-500 -mt-4">
            We couldn&apos;t send that email. Please try again, or write support@scifsi.com and we will help.
          </p>
        )}

        <p className="text-center text-xs text-gray-400 leading-relaxed pt-4">
          Your answers are sent once, without your name or email, to write the clarity memo. We do not save them in an account. Your name and email stay in this browser unless you email the results to yourself.
        </p>
      </div>
    </div>
  );
};

export default FinalCTA;
