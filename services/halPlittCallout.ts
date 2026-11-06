/**
 * Secondary Hal Plitt intro-call copy.
 * Shown under the Integrity Protocol CTA on every results track.
 * The Protocol offer stays the primary conversion.
 */

export const halPlittCallout = {
  headline: "Want one-on-one counseling or coaching?",
  lead: "Need one-on-one PSB counseling? Schedule a free intro call with Hal Plitt, MA, LPCA, NCC.",
  body: "Immediate openings for adult men (18+) facing problematic sexual behavior and compulsive pornography use — in person in Lexington, SC (2472 Mineral Springs Rd) and by telehealth anywhere in South Carolina, including evening times. Coaching is also available for men who are out of state. Coaching is not covered by insurance.",
  spouses: "He also works with spouses.",
  supervision: "Practicing at SCIFSI under the clinical supervision of Dr. Ken Taylor, LPC-S, CSAT.",
  about: {
    label: "Read about Hal and his approach",
    href: "https://scifsi.com/blog/f/welcoming-hal-plitt-ma-lpca-ncc-one-on-one-psb-counseling-now",
  },
  phone: {
    label: "Call (803) 955-7627",
    href: "tel:8039557627",
  },
  email: {
    label: "Email support@scifsi.com",
    href: "mailto:support@scifsi.com?subject=Intro%20Call%20with%20Hal%20Plitt",
  },
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function emailLink(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" style="color:#4b5563;text-decoration:underline;">${escapeHtml(label)}</a>`;
}

/** Compact block for the self-sent results email, below the Protocol CTA. */
export function buildHalPlittCalloutHtml(): string {
  const copy = halPlittCallout;
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border:1px solid #e5e7eb;background-color:#f9fafb;">
            <tr><td style="padding:22px 24px;">
              <p style="margin:0 0 8px 0;font-size:15px;line-height:1.4;font-weight:700;color:#111827;">${escapeHtml(copy.headline)}</p>
              <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#374151;">${escapeHtml(copy.lead)}</p>
              <p style="margin:0 0 10px 0;font-size:13px;line-height:1.65;color:#4b5563;">${escapeHtml(copy.body)}</p>
              <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#374151;">${escapeHtml(copy.spouses)}</p>
              <p style="margin:0 0 14px 0;font-size:12px;line-height:1.6;color:#6b7280;">${escapeHtml(copy.supervision)}</p>
              <p style="margin:0 0 6px 0;font-size:13px;line-height:1.5;">${emailLink(copy.about.href, copy.about.label)}</p>
              <p style="margin:0 0 6px 0;font-size:13px;line-height:1.5;">${emailLink(copy.phone.href, copy.phone.label)}</p>
              <p style="margin:0;font-size:13px;line-height:1.5;">${emailLink(copy.email.href, copy.email.label)}</p>
            </td></tr>
          </table>`;
}
