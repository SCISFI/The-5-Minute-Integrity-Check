import type { AssessmentData } from "../types.js";
import { buildProtocolHandoff, handoffParagraphs } from "./protocolHandoff.js";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmt(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

export function buildResultsEmailHtml(
  firstName: string,
  data: AssessmentData,
  clarityMemo: string,
): string {
  const handoff = buildProtocolHandoff(data);
  const name = escapeHtml(firstName.trim() || "there");
  const memo = escapeHtml(clarityMemo || "");
  const primary = escapeHtml(handoff.primaryLabel);
  const primaryDetail =
    handoff.primaryScore === null ? "No area at 2 or below" : `Rated ${handoff.primaryScore} of 5`;

  const auditRows = (Object.entries(data.audit) as [string, number][])
    .map(([key, val]) => {
      const low = val <= 2 && val >= 0;
      return `<tr>
        <td style="padding:10px 16px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #f3f4f6;">${escapeHtml(fmt(key))}</td>
        <td style="padding:10px 16px;text-align:right;font-weight:700;font-size:14px;color:${low ? "#dc2626" : "#111827"};border-bottom:1px solid #f3f4f6;">${val === -1 ? "&mdash;" : `${val} / 5`}</td>
      </tr>`;
    })
    .join("");

  const pivotRows = [
    ["What it costs", data.pivot.cost],
    ["What it risks", data.pivot.risk],
    ["What changes first", data.pivot.change],
  ]
    .map(
      ([label, value]) => `<tr>
        <td style="padding:8px 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;width:45%;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;font-weight:600;">${value ? escapeHtml(value) : "&mdash;"}</td>
      </tr>`,
    )
    .join("");

  const personal = handoffParagraphs(handoff)
    .map(
      (line) =>
        `<p style="margin:0 0 14px 0;font-size:14px;line-height:1.7;color:#374151;">${escapeHtml(line)}</p>`,
    )
    .join("");

  const href = escapeHtml(handoff.signupUrl);
  const button = escapeHtml(handoff.buttonLabel);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr><td style="background-color:#111827;padding:36px 40px;text-align:center;border-radius:4px 4px 0 0;">
          <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;">SC &mdash; IFSI</p>
          <h1 style="margin:0 0 8px 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">The 5-Minute Integrity Check</h1>
          <p style="margin:0;font-size:11px;color:#4b5563;letter-spacing:0.12em;text-transform:uppercase;">Private Assessment Results</p>
        </td></tr>
        <tr><td style="background-color:#ffffff;border:1px solid #e5e7eb;border-top:none;padding:40px;">
          <p style="margin:0 0 32px 0;font-size:16px;color:#374151;">${name},</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
            <tr><td style="background-color:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #111827;padding:24px;">
              <p style="margin:0 0 12px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Clarity Memo</p>
              <p style="margin:0;font-size:15px;line-height:1.85;color:#374151;font-style:italic;">&ldquo;${memo}&rdquo;</p>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;border:1px solid #e5e7eb;">
            <tr>
              <td width="50%" style="padding:20px 24px;border-right:1px solid #e5e7eb;vertical-align:top;">
                <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Coping Indicators</p>
                <p style="margin:0;font-size:30px;font-weight:700;color:#111827;line-height:1;">${handoff.patternCount} <span style="font-size:16px;color:#9ca3af;">/ 8</span></p>
                <p style="margin:6px 0 0 0;font-size:11px;color:#9ca3af;">Signs of behavioral regulation</p>
              </td>
              <td width="50%" style="padding:20px 24px;vertical-align:top;">
                <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Lowest loneliness area</p>
                <p style="margin:0;font-size:14px;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:0.05em;">${primary}</p>
                <p style="margin:6px 0 0 0;font-size:11px;color:#9ca3af;">${escapeHtml(primaryDetail)}</p>
              </td>
            </tr>
          </table>
          <p style="margin:0 0 10px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Loneliness Audit</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;margin-bottom:32px;">
            ${auditRows}
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9fafb;border:1px solid #e5e7eb;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 14px 0;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;">Pivot Reflection</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${pivotRows}
              </table>
            </td></tr>
          </table>
          ${personal}
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="background-color:#111827;padding:36px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:18px;font-weight:700;color:#ffffff;">You don&rsquo;t need motivation.</p>
              <p style="margin:0 0 8px 0;font-size:15px;color:#9ca3af;">You need structure.</p>
              <p style="margin:0 0 24px 0;font-size:14px;color:#ffffff;">${escapeHtml(handoff.offerLine)}</p>
              <a href="${href}" style="display:inline-block;background-color:#ffffff;color:#111827;padding:14px 36px;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">${button} &rarr;</a>
              <p style="margin:16px 0 0 0;font-size:12px;color:#9ca3af;">${escapeHtml(handoff.priceLine)} You can change the program before you create the account.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px;text-align:center;">
          <p style="margin:0 0 4px 0;font-size:11px;color:#9ca3af;letter-spacing:0.1em;text-transform:uppercase;">Sent only to you</p>
          <p style="margin:0;font-size:11px;color:#9ca3af;">SC-IFSI &bull; Institute for Sexual Integrity LLC</p>
          <p style="margin:8px 0 0 0;font-size:11px;color:#9ca3af;">Questions: <a href="mailto:support@scifsi.com" style="color:#6b7280;">support@scifsi.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
