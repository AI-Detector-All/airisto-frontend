'use client';
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton, GlobalLoader } from "@/components/ui/global-loader";
import { useEffect, useState } from "react";
import { Corporate } from "@/types/corporates";
import { getCorporates } from "@/services/corporate";
import { CorporateTable } from "../corporate-table";
import { Button } from "@/components/ui/button";

export default function CorporateView() {
    const { user, isLoading } = useAuth();
    const [corporates, setCorporates] = useState<Corporate[]>([])

    const getAllCorporates = async () => {
        const response = await getCorporates();
        console.log(response);

        setCorporates(response);
    }

    useEffect(() => {
        if (user) {
            getAllCorporates();
        }
    }, [user,])

    if (isLoading) return <DashboardSkeleton />;
    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <div className="w-full px-8 flex flex-col ">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href={'/dashboard'} className="flex gap-2 items-center">
                            <ChevronLeft className="text-gray-600" />
                            <h1 className="text-body2 text-gray-600 font-onest">Ana Sayfa</h1>
                        </Link>
                        <p className="text-gray-900 text-header2 font-onest font-semibold mt-2">Tüm Kurumlar</p>
                    </div>
                    <div className="mr-8 gap-4 flex">
                        <Link href={'/dashboard/corporate/create'} className="flex gap-2 items-center">
                            <Button className="bg-fuchsia-400 rounded-md px-4 py-2 hover:bg-fuchsia-500">

                                <Plus className="text-white" />
                                <p className="text-body2 text-white font-onest">Yeni Kurum Ekle</p>
                            </Button>
                        </Link>

                    </div>
                </div>
                {corporates.length > 0 ? (
                    <div className="mt-8">
                        {corporates.length > 0 ? (
                            <CorporateTable corporates={corporates} />
                        ) : (
                            <p className="text-center mt-8 text-gray-500">Henüz kurum bulunmamaktadır.</p>
                        )}
                    </div>
                ) : (
                    <GlobalLoader text="Kullanıcılar yükleniyor..." />
                )}
            </div>
        </div>
    )
}