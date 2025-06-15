'use client';
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton, GlobalLoader } from "@/components/ui/global-loader";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/user";
import { AllUsersTable } from "../all-users-table";
import { useTranslate } from "@/locales";

export default function AllUsersView() {
    const { t } = useTranslate('all-users');
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
        <div className="bg-gray-100 w-full min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col">
                {/* Header Section */}
                <div className="flex justify-between items-start sm:items-center mb-6 sm:mb-8">
                    <div className="flex-1">
                        <Link href={'/dashboard'} className="flex gap-2 items-center">
                            <ChevronLeft className="text-gray-600 h-4 w-4 sm:h-5 sm:w-5" />
                            <h1 className="text-sm sm:text-body2 text-gray-600 font-onest">{t('home')}</h1>
                        </Link>
                        <p className="text-gray-900 text-xl sm:text-2xl lg:text-header2 font-onest font-semibold mt-2">
                            {t('allUsers')}
                        </p>
                    </div>
                </div>

                {users.length > 0 ? (
                    <div className="space-y-4">

                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            
                            <div className="overflow-x-auto">
                                <AllUsersTable users={users} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <GlobalLoader text={t('usersLoading')} />
                            
                            <div className="sm:hidden">
                                <p className="text-xs text-gray-500">
                                    {t('loadingDesc') || 'Kullanıcı verileri yükleniyor...'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {users.length === 0 && !isLoading && (
                    <div className="flex-1 flex items-center justify-center py-12">
                        <div className="text-center space-y-4">
                            <div className="text-gray-400">
                                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                {t('noUsers') || 'Kullanıcı bulunamadı'}
                            </h3>
                            <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                {t('noUsersDesc') || 'Henüz sistemde kayıtlı kullanıcı bulunmuyor.'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}