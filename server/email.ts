import nodemailer from 'nodemailer';
import type { AssessmentData } from '../types.js';
import { buildResultsEmailHtml } from '../services/resultsEmail.js';

function getTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { ciphers: 'SSLv3' },
  });
}

export async function sendResultsEmail(
  email: string,
  firstName: string,
  data: AssessmentData,
  clarityMemo: string,
): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Dr. Ken Taylor" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your 5-Minute Integrity Check Results',
    html: buildResultsEmailHtml(firstName, data, clarityMemo),
  });
}
