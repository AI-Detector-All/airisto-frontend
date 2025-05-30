interface Subscription {
    id: string
    name: string
}
export interface Corporate {
    id: string;
    name: string;
    domain: string;
    subscription?: Subscription | null;
    members: string[]
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}