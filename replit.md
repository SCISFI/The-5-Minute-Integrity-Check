# The 5-Minute Integrity Check

## Overview
A React-based single-page assessment tool for professionals. The app guides users through a multi-step integrity check including pattern recognition, a loneliness audit, and pivot questions, then generates an AI-powered executive summary using Google Gemini.

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
├── App.tsx             # Main app with step navigation + progress bar
├── types.ts            # TypeScript types (AssessmentData, AppState enum)
├── components/
│   ├── Landing.tsx      # First name + email capture landing page
│   ├── Intro.tsx        # Introduction/briefing step
│   ├── PatternRecognition.tsx  # Part I: Pattern assessment (8 questions)
│   ├── LonelinessAudit.tsx     # Part II: Loneliness audit (0-5 scale)
│   ├── PivotQuestion.tsx       # Part III: Pivot reflection questions
│   └── FinalCTA.tsx            # AI-generated executive summary + mailto + CTA
├── services/
│   ├── geminiService.ts  # Gemini API integration (lazy init, Replit AI Integrations)
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
