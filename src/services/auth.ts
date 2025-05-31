import { api } from "@/lib/api/api";
import { AuthResponse, SignUpData } from "@/types/auth";
import { Corporate } from "@/types/corporates";
import { User } from "@/types/user";


export async function signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/signin', { email, password });

    return response.data;
}

export async function signUp(data: SignUpData): Promise<AuthResponse> {
    try {
        const response = await api.post('/auth/signup', data);

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function corporateSignUp(user: SignUpData, corporate: { name: string, domain: string, isActive: boolean }): Promise<{user: User, corporate: Corporate}> {
    try {
        const response = await api.post('/auth/signup/corporate', { user, corporate });

        return response.data;
    } catch (error) {
        throw error
    }
}