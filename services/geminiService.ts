import { AssessmentData } from "../types";

const fmt = (key: string): string =>
  key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, s => s.toUpperCase());

function deterministic(data: AssessmentData): string {
  const yesCount = data.patterns.filter(p => p).length;
  const lowScores = (Object.entries(data.audit) as [string, number][])
    .filter(([_, v]) => v >= 0 && v <= 2).map(([k]) => fmt(k));
  const primary = lowScores[0] ?? null;
  const secondary = lowScores[1] ?? null;

  const intensityLine = yesCount >= 6
    ? `At ${yesCount} of 8 indicators, this pattern is deeply integrated — efficient, private, and structurally embedded in your daily life.`
    : yesCount >= 3
    ? `At ${yesCount} of 8 indicators, a clear behavioral pattern has formed. Its effectiveness is precisely what makes it invisible.`
    : `At ${yesCount} of 8 indicators, early-stage patterns are present. Recognizing this now is a significant structural advantage.`;

  const vectorLine = primary && secondary
    ? `Your two primary vulnerability vectors — ${primary} and ${secondary} — represent the relational deficits this behavior is engineered to fill.`
    : primary
    ? `Your primary vulnerability — ${primary} — is the structural gap where behavior substitutes for connection.`
    : `No single dominant vector emerged, suggesting the pattern operates across multiple relational domains.`;

  const pivotLine = data.pivot.cost && data.pivot.change
    ? `You named the cost as "${data.pivot.cost}" and identified that "${data.pivot.change}" changes first. That specificity is actionable.`
    : data.pivot.cost
    ? `You have already named the cost: "${data.pivot.cost}." That clarity is the first structural intervention.`
    : `The cost is already visible in your data. The next step is building structure around that awareness.`;

  return `${intensityLine} This is not a character defect — it is a precision coping mechanism deployed by a high-functioning professional under sustained pressure. ${vectorLine} ${pivotLine} Motivation will not hold. Structure will.`;
}

export const getClarityInsight = async (data: AssessmentData): Promise<string> => {
  try {
    const response = await fetch('/api/clarity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) throw new Error('API unavailable');
    const result = await response.json();
    return result.memo || deterministic(data);
  } catch {
    return deterministic(data);
  }
};
