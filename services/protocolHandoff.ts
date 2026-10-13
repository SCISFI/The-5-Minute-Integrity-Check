import { AssessmentData } from "../types";

/**
 * Handoff copy for Integrity Protocol.
 * Names, week titles, the 30-day trial, and the $19.95 price match the live
 * product at integrity.scifsi.com (registration page and curriculum).
 * The signup page reads ?track= only. It does not read email or name.
 */

const SIGNUP_PATH = "https://integrity.scifsi.com/register/client";

export const OFFER_LINE = "The first 30 days are free. No credit card to start.";
export const PRICE_AFTER_TRIAL = "$19.95 a month";

export type TrackKey = "core_adult" | "married_betrayal" | "partner_protocol";

const AUDIT_ORDER = [
  "relationalExposure",
  "emotionalLiteracy",
  "maleBonding",
  "accountabilityDensity",
] as const;

type AuditKey = (typeof AUDIT_ORDER)[number];

const AUDIT_LABELS: Record<AuditKey, string> = {
  relationalExposure: "Relational Exposure",
  emotionalLiteracy: "Emotional Literacy",
  maleBonding: "Male Bonding",
  accountabilityDensity: "Accountability Density",
};

export interface LowArea {
  key: AuditKey;
  label: string;
  score: number;
  tie: string;
}

export interface ProtocolHandoff {
  patternCount: number;
  lowAreas: LowArea[];
  primaryLabel: string;
  primaryScore: number | null;
  track: TrackKey;
  trackName: string;
  signupUrl: string;
  patternLine: string;
  steadyLine: string | null;
  pivotLine: string | null;
  trackSummary: string;
  offerLine: string;
  priceLine: string;
  buttonLabel: string;
}

const TRACK_NAMES: Record<TrackKey, string> = {
  core_adult: "Core Adult Protocol",
  married_betrayal: "Married Betrayal Protocol",
  partner_protocol: "The Partner Protocol",
};

function clip(value: string, max = 110): string {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const cut = cleaned.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 60 ? cut.slice(0, lastSpace) : cut;
  return `${base}…`;
}

function classifyTrack(pivot: AssessmentData["pivot"]): TrackKey {
  const text = `${pivot.cost} ${pivot.risk} ${pivot.change}`;
  if (/\b(my husband|i am his wife|i'm his wife|im his wife|i am the wife|i'm the wife|he betrayed me)\b/i.test(text)) {
    return "partner_protocol";
  }
  const married =
    /\b(my wife|my spouse|(?:my|our|the) marriage|betrayed her)\b/i.test(text) ||
    (/\b(i am married|i'm married)\b/i.test(text) && !/\bnot married\b/i.test(text));
  if (married) return "married_betrayal";
  return "core_adult";
}

function tieFor(key: AuditKey, track: TrackKey): string {
  if (track === "partner_protocol") {
    const partner: Record<AuditKey, string> = {
      relationalExposure:
        "Week 1 is You Have Been Carrying This Alone. A mentor reads what you write, so it does not stay only with you.",
      emotionalLiteracy:
        "Your check-in asks what showed up in your body or inner world today, including whether the weight felt heavy or whether something felt clearer.",
      maleBonding:
        "This is not a men's group, and it is not another plan for him. It is your own weekly work, and a mentor reads it.",
      accountabilityDensity:
        "Week 2 is What He Has to Do (And What You Shouldn't Have To). Missed days stay visible, and a mentor answers, usually within one to two business days.",
    };
    return partner[key];
  }

  if (track === "married_betrayal") {
    const married: Record<AuditKey, string> = {
      relationalExposure:
        "Week 1, The Truth You Can No Longer Hide, starts with the impact and with honesty, not with looking composed. A mentor reads what you submit.",
      emotionalLiteracy:
        "The daily check-in asks for your highest urge, your lowest mood, your sleep, and whether you were honest. Week 4, Nervous System Skills for Relational Damage Control, is about regulating defensiveness and shutdown so conflict does not do more harm.",
      maleBonding:
        "This track does not add a men's group. You choose a mentor who reads every check-in, and the weeks stay aimed at the marriage.",
      accountabilityDensity:
        "Missed days stay visible. Your mentor reads the work and answers, usually within one to two business days. Week 3, Entitlement, Minimization, and Self-Deception, replaces the story that delays repair.",
    };
    return married[key];
  }

  const core: Record<AuditKey, string> = {
    relationalExposure:
      "Week 1 includes a Connection Inventory: who knows, who you are hiding this from, and what would let one person in. The mentor you choose reads what you submit.",
    emotionalLiteracy:
      "The daily check-in asks for your highest urge, your lowest mood, your sleep, whether you were honest, and whether you had a real connection. Week 4, When the Urge Hits, works on the feeling under the urge and the pause before you act.",
    maleBonding:
      "There is no men's group inside the Protocol. There is a mentor you choose, who reads every check-in, and Week 6, The People You've Been Living Around.",
    accountabilityDensity:
      "Missed days stay visible. Your mentor reads the check-ins and the weekly work and answers, usually within one to two business days. Week 7 is What Needs to Be Said.",
  };
  return core[key];
}

function patternLine(count: number, track: TrackKey): string {
  const countSentence =
    count >= 6
      ? `You marked ${count} of 8 coping patterns. That is a system with a job, not a lapse in discipline.`
      : count >= 3
        ? `You marked ${count} of 8 coping patterns. The shape is already there.`
        : `You marked ${count} of 8 coping patterns. It is early, which is an advantage if you put structure under it now.`;

  const start =
    track === "married_betrayal"
      ? "Married Betrayal Protocol starts with Week 1, The Truth You Can No Longer Hide. Repair starts with honesty and the real impact, not with managing how it looks. The daily check-in starts the same day."
      : track === "partner_protocol"
        ? "The Partner Protocol starts with Week 1, You Have Been Carrying This Alone. The work is yours. A mentor reads it."
        : "Core Adult Protocol starts with Week 1, Understanding Your Pattern and Taking the First Step: your reason for change, one early signal, and one action for this week. The daily check-in starts the same day.";

  return `${countSentence} ${start}`;
}

function steadyLine(track: TrackKey): string {
  if (track === "partner_protocol") {
    return "No loneliness area is at 2 or below. Your check-in still asks what showed up in your body or inner world today, so the day does not stay unnamed.";
  }
  return "No loneliness area is at 2 or below. The daily check-in still asks you to name the day honestly, including sleep, honesty, and whether you had a real connection. That is the layer this pattern uses when life looks fine.";
}

function trackSummary(track: TrackKey): string {
  if (track === "married_betrayal") {
    return "It is not therapy. It is 16 weeks for a married man whose behavior has hurt his wife: recovery and repair as one piece of work, with a mentor reading what you submit. You do not skip ahead.";
  }
  if (track === "partner_protocol") {
    return "It is not therapy. It is 12 weeks for the wife or partner, on her own ground, with a mentor reviewing the work. It is not another plan for him.";
  }
  return "It is not therapy. It is 16 weeks: one lesson, the work that goes with it, a daily check-in, and a mentor who reads what you turn in. You do not skip ahead.";
}

function pivotLine(pivot: AssessmentData["pivot"], track: TrackKey): string | null {
  const cost = clip(pivot.cost);
  const risk = clip(pivot.risk);
  const change = clip(pivot.change);
  const parts: string[] = [];

  if (cost) parts.push(`You named the cost as “${cost}.”`);
  if (risk) parts.push(`You named the risk as “${risk}.”`);
  if (change) {
    parts.push(
      `You said the first change is “${change}.” The daily check-in is where that gets logged, and a mentor reads it.`,
    );
  } else if (cost || risk) {
    parts.push("Week 1 starts from what you already wrote, not from a generic plan.");
  }

  if (parts.length === 0) return null;

  if (track === "married_betrayal") {
    parts.push("A marriage is in what you wrote, so the button opens Married Betrayal Protocol.");
  } else if (track === "partner_protocol") {
    parts.push("You wrote from the partner's side, so the button opens The Partner Protocol.");
  }

  return parts.join(" ");
}

export function signupUrlFor(track: TrackKey): string {
  const url = new URL(SIGNUP_PATH);
  url.searchParams.set("track", track);
  return url.toString();
}

export function buildProtocolHandoff(data: AssessmentData): ProtocolHandoff {
  const track = classifyTrack(data.pivot);
  const trackName = TRACK_NAMES[track];
  const lowAreas: LowArea[] = AUDIT_ORDER
    .map((key) => ({
      key,
      label: AUDIT_LABELS[key],
      score: data.audit[key],
      tie: tieFor(key, track),
    }))
    .filter((area) => area.score >= 0 && area.score <= 2)
    .sort((a, b) => a.score - b.score || AUDIT_ORDER.indexOf(a.key) - AUDIT_ORDER.indexOf(b.key));

  const primary = lowAreas[0] ?? null;

  return {
    patternCount: data.patterns.filter(Boolean).length,
    lowAreas,
    primaryLabel: primary ? primary.label : "None at 2 or below",
    primaryScore: primary ? primary.score : null,
    track,
    trackName,
    signupUrl: signupUrlFor(track),
    patternLine: patternLine(data.patterns.filter(Boolean).length, track),
    steadyLine: primary ? null : steadyLine(track),
    pivotLine: pivotLine(data.pivot, track),
    trackSummary: trackSummary(track),
    offerLine: OFFER_LINE,
    priceLine: `After that, ${trackName} is ${PRICE_AFTER_TRIAL}.`,
    buttonLabel: `Start ${trackName}`,
  };
}

export function handoffParagraphs(handoff: ProtocolHandoff): string[] {
  const lines = [handoff.patternLine];
  if (handoff.steadyLine) lines.push(handoff.steadyLine);
  for (const area of handoff.lowAreas.slice(0, 2)) {
    lines.push(`${area.label}, rated ${area.score} of 5. ${area.tie}`);
  }
  if (handoff.lowAreas.length > 2) {
    const rest = handoff.lowAreas
      .slice(2)
      .map((area) => `${area.label} (${area.score} of 5)`)
      .join(", ");
    lines.push(`Also low: ${rest}.`);
  }
  if (handoff.pivotLine) lines.push(handoff.pivotLine);
  lines.push(handoff.trackSummary);
  lines.push(handoff.offerLine);
  lines.push(handoff.priceLine);
  return lines;
}
