import { AssessmentData } from "../types";

const formatKey = (key: string): string =>
  key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, s => s.toUpperCase());

export const getClarityInsight = async (data: AssessmentData): Promise<string> => {
  const yesCount = data.patterns.filter(p => p).length;
  const lowScores = (Object.entries(data.audit) as [string, number][])
    .filter(([_, v]) => v >= 0 && v <= 2)
    .map(([k]) => formatKey(k));

  const primaryVector = lowScores[0] ?? null;
  const secondaryVector = lowScores[1] ?? null;

  let intensityLine: string;
  if (yesCount >= 6) {
    intensityLine = `At ${yesCount} of 8 indicators, this pattern is deeply integrated — efficient, private, and structurally embedded in your daily life.`;
  } else if (yesCount >= 3) {
    intensityLine = `At ${yesCount} of 8 indicators, a clear behavioral pattern has formed. Its effectiveness is precisely what makes it invisible.`;
  } else {
    intensityLine = `At ${yesCount} of 8 indicators, early-stage patterns are present. Recognizing this now is a significant structural advantage.`;
  }

  let vectorLine: string;
  if (primaryVector && secondaryVector) {
    vectorLine = `Your two primary vulnerability vectors — ${primaryVector} and ${secondaryVector} — represent the relational deficits this behavior is engineered to fill.`;
  } else if (primaryVector) {
    vectorLine = `Your primary vulnerability — ${primaryVector} — is the structural gap where behavior substitutes for connection.`;
  } else {
    vectorLine = `No single dominant vector emerged, suggesting the pattern operates across multiple relational domains simultaneously.`;
  }

  let pivotLine: string;
  if (data.pivot.cost && data.pivot.change) {
    pivotLine = `You named the cost as "${data.pivot.cost}" and identified that "${data.pivot.change}" changes first. That specificity is rare — and it is actionable.`;
  } else if (data.pivot.cost) {
    pivotLine = `You have already named the cost: "${data.pivot.cost}." That clarity is the first structural intervention.`;
  } else {
    pivotLine = `The cost is already visible in your data. The next step is building structure around that awareness.`;
  }

  return `${intensityLine} This is not a character defect — it is a precision coping mechanism deployed by a high-functioning professional under sustained pressure. ${vectorLine} ${pivotLine} Motivation will not hold. Structure will.`;
};
