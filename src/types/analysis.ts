export interface SpamFeature {
  name: string;
  weight: number;
  description: string;
  examples: string[];
}

export interface AnalysisResult {
  isSpam: boolean;
  spamScore: number;
  wordCount: number;
  features: SpamFeature[];
  riskFactors: string[];
}