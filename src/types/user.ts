export interface User {
    id: string
    email: string
    name: string
    surname:string
    phone:string
    role:string
    provider:string
    isPhoneVerified:boolean
    isEmailVerified:boolean
    picture:string
    createdAt: Date
    updatedAt: Date
}