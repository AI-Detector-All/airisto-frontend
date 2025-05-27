export interface Subscription {
    id: string
    name: string
    price: number
    maxAnalyses: number
    maxTotalAnalyses?: number
    durationInDays: number
    features: string[]
    createdAt: Date
    updatedAt: Date
}