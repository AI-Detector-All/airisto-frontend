import { api } from "@/lib/api/api";
import { AuthResponse, SignUpData, SignUpResponse } from "@/types/auth";
import { Corporate } from "@/types/corporates";
import { User } from "@/types/user";
import { deleteCookie, setCookie } from "@/utils/cookie";


export async function signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/signin', { email, password });
    
    if (response.data.access_token) {
        setCookie('access_token', response.data.access_token, 7);
    }
    
    return response.data;
}

export function signOut() {
    deleteCookie('access_token');
    
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
    }
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

export async function forgotPassword(email:string): Promise<{ message: string }> {
    try {
        const response = await api.post('/auth/forgot-password', { email });

        return response.data;
    } catch (error) {
        throw error
    }
    
}

export async function resetPassword(token:string, password:string): Promise<{ message: string }> {
    try {
        const response = await api.post('/auth/reset-password', { token, password });

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function changePassword(currentPassword:string, newPassword:string): Promise<{ message: string }> {
    try {
        const response = await api.post('/auth/change-password', { currentPassword, newPassword });

        return response.data;
    } catch (error) {
        throw error
    }
}