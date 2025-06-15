import { Corporate } from "./corporates"
import { Subscription } from "./subscription"


export interface User {
    id: string
    email: string
    name: string
    surname: string
    phone: string
    role: string
    provider: string
    isPhoneVerified: boolean
    isEmailVerified: boolean
    picture: string
    createdAt: Date
    updatedAt: Date
    corporate?: Corporate | null
    subscription?: Subscription | null
    usedAnalysesThisMonth: number
    remainToken: number
    renewalDate: Date
    orcidId?: string
    usedStorage: number
    maxStorage: number
    type: string
}