export type ClaimType = 
  | 'Factual' 
  | 'Statistical' 
  | 'Policy' 
  | 'Predictive' 
  | 'Opinion' 
  | 'Eyewitness';

export type CorroborationStatus = 
  | 'Corroborated' 
  | 'Single-Source' 
  | 'Disputed' 
  | 'Unverified';

export interface NewsArticle {
  id: string;
  title: string;
  publisher: string;
  url: string;
  date?: string;
  snippet: string;
  stance?: 'Supportive' | 'Critical' | 'Neutral' | 'Mixed';
  publisherReliabilityTier?: 'Wire Service' | 'Major Broadcaster' | 'National Press' | 'Specialized Tech/Science' | 'General Media';
}

export interface ExtractedClaim {
  id: string;
  claim: string;
  claimType: ClaimType;
  evidence: string;
  sourcePublisher: string;
  sourceUrl?: string;
  verificationStatus: CorroborationStatus;
  confidenceScore: number; // 0 - 100
  notes?: string;
}

export interface SourceAgreement {
  topic: string;
  statement: string;
  publishers: string[];
  evidenceSummary: string;
}

export interface SourceDisagreement {
  topic: string;
  issue: string;
  publisherA: string;
  stanceA: string;
  publisherB: string;
  stanceB: string;
  rootCause: string; // e.g. "Differing data sources", "Editorial framing", "Incomplete initial figures"
}

export interface DifferingViewpoint {
  aspect: string;
  publisherA: string;
  perspectiveA: string;
  publisherB: string;
  perspectiveB: string;
  nuanceExplanation: string;
}

export interface EvidenceGap {
  topic: string;
  missingEvidence: string;
  riskAssessment: 'Low' | 'Medium' | 'High';
  recommendedVerification: string;
}

export interface SourceComparison {
  agreements: SourceAgreement[];
  disagreements: SourceDisagreement[];
  differingViewpoints: DifferingViewpoint[];
  evidenceGaps: EvidenceGap[];
}

export interface BalancedReport {
  headline: string;
  executiveSummary: string;
  keyFindings: string[];
  uncertainties: string[];
  limitations: string[];
  conclusion: string;
  neutralityAssessment: string;
  neutralityScore: number; // 0 - 100
}

export interface AnalysisStatistics {
  articleCount: number;
  distinctPublishersCount: number;
  extractedClaimsCount: number;
  disagreementsCount: number;
  agreementsCount: number;
  corroborationRate: number; // percentage
  articlesByPublisher: { publisher: string; count: number }[];
  claimsByType: { type: ClaimType; count: number; percentage: number }[];
  claimsByStatus: { status: CorroborationStatus; count: number }[];
}

export interface GroundingSource {
  title: string;
  url: string;
  domain: string;
}

export interface NewsAnalysisResult {
  topic: string;
  timestamp: string;
  searchQueries: string[];
  sources: GroundingSource[];
  articles: NewsArticle[];
  claims: ExtractedClaim[];
  sourceComparison: SourceComparison;
  balancedReport: BalancedReport;
  statistics: AnalysisStatistics;
  agentPipelineSteps: {
    step: string;
    description: string;
    status: 'completed' | 'in_progress' | 'pending';
    details: string;
  }[];
}
