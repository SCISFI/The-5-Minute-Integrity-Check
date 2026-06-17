# The 5-Minute Integrity Check

## Overview
A React-based single-page assessment tool. The default front door is the **First 24 Hours Integrity Check** ("Caught Again? Start Here") — an acute-crisis stabilization flow for someone just caught in or disclosing problematic sexual behavior. The original reflective **5-Minute Integrity Check** (pattern recognition, loneliness audit, pivot questions + deterministic clarity memo) remains available via a secondary link. `App.tsx` is a simple mode switcher between the two; both are fully client-side with no backend, routing, or data persistence.

## Project Architecture
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (build-time via `@tailwindcss/vite`), Inter font (Google Fonts)
- **AI Integration**: Google Gemini via Replit AI Integrations (`@google/genai` SDK, model: `gemini-2.5-flash`)
- **Email**: mailto: links (no backend needed)
- **Build**: Vite 6, outputs to `dist/`
- **Deployment**: Static site

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
│   └── FinalCTA.tsx            # Executive summary + mailto + CTA (original flow)
├── services/
│   ├── geminiService.ts  # Deterministic clarity-memo generator for original flow (no network call)
│   ├── crisisSummary.ts  # Deterministic stabilizing memo + high-risk detection for crisis flow
│   └── emailService.ts   # mailto: link builder for emailing results
├── vite.config.ts       # Vite config (port 5000, Tailwind plugin, env injection)
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

## Environment Variables (auto-managed)
- `AI_INTEGRATIONS_GEMINI_API_KEY`: Auto-set by Replit AI Integrations. Injected into client via Vite `define`.
- `AI_INTEGRATIONS_GEMINI_BASE_URL`: Auto-set by Replit AI Integrations. Injected into client via Vite `define`.

No manual API keys are required.

## Development
- Run: `npm run dev` (serves on port 5000)
- Build: `npm run build` (outputs to `dist/`)
- Deployment: Static site deployment from `dist/`
