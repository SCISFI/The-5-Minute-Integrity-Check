# The 5-Minute Integrity Check

## Overview
A React-based single-page assessment tool for professionals. The app guides users through a multi-step integrity check including pattern recognition, a loneliness audit, and pivot questions, then generates an AI-powered executive summary using the Google Gemini API.

## Project Architecture
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (CDN), Inter font (Google Fonts)
- **AI Integration**: Google Gemini API via `@google/genai` SDK
- **Build**: Vite 6, outputs to `dist/`

## Project Structure
```
/
├── index.html          # Entry HTML with Tailwind CDN
├── index.tsx           # React root mount
├── App.tsx             # Main app with step navigation
├── types.ts            # TypeScript types and AppState enum
├── components/
│   ├── Landing.tsx      # Email capture landing page
│   ├── Intro.tsx        # Introduction step
│   ├── PatternRecognition.tsx  # Pattern assessment
│   ├── LonelinessAudit.tsx     # Loneliness audit slider
│   ├── PivotQuestion.tsx       # Pivot reflection questions
│   └── FinalCTA.tsx            # AI-generated results + CTA
├── services/
│   └── geminiService.ts  # Gemini API integration (lazy init)
├── vite.config.ts       # Vite config (port 5000, all hosts allowed)
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

## Environment Variables
- `GEMINI_API_KEY` (secret): Required for the AI-powered executive summary on the final results page. The app functions without it but the summary will show an error message.

## Development
- Run: `npm run dev` (serves on port 5000)
- Build: `npm run build` (outputs to `dist/`)
- Deployment: Static site deployment from `dist/`

## Recent Changes
- 2026-02-18: Initial Replit setup - configured Vite for port 5000 with allowedHosts, added vite entry script to index.html, made Gemini SDK initialization lazy to prevent crash when API key is missing, updated model to gemini-2.0-flash.
