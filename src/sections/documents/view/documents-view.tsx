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
import { useTranslate } from "@/locales";

const filterItems = [
    {
        name: 'allDocuments',
        id: 'all'
    },
    {
        name: 'favorites',
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
    const {t} = useTranslate('documents');
    const [selected, setSelected] = useState(filterItems[0].id)
    const { isLoading, user } = useAuth()
    const { userDocuments, isDocumentLoading } = useUserDocument();

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


    return (
        <div className="bg-gray-100 w-full min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                    <div className="flex-1">
                        <Link href={'/dashboard'} className="flex gap-2 items-center">
                            <ChevronLeft className="text-gray-600 h-4 w-4 sm:h-5 sm:w-5" />
                            <h1 className="text-sm sm:text-body2 text-gray-600 font-onest">{t('home')}</h1>
                        </Link>
                        <p className="text-gray-900 text-xl sm:text-2xl lg:text-header2 font-onest font-semibold mt-2">
                            {t('documents')}
                        </p>
                    </div>
                    
                    <div className="flex justify-end sm:mr-8">
                        <Button className="bg-fuchsia-400 rounded-md px-4 py-2 hover:bg-fuchsia-500 w-full sm:w-auto">
                            <Link href={'/dashboard/ai-detector'} className="flex gap-2 items-center justify-center">
                                <Plus className="text-white h-4 w-4" />
                                <p className="text-sm sm:text-body2 text-white font-onest">{t('new')}</p>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center mt-6 sm:mt-8 gap-4 lg:gap-0">
                    <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 order-2 lg:order-1">
                        {filterItems.map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => setSelected(item.id)}
                                className={`rounded-lg px-3 sm:px-4 py-2 sm:py-3 lg:py-4 text-gray-900 bg-gray-200 hover:bg-fuchsia-100 transition-colors
                                ${selected === item.id ? 'border border-fuchsia-400 bg-fuchsia-50' : ''}`}
                            >
                                <p className="text-xs sm:text-sm lg:text-body2 text-gray-900 font-onest whitespace-nowrap">
                                    {t(item.name)}
                                </p>
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 bg-white rounded-lg p-3 sm:p-4 shadow-sm order-1 lg:order-2 w-full lg:w-auto">
                        <HardDrive className="text-gray-600 flex-shrink-0" size={20} />
                        <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <span className="text-sm font-medium text-gray-700 font-onest">
                                    {t('storage')}
                                </span>
                                <span className="text-xs text-gray-500 font-onest mt-1 sm:mt-0">
                                    {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.max)}
                                </span>
                            </div>
                            
                            <div className="w-full sm:w-32 lg:w-32 h-2 bg-gray-200 rounded-full mt-2 sm:mt-1">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                        storageInfo.percentage > 90 ? 'bg-red-500' :
                                        storageInfo.percentage > 70 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                    }`}
                                    style={{ width: `${storageInfo.percentage}%` }}
                                />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:justify-between lg:block">
                                <span className="text-xs text-gray-500 font-onest mt-1">
                                    {formatBytes(storageInfo.remaining)} {t('remain')}
                                </span>
                                <span className="text-xs text-gray-500 font-onest mt-1 sm:mt-0 lg:hidden">
                                    {Math.round(storageInfo.percentage)}% {t('used') || 'kullanıldı'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 overflow-hidden">
                    <div className="bg-white rounded-lg shadow-sm">
                        <DocumentsTable 
                            documents={filteredDocuments} 
                            isSearchButton={true}
                        />
                    </div>

                    {filteredDocuments.length === 0 && (
                        <div className="bg-white rounded-lg p-8 sm:p-12 text-center shadow-sm">
                            <div className="text-gray-400 mb-4">
                                <HardDrive className="h-12 w-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {t('noDocuments') || 'Belge bulunamadı'}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                {selected === 'all' 
                                    ? (t('noDocumentsDesc') || 'Henüz hiç belge yüklenmemiş.')
                                    : (t('noFilteredDocuments') || 'Bu filtreye uygun belge bulunamadı.')
                                }
                            </p>
                            {selected === 'all' && (
                                <Link href="/dashboard/ai-detector">
                                    <Button className="bg-fuchsia-400 hover:bg-fuchsia-500 text-white">
                                        <Plus className="h-4 w-4 mr-2" />
                                        {t('uploadFirst') || 'İlk belgeyi yükle'}
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}