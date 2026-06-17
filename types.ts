export interface AssessmentData {
  patterns: boolean[];
  audit: {
    relationalExposure: number;
    emotionalLiteracy: number;
    maleBonding: number;
    accountabilityDensity: number;
  };
  pivot: {
    cost: string;
    risk: string;
    change: string;
  };
}

export enum AppState {
  LANDING = 'LANDING',
  INTRO = 'INTRO',
  PATTERN = 'PATTERN',
  AUDIT = 'AUDIT',
  PIVOT = 'PIVOT',
  RESULT = 'RESULT'
}

export interface CrisisData {
  whatHappened: string[];
  honestDescription: string;
  tempted: string[];
  partnerNeeds: string[];
  nextAction: string[];
  statement: string;
}
