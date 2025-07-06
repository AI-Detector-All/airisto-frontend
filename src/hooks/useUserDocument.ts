'use client'
import { useAuth } from "./useAuth"
import { useEffect, useState } from "react"
import { getUserAnalysis } from "@/services/analysis"
import { Document } from "@/types/document"


export const useUserDocument = () => {
    const { user } = useAuth()
    const [userDocuments, setUserDocuments] = useState<Document[]>([])
    const [ isDocumentLoading, setIsDocumentLoading ] = useState(false)

    const fetchUserAnalysis = async () => {
        if (user) {
            setIsDocumentLoading(true);
            const response = await getUserAnalysis(user.id);
            const userDocuments = response.map((analysis) => ({
                inputDocument: analysis.inputDocument as string,
                outputDocument: analysis.outputDocument as string,
                aiPercent: analysis.aiPercent as string,
                title: analysis.title as string,
                analysisId: analysis.id,
                createdAt: analysis.createdAt
            }))
            .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA;
            });
            setUserDocuments(userDocuments);
            setIsDocumentLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserAnalysis();
        }
    }, [user]);

    const refreshUserAnalysis = async () => {
        await fetchUserAnalysis();
    }

    return {
        userDocuments,
        refreshUserAnalysis,
        isDocumentLoading
    }
}