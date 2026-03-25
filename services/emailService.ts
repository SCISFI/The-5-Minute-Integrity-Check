import { AssessmentData } from '../types';

const post = async (payload: object): Promise<void> => {
  const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('VITE_EMAIL_WEBHOOK_URL is not configured.');
    return;
  }
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const captureEmail = async (email: string, firstName: string): Promise<void> => {
  try {
    await post({
      event: 'lead_captured',
      email,
      firstName,
      timestamp: new Date().toISOString(),
      source: '5-minute-integrity-check',
    });
  } catch (err) {
    console.error('Email capture failed:', err);
  }
};

export const sendCompletionData = async (
  email: string,
  firstName: string,
  data: AssessmentData,
  clarityMemo: string,
): Promise<void> => {
  const copingCount = data.patterns.filter(Boolean).length;

  const vulnerabilityVectors = (Object.entries(data.audit) as [string, number][])
    .filter(([_, v]) => v >= 0 && v <= 2)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()));

  const segment =
    copingCount >= 6 ? 'high-risk' :
    copingCount >= 3 ? 'moderate' :
    'low-risk';

  try {
    await post({
      event: 'assessment_completed',
      email,
      firstName,
      timestamp: new Date().toISOString(),
      source: '5-minute-integrity-check',
      segment,
      assessment: {
        copingIndicators: copingCount,
        copingIndicatorsOutOf: data.patterns.length,
        auditScores: data.audit,
        vulnerabilityVectors,
        primaryVulnerability: vulnerabilityVectors[0] ?? null,
        pivot: data.pivot,
      },
      clarityMemo,
    });
  } catch (err) {
    console.error('Completion data send failed:', err);
  }
};

export const requestResultsEmail = async (
  email: string,
  firstName: string,
  data: AssessmentData,
  clarityMemo: string,
): Promise<void> => {
  const copingCount = data.patterns.filter(Boolean).length;

  const vulnerabilityVectors = (Object.entries(data.audit) as [string, number][])
    .filter(([_, v]) => v >= 0 && v <= 2)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()));

  try {
    await post({
      event: 'results_email_requested',
      email,
      firstName,
      timestamp: new Date().toISOString(),
      source: '5-minute-integrity-check',
      assessment: {
        copingIndicators: copingCount,
        copingIndicatorsOutOf: data.patterns.length,
        primaryVulnerability: vulnerabilityVectors[0] ?? null,
        vulnerabilityVectors,
      },
      clarityMemo,
    });
  } catch (err) {
    console.error('Results email request failed:', err);
  }
};
