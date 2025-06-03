import { api } from "@/lib/api/api";
import { AuthResponse, SignUpData, SignUpResponse } from "@/types/auth";
import { Corporate } from "@/types/corporates";
import { User } from "@/types/user";


export async function signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/signin', { email, password });

    return response.data;
}

export async function signUp(data: SignUpData): Promise<SignUpResponse> {
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

export async function verifyEmailToken(token: string): Promise<AuthResponse> {
    try {
        const repsonse = await api.get('/auth/verify-email', { params: { token } });

        return repsonse.data;
    } catch (error) {
        throw error
    }
}

export async function getEmailVerificationToken(userId:string): Promise<string> {
    try {
        const response = await api.get(`/auth/email-verification-token/${userId}`)

        return response.data;
    } catch (error) {
        throw error
    }
}