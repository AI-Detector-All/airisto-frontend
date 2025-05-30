import { Corporate } from "./corporates"


interface Subscription {
    id: string
    name: string
}

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
}