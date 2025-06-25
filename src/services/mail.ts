import { api } from "@/lib/api/api";
import { MailResponse, SendMail } from "@/types/mail";

export async function sendMail(contactData:SendMail): Promise<MailResponse> {
    try {
        const response = await api.post('/mail/contact', contactData);

        return response.data;
    } catch (error) {
        throw error
    }
}