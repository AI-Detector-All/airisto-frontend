import DocumentsTable from "@/components/table";
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { useUserDocument } from "@/hooks/useUserDocument";
import { useTranslate } from "@/locales";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function DashboardDocuments() {
    const { t } = useTranslate('dashboard');
    const { isDocumentLoading, userDocuments } = useUserDocument()

    if (isDocumentLoading) return <DashboardSkeleton />

    return (
        <div className="w-full px-8 flex justify-center items-center mt-10">
            <div className="bg-white w-full p-4 rounded-md">
                <div className="flex justify-between">
                    <h1 className="text-header4 font-onest font-semibold">{t('documents')}</h1>
                    <Link href={'/dashboard/documents'} className="flex items-center gap-2">
                        <p className="text-body2 text-fuchsia-400 font-onest">{t('allDocuments')}</p>
                        <ChevronRight className="text-fuchsia-400" />
                    </Link>
                </div>
                <div className="mt-8">
                    <DocumentsTable documents={userDocuments.slice(0, 5)} />
                </div>
            </div>
        </div>
    )
}