export interface AnalysisResults {
    score: number;
    summary: string;
    chartData: { position: number; score: number; }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    indicators: { type: string; score: number; description: string; icon: any; }[];
}