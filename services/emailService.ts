import { AssessmentData } from '../types';

export const sendResultsEmail = async (
  email: string,
  firstName: string,
  data: AssessmentData,
  clarityMemo: string,
): Promise<void> => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, firstName, data, clarityMemo }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to send email');
  }
};
