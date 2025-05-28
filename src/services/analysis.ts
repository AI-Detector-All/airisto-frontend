import { api } from "@/lib/api/api";
import { AnalysisResults } from "@/types/analysis";

export async function newAnalyze(corporate?: string, title?: string, inputText?: string, document?: File): Promise<AnalysisResults> {
    try {
        const formData = new FormData();
        if (title) formData.append("title", title);
        if (corporate) formData.append("corporate", corporate);
        if (inputText) formData.append("inputText", inputText);
        if (document) formData.append("document", document);

        const response = await api.post('/analysis', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}