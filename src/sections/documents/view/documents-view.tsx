'use client';
import { DocumentsTable } from "@/sections/documents/document-table";
import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { useAuth } from "@/hooks/useAuth";
import { useUserDocument } from "@/hooks/useUserDocument";
import { formatBytes } from "@/utils/format-byte";
import { ChevronLeft, Plus, HardDrive } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { deleteAnalysis } from "@/services/analysis";
import { toast } from "sonner";

const filterItems = [
    {
        name: 'Tüm Dokümanlar',
        id: 'all'
    },
    {
        name: 'Favoriler',
        id: 'favorites'
    },
    {
        name: '.pdf',
        id: 'pdf'
    },
    {
        name: '.docx',
        id: 'docx'
    },
]

export default function DocumentsView() {
    const [selected, setSelected] = useState(filterItems[0].id)
    const { isLoading, user, refreshUserData } = useAuth()
    const { userDocuments, isDocumentLoading, refreshUserAnalysis } = useUserDocument();

    const storageInfo = useMemo(() => {
        if (!user) return { used: 0, max: 0, remaining: 0, percentage: 0 };

        const used = user.usedStorage || 0;
        const max = user.maxStorage || 0;
        const remaining = max - used;
        const percentage = max > 0 ? (used / max) * 100 : 0;

        return {
            used,
            max,
            remaining,
            percentage: Math.min(percentage, 100)
        };
    }, [user]);

    const filteredDocuments = useMemo(() => {
        switch (selected) {
            case 'all':
                return userDocuments;
            case 'favorites':
                return userDocuments.filter(doc => "favorites" in doc);
            case 'pdf':
                return userDocuments.filter(doc => doc.inputDocument !== "" && doc.inputDocument.endsWith('.pdf'));
            case 'docx':
                return userDocuments.filter(doc => doc.inputDocument !== "" && doc.inputDocument.endsWith('.docx'));
            default:
                return userDocuments;
        }
    }, [userDocuments, selected]);

    if (isLoading) return <DashboardSkeleton />

    if (isDocumentLoading) return <DashboardSkeleton />

    const handleDeleteAnalysis = async (analysisId: string) => {
        try {
            await deleteAnalysis(analysisId);
            refreshUserAnalysis();
            refreshUserData();
        } catch (error) {
            console.error(error);
            toast.error("Bir hata oluştu", { description: "Analiz silinemedi." });
        }
    }

    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <div className="w-full px-8 flex flex-col ">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href={'/dashboard'} className="flex gap-2 items-center">
                            <ChevronLeft className="text-gray-600" />
                            <h1 className="text-body2 text-gray-600 font-onest">Ana Sayfa</h1>
                        </Link>
                        <p className="text-gray-900 text-header2 font-onest font-semibold mt-2">Dokümanlar</p>
                    </div>
                    <div className="mr-8 gap-4 flex">
                        <Button className="bg-fuchsia-400 rounded-md px-4 py-2 hover:bg-fuchsia-500">
                            <Link href={'/dashboard/ai-detector'} className="flex gap-2 items-center">
                                <Plus className="text-white" />
                                <p className="text-body2 text-white font-onest">Yeni Tespit</p>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="w-full flex justify-between items-center mt-8">
                    <div className="flex gap-4">
                        {filterItems.map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => setSelected(item.id)}
                                className={`rounded-lg px-4 py-4 text-gray-900 bg-gray-200 hover:bg-fuchsia-100
                                ${selected === item.id ? 'border border-fuchsia-400 bg-fuchsia-50' : ''}`}
                            >
                                <p className="text-body2 text-gray-900 font-onest">{item.name}</p>
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                        <HardDrive className="text-gray-600" size={20} />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 font-onest">
                                    Depolama Alanı
                                </span>
                                <span className="text-xs text-gray-500 font-onest">
                                    {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.max)}
                                </span>
                            </div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${storageInfo.percentage > 90 ? 'bg-red-500' :
                                        storageInfo.percentage > 70 ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}
                                    style={{ width: `${storageInfo.percentage}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-500 font-onest mt-1">
                                {formatBytes(storageInfo.remaining)} kalan
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <DocumentsTable documents={filteredDocuments} handleDeleteAnalysis={handleDeleteAnalysis} />
                </div>
            </div>
        </div>
    )
}