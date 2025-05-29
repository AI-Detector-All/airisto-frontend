import { api } from "@/lib/api/api"
import { User } from "@/types/user"

export async function getCorporateMembers(corporateId:string): Promise<User[]> {
    try {
        const response = await api.get(`/corporate/${corporateId}/members`)

        return response.data;
    } catch (error) {
        throw error
    }
}