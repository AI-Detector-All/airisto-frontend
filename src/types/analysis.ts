
interface CategoryScore {
    category: string
    score: number
    explanation: string
}

export interface AnalysisResults {
    id:string
    user: string
    corporate?: string
    title: string
    inputText?: string
    inputDocument?: string
    aiPercent: string
    outputDocument?: string
    categoryScores: CategoryScore[]
    summary:string
    suggestions: string[]
}