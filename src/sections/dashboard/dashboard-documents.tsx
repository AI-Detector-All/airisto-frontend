import { DashboardSkeleton } from "@/components/ui/global-loader";
import { useUserDocument } from "@/hooks/useUserDocument";
import { useTranslate } from "@/locales";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { DocumentsTable } from "../documents/document-table";

export function DashboardDocuments() {
    const { t } = useTranslate('dashboard');
    const { isDocumentLoading, userDocuments } = useUserDocument()

    if (isDocumentLoading) return <DashboardSkeleton />

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center items-center mt-6 sm:mt-8 lg:mt-10">
            <div className="bg-white w-full p-4 sm:p-6 lg:p-8 rounded-md shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <h1 className="text-lg sm:text-xl lg:text-header4 font-onest font-semibold">
                        {t('documents')}
                    </h1>
                    <Link 
                        href={'/dashboard/documents'} 
                        className="flex items-center gap-2 self-start sm:self-auto"
                    >
                        <p className="text-sm sm:text-body2 text-fuchsia-400 font-onest">
                            {t('allDocuments')}
                        </p>
                        <ChevronRight className="text-fuchsia-400 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                </div>

                <div className="mt-6 sm:mt-8 overflow-hidden">
                    <div className="min-w-full overflow-x-auto">
                        <DocumentsTable 
                            documents={userDocuments.slice(0, 5)} 
                            isSearchButton={false} 
                        />
                    </div>
                </div>

                {userDocuments.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                        <p className="text-gray-500 text-sm sm:text-base">
                            {t('noDocuments') || 'Henüz belge bulunmuyor'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}