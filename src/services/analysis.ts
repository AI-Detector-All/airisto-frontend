import { api } from "@/lib/api/api";
import { AnalysisResults } from "@/types/analysis";

export async function newAnalyze(
    corporate?: string,
    title?: string,
    inputText?: string,
    document?: File,
    referenceDocuments?: File[]
): Promise<AnalysisResults> {
    try {
        const formData = new FormData();

        if (title) formData.append("title", title);
        if (corporate) formData.append("corporate", corporate);
        if (inputText) formData.append("inputText", inputText);

        if (document) formData.append("document", document);

        if (referenceDocuments && referenceDocuments.length > 0) {
            referenceDocuments.forEach((refDoc) => {
                formData.append("referenceDocuments", refDoc);
                // console.log(`Added reference document ${index + 1}: ${refDoc.name}`);
            });

            // console.log(`Total reference documents: ${referenceDocuments.length}`);
        }

        // for (const [key, value] of formData.entries()) {
        //     if (value instanceof File) {
        //         console.log(`${key}: ${value.name} (${value.size} bytes)`);
        //     } else {
        //         console.log(`${key}: ${value}`);
        //     }
        // }

        const response = await api.post('/analysis', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        return response.data;
    } catch (error) {
        console.error('Analysis API Error:', error);
        throw error;
    }
}

export async function newAnalyzeSimple(
    corporate?: string,
    title?: string,
    inputText?: string,
    document?: File
): Promise<AnalysisResults> {
    try {
        const formData = new FormData();
        if (title) formData.append("title", title);
        if (corporate) formData.append("corporate", corporate);
        if (inputText) formData.append("inputText", inputText);
        if (document) formData.append("document", document);

        const response = await api.post('/analysis/simple', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getUserAnalysis(userId: string): Promise<AnalysisResults[]> {
    try {
        const response = await api.get(`/analysis/user/${userId}`)

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function deleteAnalysis(analysisId: string) {
    const response = await api.delete(`/analysis/${analysisId}`);

    return response.data;
}

export async function downloadInputDocument(analysisId: string): Promise<Blob> {
    const response = await api.get(`/analysis/input/${analysisId}`, {
        responseType: 'blob'
    });

    return response.data
}

export async function downloadOutputDocument(analysisId: string): Promise<Blob> {
    const response = await api.get(`/analysis/output/${analysisId}`, {
        responseType: 'blob'
    });


    return response.data
}