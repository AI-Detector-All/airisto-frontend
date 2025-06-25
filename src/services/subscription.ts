import { api } from "@/lib/api/api";
import { Subscription } from "@/types/subscription";

export async function getSubscriptionById(subscriptionId: string): Promise<Subscription> {
    try {
        const response = await api.get(`/subscription/${subscriptionId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getSubscriptions(): Promise<Subscription[]> {
    try {
        const response = await api.get('/subscription');

        return response.data;
    } catch (error) {
        throw error
    }
}