'use client';
import { DocumentsTable } from "@/components/document-table";
import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { useAuth } from "@/hooks/useAuth";
import { useUserDocument } from "@/hooks/useUserDocument";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
        name: '.txt',
        id: 'txt'
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selected, setSelected] = useState(filterItems[0].id)
    const { isLoading } = useAuth()
    const { userDocuments, isDocumentLoading } = useUserDocument();

    if (isLoading) return <DashboardSkeleton />

    if (isDocumentLoading) return <DashboardSkeleton />

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
                <div className="w-full flex gap-4 mt-8">
                    {filterItems.map((item) => (
                        <Button key={item.id} className={`rounded-lg px-4 py-4 text-gray-900 bg-gray-200 hover:bg-fuchsia-100
                        ${selected === item.id ? 'border border-fuchsia-400' : ''}`}>
                            <p className="text-body2 text-gray-900 font-onest">{item.name}</p>
                        </Button>
                    ))}
                </div>
                <div className="mt-8">
                    <DocumentsTable documents={userDocuments} />
                </div>
            </div>
        </div>
    )
}