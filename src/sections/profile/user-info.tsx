import { useTranslate } from '@/locales';
import { updateUser } from '@/services/user';
import { User as UserType } from '@/types/user';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';


interface UserInfoProps {
    user: UserType
}

export function UserInfo({ user }: UserInfoProps) {
    const { t } = useTranslate('profile')
    const [userData, setUserData] = useState({
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
        phone: user.phone
    });

    const handleProfileSave = async () => {
        try {
            const response = await updateUser({
                name: userData.firstName,
                surname: userData.lastName,
                phone: userData.phone
            });

            if (response) {
                toast.success(t('profileUpdated'), { duration: 3000 });
                window.location.reload();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Update failed:', error);

            let errorMessage = t('errorDesc');
            let errorTitle = error.response.data.message;
            if (error?.response?.status === 500) {
                errorTitle = t('errorServer');
                errorMessage = t('errorServerDesc');
            } else if (!navigator.onLine) {
                errorTitle = t('errorNavigator');
                errorMessage = t('errorNavigatorDesc');
            } else if (error?.code === 'NETWORK_ERROR') {
                errorTitle = t('errorNetwork');
                errorMessage = t('errorNetworkDesc');
            }

            toast.error(errorTitle, {
                description: errorMessage,
                duration: 5000,
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none'
                }
            });
        }
    };

    return (
        <div>
            <Card className="w-full shadow-none border-none bg-transparent order-1 font-onest">
                <CardContent className="p-0 space-y-4 sm:space-y-6">
                    {/* Avatar and Basic Info Header */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg">
                        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-center sm:text-left'>
                                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 flex-shrink-0">
                                    <AvatarFallback className="bg-purple-500 text-lg sm:text-xl lg:text-2xl">
                                        <User size={24} className='text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
                                    </AvatarFallback>
                                    <AvatarImage src="" />
                                </Avatar>
                                <div className="min-w-0">
                                    <h1 className='text-lg sm:text-xl lg:text-body2 font-onest text-gray-900 font-semibold break-words'>
                                        {user.name} {user.surname}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1 break-words">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <Button className='bg-gray-800 hover:bg-gray-900 w-full sm:w-auto flex-shrink-0'>
                                <span className='text-white text-sm sm:text-body3 font-onest'>
                                    {t('uploadPhoto')}
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* Profile Form Fields */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg">
                        <h2 className="text-lg sm:text-xl font-onest font-semibold text-gray-900 mb-4 sm:mb-6">
                            {t('personalInformation') || 'Kişisel Bilgiler'}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">
                                    {t('name')}
                                </Label>
                                <Input
                                    id="firstName"
                                    value={userData.firstName}
                                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                    className="h-10 sm:h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">
                                    {t('surname')}
                                </Label>
                                <Input
                                    id="lastName"
                                    value={userData.lastName}
                                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                    className="h-10 sm:h-11"
                                />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    {t('email')}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    disabled
                                    value={userData.email}
                                    className="h-10 sm:h-11"
                                />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="phone" className="text-sm font-medium">
                                    {t('phone')}
                                </Label>
                                <Input
                                    id="phone"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    className="h-10 sm:h-11"
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6 bg-fuchsia-400 hover:bg-fuchsia-700 h-10 sm:h-11 text-sm sm:text-base font-medium"
                            onClick={handleProfileSave}
                        >
                            {t('save')}
                        </Button>
                    </div>

                    
                </CardContent>
            </Card>
            <Toaster />
        </div>
    )
}