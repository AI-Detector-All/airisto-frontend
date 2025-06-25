export interface Subscription {
    id: string
    name: string
    price: number
    type:string
    maxAnalyses: number
    maxTotalAnalyses?: number
    durationInDays: number
    features: string[]
    createdAt: Date
    updatedAt: Date
}