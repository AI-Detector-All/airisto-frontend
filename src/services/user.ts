import { api } from "@/lib/api/api";
import { User } from "@/types/user";


export async function currentUser() {
    try {
        const response = await api.get('/user/current');

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getUserById(userId:string): Promise<User> {
    try {
        const response = await api.get(`/user/${userId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}