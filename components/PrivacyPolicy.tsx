import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Privacy Policy · The 5-Minute Integrity Check';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <article className="space-y-8 text-sm text-gray-600 leading-relaxed">
      <div className="space-y-4">
        <a href="/" className="text-xs text-gray-400 hover:text-black underline tracking-wide">
          ← Back to the check
        </a>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Institute for Sexual Integrity (SCIFSI)
        </p>
        <p className="text-xs text-gray-400">Effective: October 2026</p>
      </div>

      <p>
        Taking an honest look at something this personal takes courage. We know that, and we take the trust you place in us seriously. This policy explains, in plain language, what this check collects, why, and the choices you have.
      </p>
      <p>
        This policy covers the <span className="font-semibold text-gray-900">5-Minute Integrity Check</span> at{' '}
        <a className="underline text-gray-900 hover:text-black" href="https://5minute.scifsi.com">5minute.scifsi.com</a> only.
        This app is the free entry point to Integrity Protocol. Integrity Protocol and our main website have their own policies, linked below.
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Who we are</h2>
        <p>
          Institute for Sexual Integrity LLC, doing business as the South Carolina Institute for Sexual Integrity (SCIFSI), is a counseling practice led by Ken Taylor, EdD, a Licensed Professional Counselor and Certified Sexual Addiction Therapist (CSAT) in South Carolina. We help men address pornography, compulsive sexual behavior, secrecy, and the patterns that damage their lives and relationships.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">The most important thing to know</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-semibold text-gray-900">This check is not your therapy record.</span> It is not a diagnosis, not an account, and not a clinical file. We do not save your answers in a database, and we do not send them to a counselor.
          </li>
          <li>
            <span className="font-semibold text-gray-900">This check is not emergency care.</span> If you may harm yourself or someone else, or if anyone is in immediate danger, stop and reach a real person. Call or text <span className="font-semibold text-gray-900">988</span> (Suicide &amp; Crisis Lifeline), text <span className="font-semibold text-gray-900">HOME</span> to <span className="font-semibold text-gray-900">741741</span> (Crisis Text Line), or call <span className="font-semibold text-gray-900">911</span>. The First 24 Hours check shows these same numbers if you mark “Hurt myself” or “Use again.” Your safety matters more than finishing the check.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Most of what you enter stays on this page.</span> Two parts of the original check can leave your browser, and only in the ways described below: writing the clarity memo, and emailing the results if you ask.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">What we collect, and why</h2>
        <p>We try to collect as little as we can.</p>
        <p>
          <span className="font-semibold text-gray-900">When you use the First 24 Hours check</span> (the page that opens with “Caught Again? Start Here”). You can mark what happened, what you are tempted to do, what your spouse or partner may need, and a next action. You can also type a short description and a statement you might say. We use those answers only to show you a stabilizing summary on this page. They stay in this browser for the visit. We do not send them to our server, to an AI service, or by email. Closing or refreshing the page clears them. If you mark “Hurt myself” or “Use again,” the page shows the crisis numbers above. That choice is not sent anywhere.
        </p>
        <p>
          <span className="font-semibold text-gray-900">When you take the original 5-Minute Integrity Check.</span> We ask for your first name and email address before you begin. Your first name lets the results speak to you directly. Your email address is used only if you later click the button to email the results to yourself. We do not add you to a mailing list, and we do not email you unless you click that button. We also ask you to mark pattern questions, rate a few areas of connection, and write three short reflections: what it costs, what it risks, and what changes first. Those answers stay in this browser unless one of the two things below happens.
        </p>
        <p>
          <span className="font-semibold text-gray-900">When you continue to Integrity Protocol.</span> The signup button opens integrity.scifsi.com. The link can name the program the check suggested. It does not include your name, your email, or your answers. Anything you enter there is covered by Integrity Protocol’s own policy.
        </p>
        <p>
          <span className="font-semibold text-gray-900">When you visit.</span> This app does not use analytics, advertising trackers, or its own cookies, and it does not save your answers in your browser’s storage. The host that delivers the page receives the ordinary technical information needed to respond, such as your IP address, browser type, and the page you requested. The typeface is loaded from Google Fonts, so your browser also contacts Google to fetch the font files.
        </p>
        <p>We don’t ask for payment information on this check. We don’t create an account for you here.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">How we use artificial intelligence</h2>
        <p>
          On the original check, the results page asks Groq, an AI service, to write a short clarity memo from your results. We send the number of pattern indicators you marked, your connection ratings, and the three reflections you wrote. We do not send your name or your email address.
        </p>
        <p>
          If that request fails, the page shows a summary assembled on your device from the scores, and nothing is sent. We do not save the memo or the answers in an account.
        </p>
        <p>
          The First 24 Hours summary is written on your device. It does not use Groq or any other AI service. If you marked “Hurt myself” or “Use again,” that summary does not quote what you typed. It tells you to reach a real person, and the page shows 988, 741741, and 911.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Who we share it with</h2>
        <p>
          <span className="font-semibold text-gray-900">We do not sell your personal information.</span> We don’t rent it or trade it, and we don’t share it for anyone else’s marketing. We do not send your check to a person at the Institute.
        </p>
        <p>We share information only with the service providers that run these features, and only as described above:</p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-semibold text-gray-900">Groq</span>, to write the clarity memo on the original check. It receives the scores and the three reflections, not your name or email.
          </li>
          <li>
            <span className="font-semibold text-gray-900">The email provider</span>, and only after you click “Email These Results to Myself.” That message includes your first name, your email address, your answers, and the clarity memo, and it is sent only to the address you entered. On the Vercel site the provider is Resend. On the Replit site it is the mailbox we configure, which is Microsoft 365 unless a different mail server is set. The First 24 Hours check has no email button.
          </li>
          <li>
            <span className="font-semibold text-gray-900">The host that serves the app</span>, Replit or Vercel, so the page and those requests can be delivered.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Google Fonts</span>, so the browser can load the typeface.
          </li>
        </ul>
        <p>
          We may also share information if the law requires it, such as a valid court order, to protect someone’s safety, or with your permission.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">How we protect your information</h2>
        <p>
          The site uses an encrypted connection (HTTPS). Even so, no website or email is perfectly private. The words you type can be sensitive. They stay on this page unless the original check asks Groq to write the memo, or you choose to email the results to yourself.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">How long we keep information</h2>
        <p>We do not keep a copy of your check in this app.</p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-semibold text-gray-900">In the browser.</span> Your name, email, and answers exist only while this page is open. Refreshing or closing the page clears them. We do not save them in your browser’s storage.
          </li>
          <li>
            <span className="font-semibold text-gray-900">The clarity memo.</span> We do not store that request or the memo. Groq processes the request in order to write the paragraph and handles it under its own terms.
          </li>
          <li>
            <span className="font-semibold text-gray-900">The results email.</span> If you asked for it, the message is delivered to your inbox through the email provider. We do not keep a separate copy in this app. The provider may keep its own delivery records. You can delete the message in your inbox.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Children</h2>
        <p>
          This check is meant for adults 18 and older. We don’t knowingly collect personal information from anyone under 18. If you think a minor has used it and information reached us, for example in an emailed results message, contact us and we will delete what we still have.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Your choices</h2>
        <p>You can:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold text-gray-900">Leave or refresh the page.</span> That clears what is still only in the browser.</li>
          <li><span className="font-semibold text-gray-900">Skip the email button.</span> If you don’t click it, we do not email your results.</li>
          <li><span className="font-semibold text-gray-900">Ask what we still have</span> about you from this app.</li>
          <li><span className="font-semibold text-gray-900">Ask us to delete</span> anything we still hold, such as a results message still in our sending mailbox.</li>
        </ul>
        <p>
          To make a request, email{' '}
          <a className="underline text-gray-900 hover:text-black" href="mailto:support@scifsi.com">support@scifsi.com</a>{' '}
          or call{' '}
          <a className="underline text-gray-900 hover:text-black" href="tel:+18039557627">(803) 955-7627</a>.
          We may need to confirm it is you, and we will respond within a reasonable time. These requests apply to this check. Information you later enter in Integrity Protocol, or in our client portal, is handled under those policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Other services and links</h2>
        <p>Some links leave this check. This policy does not cover what you do there.</p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-semibold text-gray-900">Integrity Protocol</span> at{' '}
            <a className="underline text-gray-900 hover:text-black" href="https://integrity.scifsi.com">integrity.scifsi.com</a>.
            This is the mentor-supported program the check can point you toward. It has its own{' '}
            <a className="underline text-gray-900 hover:text-black" href="https://integrity.scifsi.com/privacy">Privacy Policy</a>.
            Payments there are handled by that app, not by this check.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Our main website</span> at{' '}
            <a className="underline text-gray-900 hover:text-black" href="https://scifsi.com">scifsi.com</a>.
            Its privacy policy is at{' '}
            <a className="underline text-gray-900 hover:text-black" href="https://scifsi.com/privacy-policy">scifsi.com/privacy-policy</a>.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Changes to this policy</h2>
        <p>
          We may update this policy as the check changes. We will post the new version on this page and change the effective date at the top. If we make an important change, we will point it out on the check.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Contact us</h2>
        <p>Questions about this policy or your information? We’re glad to help.</p>
        <p className="text-gray-900">
          Institute for Sexual Integrity LLC (SCIFSI)<br />
          Email:{' '}
          <a className="underline hover:text-black" href="mailto:support@scifsi.com">support@scifsi.com</a><br />
          Phone:{' '}
          <a className="underline hover:text-black" href="tel:+18039557627">(803) 955-7627</a>
        </p>
      </section>
    </article>
  );
};

export default PrivacyPolicy;
