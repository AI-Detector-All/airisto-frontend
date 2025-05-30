'use client';
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton, GlobalLoader } from "@/components/ui/global-loader";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/user";
import { AllUsersTable } from "../all-users-table";

export default function AllUsersView() {
    const { user, isLoading } = useAuth();
    const [users, setUsers] = useState<User[]>([])

    const getUsers = async () => {
        const response = await getAllUsers();        
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
                        <p className="text-gray-900 text-header2 font-onest font-semibold mt-2">Tüm Kullanıcılar</p>
                    </div>
                </div>
                {users.length > 0 ? (
                    <div className="mt-8">
                        {users.length > 0 ? (
                            <AllUsersTable users={users} />
                        ) : (
                            <p className="text-center mt-8 text-gray-500">Henüz kullanıcı bulunmamaktadır.</p>
                        )}
                    </div>
                ) : (
                    <GlobalLoader text="Kullanıcılar yükleniyor..." />
                )}
            </div>
        </div>
    )
}