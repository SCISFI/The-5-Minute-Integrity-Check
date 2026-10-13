import { Resend } from 'resend';
import type { AssessmentData } from '../types';
import { buildResultsEmailHtml } from '../services/resultsEmail';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { email, firstName, data, clarityMemo } = req.body;
    if (!email || !data) return res.status(400).json({ error: 'Missing required fields' });
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: emailData, error } = await resend.emails.send({
      from: 'Dr. Ken Taylor <ken@scifsi.com>',
      to: email,
      subject: 'Your 5-Minute Integrity Check Results',
      html: buildResultsEmailHtml(firstName || '', data as AssessmentData, clarityMemo || ''),
    });
    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return res.status(500).json({ error: 'Failed to send email' });
    }
    return res.json({ success: true, id: emailData?.id });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
