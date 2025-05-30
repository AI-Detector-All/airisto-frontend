'use client';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { UsersTable } from "../users-table";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton, GlobalLoader } from "@/components/ui/global-loader";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { getCorporateMembers } from "@/services/corporate";

export default function UsersView() {
    const { user, isLoading } = useAuth();
    const [users, setUsers] = useState<User[]>([])

    const getUsers = async () => {
        const response = await getCorporateMembers(user?.corporate?.id ?? "");

        setUsers(response);
    }

    useEffect(() => {
        if (user) {
            getUsers();
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
                        <p className="text-gray-900 text-header2 font-onest font-semibold mt-2"> Kullanıclar </p>
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
                {users.length > 0 ? (
                    <div className="mt-8">
                        {users.length > 0 ? (
                            <UsersTable users={users} />
                        ) : (
                            <p className="text-center mt-8 text-gray-500">Henüz kullanıcı bulunmamaktadır.</p>
                        )}
                    </div>
                ):(
                    <GlobalLoader text="Kullanıcılar yükleniyor..." />
                )}
            </div>
        </div>
    )
}