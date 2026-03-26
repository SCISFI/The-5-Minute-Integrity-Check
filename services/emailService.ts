import { AssessmentData } from '../types';

export const buildMailtoLink = (
  email: string,
  firstName: string,
  data: AssessmentData,
  clarityMemo: string,
): string => {
  const copingCount = data.patterns.filter(Boolean).length;

  const vulnerabilityVectors = (Object.entries(data.audit) as [string, number][])
    .filter(([_, v]) => v >= 0 && v <= 2)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()));

  const subject = `Your 5-Minute Integrity Check Results`;

  const body = [
    `${firstName},`,
    ``,
    `Here are your results from The 5-Minute Integrity Check.`,
    ``,
    `--- CLARITY MEMO ---`,
    clarityMemo,
    ``,
    `--- ASSESSMENT SUMMARY ---`,
    `Coping Indicators: ${copingCount} / ${data.patterns.length}`,
    `Primary Vulnerability: ${vulnerabilityVectors[0] ?? 'None Detected'}`,
    vulnerabilityVectors.length > 1 ? `All Vulnerability Vectors: ${vulnerabilityVectors.join(', ')}` : '',
    ``,
    `--- PIVOT REFLECTION ---`,
    `What it costs: ${data.pivot.cost || '(not answered)'}`,
    `What it risks: ${data.pivot.risk || '(not answered)'}`,
    `What changes first: ${data.pivot.change || '(not answered)'}`,
    ``,
    `--- NEXT STEP ---`,
    `You don't need motivation. You need structure.`,
    `Enter the Integrity Protocol: https://integrity.scifsi.com/`,
    ``,
    `Strictly Confidential`,
  ].filter(line => line !== '').join('\n');

  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
