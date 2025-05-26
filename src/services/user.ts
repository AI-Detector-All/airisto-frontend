import { api } from "@/lib/api/api";


export async function currentUser() {
    try {
        const response = await api.get('/user/current');

        return response.data;
    } catch (error) {
        throw error
    }
}