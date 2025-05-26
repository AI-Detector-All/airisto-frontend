import { api } from "@/lib/api/api";
import { AuthResponse } from "@/types/auth";

export async function signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/signin', { email, password });

    return response.data;
}