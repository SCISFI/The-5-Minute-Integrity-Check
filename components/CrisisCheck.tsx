import React, { useState } from 'react';
import { CrisisData } from '../types';
import CrisisResources from './CrisisResources';
import { getStabilizingMemo, hasHighRisk } from '../services/crisisSummary';

interface Props {
  onSwitchToOriginal: () => void;
}

const GUARDRAILS = [
  'Pressure her to forgive you.',
  'Demand that she calm down.',
  'Ask her to comfort you.',
  'Blame stress, marriage problems, loneliness, or her reactions.',
  'Minimize what happened.',
  'Delete evidence.',
  'Add new partial truths after being confronted.',
  'Make promises you have not yet earned.',
  'Contact the other person.',
  'Try to force a relationship decision today.',
];

const WHAT_HAPPENED = [
  'Porn use',
  'Messaging/chatting',
  'Emotional/sexual contact',
  'Affair behavior',
  'Paid sexual content/services',
  'Hidden app/account/device behavior',
  'Relapse after a promise',
  'Lying/trickle truth',
  'Other',
];

const TEMPTED = [
  'Defend myself',
  'Explain why it happened',
  'Minimize it',
  'Blame her reaction',
  'Promise it will never happen again',
  'Delete or hide more information',
  'Demand reassurance',
  'Shut down or disappear',
  'Contact the other person',
  'Hurt myself',
  'Use again',
  'Other',
];

const PARTNER_NEEDS = [
  'Space',
  'Truth without pressure',
  'No more discoveries',
  'No defensiveness',
  'A written timeline later',
  'A commitment to get outside help',
  'Practical safety',
  'Transparency',
  'To not be responsible for my emotions',
  'Other',
];

const NEXT_ACTION = [
  'Stop arguing and give her space',
  'Write down the factual truth before speaking further',
  'Contact my counselor/mentor/sponsor',
  'Begin the free AI Coach check-in',
  'Schedule an intake',
  'Remove access to the acting-out pathway',
  'Avoid contact with the other person',
  'Sleep somewhere else if needed for safety/stability',
  'Not ask for forgiveness today',
  'Not demand a decision from her today',
  'Other',
];

const DEFAULT_STATEMENT =
  'I know I have hurt you. I am not going to pressure you to calm down or forgive me. I am going to stop explaining and take responsibility for getting help. I will give you space, and I will not ask you to carry my emotions right now.';

type Phase = 'landing' | 'guardrails' | 'questions' | 'complete';

const PROTOCOL_URL = 'https://integrity.scifsi.com/';

const CrisisCheck: React.FC<Props> = ({ onSwitchToOriginal }) => {
  const [phase, setPhase] = useState<Phase>('landing');
  const [qStep, setQStep] = useState(0);
  const [data, setData] = useState<CrisisData>({
    whatHappened: [],
    honestDescription: '',
    tempted: [],
    partnerNeeds: [],
    nextAction: [],
    statement: DEFAULT_STATEMENT,
  });

  const go = (p: Phase) => {
    setPhase(p);
    window.scrollTo(0, 0);
  };

  const toggle = (field: keyof CrisisData, value: string) => {
    setData(prev => {
      const arr = prev[field] as string[];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [field]: next };
    });
  };

  const goNext = () => {
    if (qStep < 4) {
      setQStep(qStep + 1);
      window.scrollTo(0, 0);
    } else {
      go('complete');
    }
  };

  const goBack = () => {
    if (qStep > 0) {
      setQStep(qStep - 1);
      window.scrollTo(0, 0);
    } else {
      go('guardrails');
    }
  };

  const renderOptions = (field: keyof CrisisData, options: string[]) => (
    <div className="space-y-3">
      {options.map(opt => {
        const selected = (data[field] as string[]).includes(opt);
        return (
          <div
            key={opt}
            onClick={() => toggle(field, opt)}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors rounded-lg group cursor-pointer"
          >
            <div className={`h-5 w-5 flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-all ${selected ? 'bg-black border-black' : 'border-gray-300'}`}>
              {selected && <div className="h-2 w-2 bg-white rounded-full" />}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed group-hover:text-black">{opt}</p>
          </div>
        );
      })}
    </div>
  );

  const navButtons = (nextLabel: string) => (
    <div className="flex gap-4 pt-4">
      <button onClick={goBack} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Back</button>
      <button onClick={goNext} className="flex-[2] bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">{nextLabel}</button>
    </div>
  );

  const stepHeader = (part: string, title: string) => (
    <div className="space-y-2 border-b border-gray-100 pb-4">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{part}</span>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
    </div>
  );

  if (phase === 'landing') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            Caught Again? Start Here
          </h1>
          <p className="text-lg text-gray-600 font-light">The First 24 Hours Integrity Check</p>
        </div>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            You may feel panic, shame, anger, fear, or the urge to explain. This is not the moment
            to perform, defend, bargain, minimize, or make big promises.
          </p>
          <p>
            This check will help you slow down, tell the truth, and choose your next right step
            without making more damage.
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-600 p-4 text-sm text-gray-800 leading-relaxed">
          This is not emergency counseling. If anyone is unsafe, at risk of self-harm, being
          threatened, or in immediate danger, contact emergency support now.
        </div>

        <button
          onClick={() => go('guardrails')}
          className="w-full bg-black text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
        >
          Begin the Check
        </button>

        <button
          onClick={onSwitchToOriginal}
          className="block w-full text-center text-xs text-gray-400 hover:text-black underline tracking-wide pt-2"
        >
          Not in crisis? Take the original 5-Minute Integrity Check.
        </button>
      </div>
    );
  }

  if (phase === 'guardrails') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {stepHeader('Before You Begin', 'For the next 24 hours, do not:')}
        <ul className="space-y-3">
          {GUARDRAILS.map(g => (
            <li key={g} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 pt-4">
          <button onClick={() => go('landing')} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Back</button>
          <button onClick={() => { go('questions'); setQStep(0); }} className="flex-[2] bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">I understand. Continue.</button>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    const highRisk = hasHighRisk(data);
    const memo = getStabilizingMemo(data);
    return (
      <div className="space-y-10 animate-in fade-in duration-700">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            You completed the First 24 Hours Integrity Check.
          </h2>
          <div className="h-1 w-20 bg-black mx-auto" />
        </div>

        {highRisk && <CrisisResources />}

        <div className="bg-gray-50 border border-gray-200 p-8 rounded-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Clarity Memo</p>
          <div className="prose prose-sm text-gray-700 leading-relaxed font-serif italic text-lg">
            &ldquo;{memo}&rdquo;
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-center">
          <p>
            Your next step is not another promise. Your next step is structure. For the next 24
            hours, focus on truth, space, accountability, and not making the damage worse.
          </p>
        </div>

        {data.nextAction.length > 0 && (
          <div className="p-6 border border-gray-100 rounded-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Next Honest Action</h3>
            <ul className="space-y-2">
              {data.nextAction.map(a => (
                <li key={a} className="flex items-start gap-3 text-sm text-gray-800">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.statement.trim() && (
          <div className="p-6 border border-gray-100 rounded-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">What You Can Say Without Making It Worse</h3>
            <p className="text-sm text-gray-700 leading-relaxed italic">&ldquo;{data.statement.trim()}&rdquo;</p>
          </div>
        )}

        <div className="space-y-3">
          <a
            href={PROTOCOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-black text-white text-center py-5 font-bold text-lg tracking-widest uppercase hover:bg-gray-800 transition-all"
          >
            Continue with Free AI Coach
          </a>
          <a
            href={PROTOCOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-gray-300 text-gray-700 text-center py-4 font-medium text-sm tracking-widest uppercase hover:border-black hover:text-black transition-all"
          >
            Start Integrity Protocol
          </a>
        </div>

        <div className="text-center text-sm text-gray-500 italic border-t border-gray-100 pt-6 space-y-2">
          <p>&ldquo;The first faithful step is not to repair your image. It is to come into the light.&rdquo;</p>
          <p className="text-[10px] not-italic text-gray-400 uppercase tracking-widest">
            John 3:21 (KJV) — &ldquo;But he that doeth truth cometh to the light…&rdquo;
          </p>
        </div>

        <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.2em]">
          Strictly Confidential • No data persistent after session close
        </p>
      </div>
    );
  }

  // phase === 'questions'
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-2">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {qStep + 1} of 5</span>
        </div>
        <div className="w-full bg-gray-100 h-1 rounded-full">
          <div className="bg-black h-1 rounded-full transition-all duration-500" style={{ width: `${((qStep + 1) / 5) * 100}%` }} />
        </div>
      </div>

      {qStep === 0 && (
        <>
          {stepHeader('Part I', 'What Just Happened?')}
          <p className="text-sm text-gray-600">What were you caught doing, or what did you disclose?</p>
          {renderOptions('whatHappened', WHAT_HAPPENED)}
          <div className="space-y-2 pt-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              What is the most honest one-sentence description of what happened?
            </label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-black outline-none h-20 text-sm"
              value={data.honestDescription}
              onChange={(e) => setData(prev => ({ ...prev, honestDescription: e.target.value }))}
              placeholder="Keep it factual. No spin, no defense."
            />
          </div>
          {navButtons('Continue')}
        </>
      )}

      {qStep === 1 && (
        <>
          {stepHeader('Part II', 'What Are You Tempted To Do Right Now?')}
          <p className="text-sm text-gray-600">What are you most tempted to do right now?</p>
          {renderOptions('tempted', TEMPTED)}
          {hasHighRisk(data) && (
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-600 p-4 text-sm text-gray-800 leading-relaxed">
                Your safety matters more than finishing this check. If you may harm yourself or
                someone else, or if anyone is in immediate danger, contact emergency services or a
                crisis line now. Do not stay alone with this.
              </div>
              <CrisisResources />
            </div>
          )}
          {navButtons('Continue')}
        </>
      )}

      {qStep === 2 && (
        <>
          {stepHeader('Part III', 'What Might She Need From You Right Now?')}
          <p className="text-sm text-gray-600">What might your spouse/partner need most from you in the next 24 hours?</p>
          {renderOptions('partnerNeeds', PARTNER_NEEDS)}
          {navButtons('Continue')}
        </>
      )}

      {qStep === 3 && (
        <>
          {stepHeader('Part IV', 'What Is Your Next Honest Action?')}
          <p className="text-sm text-gray-600">In the next 24 hours, I will:</p>
          {renderOptions('nextAction', NEXT_ACTION)}
          {navButtons('Continue')}
        </>
      )}

      {qStep === 4 && (
        <>
          {stepHeader('Part V', 'What Can You Say Without Making It Worse?')}
          <p className="text-sm text-gray-600">
            Here is something you can say. Edit it so it is true for you — or leave it as is.
          </p>
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-black outline-none h-40 text-sm leading-relaxed"
            value={data.statement}
            onChange={(e) => setData(prev => ({ ...prev, statement: e.target.value }))}
          />
          {navButtons('Complete the Check')}
        </>
      )}
    </div>
  );
};

export default CrisisCheck;
