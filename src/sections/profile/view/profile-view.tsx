'use client';
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import UserProfileForm from "../profile-infos";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/ui/global-loader";

export default function ProfileView() {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading ) return <DashboardSkeleton />

    if (!isAuthenticated || !user) return <div>Please login to continue</div>

    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <div className="">
                <Link href={'/dashboard'} className="flex gap-2 items-center">
                    <ChevronLeft className="text-gray-600" />
                    <h1 className="text-body2 text-gray-600 font-onest">Ana Sayfa</h1>
                </Link>
                <p className="text-gray-900 text-header2 font-onest font-semibold mt-2"> Hesabım </p>
            </div>
            {user && <UserProfileForm user={user} />}
        </div>
    )
}