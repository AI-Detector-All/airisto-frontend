import { api } from "@/lib/api/api"
import { Corporate } from "@/types/corporates";
import { User } from "@/types/user"

export async function getCorporateMembers(corporateId:string): Promise<User[]> {
    try {
        const response = await api.get(`/corporate/${corporateId}/members`)

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getCorporates(): Promise<Corporate[]> {
    try {
        const response = await api.get('/corporate');

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function createCorporate(name: string, domain: string, isActive: boolean): Promise<Corporate> {
    try {
        const response = await api.post('/corporate', { name, domain, isActive });

        return response.data;
    } catch (error) {
        throw error
    }
}