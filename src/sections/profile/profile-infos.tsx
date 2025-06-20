'use client';
import { User as UserType } from '@/types/user';
import { UserInfo } from './user-info';
import { RolesEnum } from '@/enums/roles';
import { CorporateInfo } from './corporate-info';
import { PasswordChange } from './password-change';

interface UserProfileProps {
    user: UserType
}

export default function UserProfileForm({ user }: UserProfileProps) {


    return (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full mx-auto p-2 sm:p-4">
            <div className='w-full'>
                <UserInfo user={user} />

                {user.role === RolesEnum.INSTITUTION_ADMIN && (
                    <CorporateInfo user={user} />
                )}
            </div>

            {/* Password change */}
            <div className='w-full'>
                <PasswordChange />
            </div>
        </div>
    );
}