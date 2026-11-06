import React from 'react';
import { halPlittCallout } from '../services/halPlittCallout';

const linkClass =
  'text-quiet underline underline-offset-4 decoration-[#cfc6ba] hover:text-ink hover:decoration-ink transition-colors';

const HalPlittCallout: React.FC = () => {
  const copy = halPlittCallout;

  return (
    <section
      aria-label="One-on-one counseling or coaching with Hal Plitt"
      className="border border-gray-200 bg-gray-50 rounded-lg px-5 py-5 text-left space-y-3"
    >
      <h3 className="text-[15px] font-semibold tracking-tight text-ink">{copy.headline}</h3>
      <p className="text-sm leading-relaxed text-body">{copy.lead}</p>
      <p className="text-[13px] leading-relaxed text-quiet">{copy.body}</p>
      <p className="text-sm leading-relaxed text-body">{copy.spouses}</p>
      <p className="text-xs leading-relaxed text-quiet">{copy.supervision}</p>
      <ul className="space-y-1.5 pt-1 text-sm">
        <li>
          <a href={copy.about.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {copy.about.label}
          </a>
        </li>
        <li>
          <a href={copy.phone.href} className={linkClass}>
            {copy.phone.label}
          </a>
        </li>
        <li>
          <a href={copy.email.href} className={linkClass}>
            {copy.email.label}
          </a>
        </li>
      </ul>
    </section>
  );
};

export default HalPlittCallout;
