import { Subscription } from "./subscription"

export interface UserSubscription {
    id: string
    userId: string
    subscription: Subscription
    type: string
    usedAnalyses: number
    maxAnalyses: number
    startDate: Date
    validUntil: Date
}