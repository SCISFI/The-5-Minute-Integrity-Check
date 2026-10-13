# The 5-Minute Integrity Check

## Overview
A React-based assessment tool. The default front door is the **First 24 Hours Integrity Check** ("Caught Again? Start Here") — an acute-crisis stabilization flow for someone just caught in or disclosing problematic sexual behavior. The original reflective **5-Minute Integrity Check** (pattern recognition, loneliness audit, pivot questions, then a clarity memo) remains available via a secondary link. `App.tsx` switches between the two.

The crisis check stays in the browser and is not saved. The original check keeps the name, email, and answers in the browser as well. Writing the original clarity memo sends the answers, without the name or email, to `/api/clarity` (Groq). Emailing the results sends them to the person's own inbox through `/api/send-email`. There is no account and no database.

## Project Architecture
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (build-time via `@tailwindcss/vite`), Inter font (Google Fonts)
- **AI Integration**: Groq (`llama-3.3-70b-versatile`) through `/api/clarity`, with a local fallback paragraph if that call fails. The crisis memo is written in the browser and does not call the API.
- **Email**: Resend on Vercel (`api/send-email.ts`), or Office 365 SMTP if the Express server in `server/` is the one running. The message goes only to the address the person entered.
- **Build**: Vite 6, outputs to `dist/`
- **Local API**: `npm run dev` starts Vite and the Express API together

## Project Structure
```
/
├── index.html          # Entry HTML with Google Fonts
├── index.tsx           # React root mount + CSS import
├── styles.css          # Tailwind CSS entry point
├── App.tsx             # Mode switcher: CrisisCheck (default) vs OriginalCheck
├── types.ts            # TypeScript types (AssessmentData, CrisisData, AppState enum)
├── components/
│   ├── CrisisCheck.tsx  # Front door: First 24 Hours Integrity Check (landing → guardrails → 5 steps → completion)
│   ├── CrisisResources.tsx     # Shared crisis/safety resources panel (988, 741741, 911)
│   ├── OriginalCheck.tsx       # Original 5-Minute Integrity Check flow (extracted from old App.tsx)
│   ├── Landing.tsx      # First name + email capture landing page (original flow)
│   ├── Intro.tsx        # Introduction/briefing step (original flow)
│   ├── PatternRecognition.tsx  # Part I: Pattern assessment (8 questions)
│   ├── LonelinessAudit.tsx     # Part II: Loneliness audit (0-5 scale)
│   ├── PivotQuestion.tsx       # Part III: Pivot reflection questions
│   └── FinalCTA.tsx            # Personalized results and Integrity Protocol signup (original flow)
├── services/
│   ├── geminiService.ts  # Calls /api/clarity, then falls back to a local paragraph
│   ├── protocolHandoff.ts # Signup link, program choice, and current offer wording
│   ├── resultsEmail.ts   # Results email used by both the Vercel and Express senders
│   ├── crisisSummary.ts  # Stabilizing memo and high-risk detection for the crisis flow
│   └── emailService.ts   # Sends the original results when the person asks
├── vite.config.ts       # Vite config (port 5000, Tailwind plugin, env injection)
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

## Environment Variables
- `GROQ_API_KEY`: used by `/api/clarity` and `server/clarity.ts` to write the original clarity memo.
- `RESEND_API_KEY`: used by `api/send-email.ts` on Vercel.
- `SMTP_USER` and `SMTP_PASS`: used by `server/email.ts` when the Express server sends mail.

The check still runs if those keys are missing. The original results page shows a local summary, and a failed email tells the person to write support@scifsi.com.

## Development
- Run: `npm run dev` (the page on port 5000, the local API on port 3001)
- Build: `npm run build` (outputs to `dist/`)
- Deployment: Vercel serves `dist/` and the functions in `api/`
