import { Resend } from 'resend';

interface AssessmentData {
    patterns: boolean[];
    audit: Record<string, number>;
    pivot: { cost: string; risk: string; change: string };
}

function fmt(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

function buildHTML(firstName: string, data: AssessmentData, clarityMemo: string): string {
    const copingCount = data.patterns.filter(Boolean).length;
    const vectors = (Object.entries(data.audit) as [string, number][])
      .filter(([_, v]) => v >= 0 && v <= 2).map(([k]) => fmt(k));
    const primaryVector = vectors[0] ?? 'None Detected';

  const auditRows = (Object.entries(data.audit) as [string, number][])
      .map(([key, val]) => `<tr><td style="padding:10px 16px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #f3f4f6;">${fmt(key)}</td><td style="padding:10px 16px;text-align:right;font-weight:700;font-size:14px;color:${val <= 2 && val >= 0 ? '#dc2626' : '#111827'};border-bottom:1px solid #f3f4f6;">${val === -1 ? '&mdash;' : val + ' / 5'}</td></tr>`).join('');

  const pivotRows = [
        ['What it costs', data.pivot.cost],
        ['What it risks', data.pivot.risk],
        ['What changes first', data.pivot.change],
      ].map(([label, value]) => `<tr><td style="padding:8px 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;width:45%;">${label}</td><td style="padding:8px 0;font-size:14px;color:#111827;font-weight:600;">${value || '&mdash;'}</td></tr>`).join('');

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,sans-serif;color:#111827;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;"><tr><td align="center" style="padding:40px 16px;"><table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;"><tr><td style="background-color:#111827;padding:36px 40px;text-align:center;border-radius:4px 4px 0 0;"><p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;">SC &mdash; IFSI</p><h1 style="margin:0 0 8px 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">The 5-Minute Integrity Check</h1><p style="margin:0;font-size:11px;color:#4b5563;letter-spacing:0.12em;text-transform:uppercase;">Private Assessment Results</p></td></tr><tr><td style="background-color:#ffffff;border:1px solid #e5e7eb;border-top:none;padding:40px;"><p style="margin:0 0 32px 0;font-size:16px;color:#374151;">${firstName},</p><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;"><tr><td style="background-color:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #111827;padding:24px;"><p style="margin:0 0 12px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Clarity Memo</p><p style="margin:0;font-size:15px;line-height:1.85;color:#374151;font-style:italic;">&ldquo;${clarityMemo}&rdquo;</p></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;border:1px solid #e5e7eb;"><tr><td width="50%" style="padding:20px 24px;border-right:1px solid #e5e7eb;vertical-align:top;"><p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Coping Indicators</p><p style="margin:0;font-size:30px;font-weight:700;color:#111827;line-height:1;">${copingCount} <span style="font-size:16px;color:#9ca3af;">/ 8</span></p><p style="margin:6px 0 0 0;font-size:11px;color:#9ca3af;">Signs of behavioral regulation</p></td><td width="50%" style="padding:20px 24px;vertical-align:top;"><p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Primary Vulnerability</p><p style="margin:0;font-size:14px;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:0.05em;">${primaryVector}</p><p style="margin:6px 0 0 0;font-size:11px;color:#9ca3af;">Vector of emotional isolation</p></td></tr></table><p style="margin:0 0 10px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Loneliness Audit</p><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;margin-bottom:32px;">${auditRows}</table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9fafb;border:1px solid #e5e7eb;margin-bottom:36px;"><tr><td style="padding:20px 24px;"><p style="margin:0 0 14px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Pivot Reflection</p><table width="100%" cellpadding="0" cellspacing="0" border="0">${pivotRows}</table></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#111827;padding:36px;text-align:center;"><p style="margin:0 0 6px 0;font-size:18px;font-weight:700;color:#ffffff;">You don&rsquo;t need motivation.</p><p style="margin:0 0 24px 0;font-size:15px;color:#6b7280;">You need structure.</p><a href="https://integrity.scifsi.com/" style="display:inline-block;background-color:#ffffff;color:#111827;padding:14px 36px;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Enter the Protocol &rarr;</a></td></tr></table></td></tr><tr><td style="padding:24px;text-align:center;"><p style="margin:0 0 4px 0;font-size:11px;color:#9ca3af;letter-spacing:0.1em;text-transform:uppercase;">Strictly Confidential</p><p style="margin:0;font-size:11px;color:#9ca3af;">SC-IFSI &bull; Institute for Sexual Integrity LLC</p></td></tr></table></td></tr></table></body></html>`;
}

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
  html: buildHTML(firstName || 'there', data, clarityMemo || ''),
});
if (error) {
  console.error('Resend error:', JSON.stringify(error));
  return res.status(500).json({ error: error.message });
}
return res.json({ success: true, id: emailData?.id });
    } catch (error) {
          console.error('Email error:', error);
          return res.status(500).json({ error: 'Failed to send email' });
    }
}
