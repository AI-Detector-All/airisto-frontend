import { User } from "./user"

export interface AuthResponse {
    access_token: string
    user: User
}

export interface SignUpData {
    email: string;
    name: string;
    surname: string;
    password: string;
    type?: string;
    provider: string;
    isActive: boolean;
}

export interface SignUpResponse {
    authResponse: AuthResponse,
    emailVerificationToken: string
}