import { Subscription } from "./subscription";

export interface Corporate {
    id: string;
    name: string;
    domain: string;
    subscription?: Subscription | null;
    members: string[]
    isActive: boolean
    totalUsedAnalyses: number
    createdAt: Date
    updatedAt: Date
    country: string;
    city: string;
    state: string;
    address: string;
    postalCode: string;
}