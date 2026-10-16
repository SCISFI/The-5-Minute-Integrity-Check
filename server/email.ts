import nodemailer from 'nodemailer';
import type { AssessmentData } from '../types.js';
import { buildResultsEmailHtml } from '../services/resultsEmail.js';

function getTransporter() {
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { ciphers: 'SSLv3' },
  });
}

function fromAddress(): string {
  if (process.env.SMTP_FROM) return process.env.SMTP_FROM;
  return `"Dr. Ken Taylor" <${process.env.SMTP_USER}>`;
}

export async function sendResultsEmail(
  email: string,
  firstName: string,
  data: AssessmentData,
  clarityMemo: string,
): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: fromAddress(),
    to: email,
    subject: 'Your 5-Minute Integrity Check Results',
    html: buildResultsEmailHtml(firstName, data, clarityMemo),
  });
}
