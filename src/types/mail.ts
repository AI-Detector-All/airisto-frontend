export interface SendMail {
    firstName: string
    lastName: string
    email: string
    phone: string
    company?: string
    customerType: string
    subject: string
    message: string
}

export interface MailResponse {
    message: string
    success: boolean
    timestamp: string
}

export interface MailError {
    statusCode: number
    message: string | string[]
    error: string
}