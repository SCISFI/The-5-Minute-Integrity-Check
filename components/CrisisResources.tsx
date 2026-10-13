import React from 'react';

const CrisisResources: React.FC = () => (
  <div className="bg-red-50 border-2 border-red-600 p-6 rounded-sm space-y-3">
    <p className="text-xs font-bold text-red-700 uppercase tracking-widest">If You Are In Danger</p>
    <p className="text-sm text-gray-800 leading-relaxed">
      Your safety matters more than finishing this check. If you may harm yourself or
      someone else, or if anyone is in immediate danger, reach a real person right now.
      Do not stay alone with this.
    </p>
    <ul className="text-sm text-gray-800 space-y-2">
      <li><span className="font-bold">Call or text 988</span> — Suicide &amp; Crisis Lifeline (US &amp; Canada)</li>
      <li><span className="font-bold">Text HOME to 741741</span> — Crisis Text Line</li>
      <li><span className="font-bold">Call 911</span> or your local emergency number for immediate danger</li>
      <li>Outside the US &amp; Canada: contact your local emergency number or a local crisis line.</li>
    </ul>
  </div>
);

export default CrisisResources;
