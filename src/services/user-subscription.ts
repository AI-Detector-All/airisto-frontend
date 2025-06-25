import { api } from "@/lib/api/api";
import { UserSubscription } from "@/types/user-subscription";

export async function getUserSubscription(userId: string): Promise<UserSubscription> {
    try {
        const response = await api.get(`/user-subscriptions/user/${userId}`)
        return response.data
    } catch (error) {
        throw error
    }
}