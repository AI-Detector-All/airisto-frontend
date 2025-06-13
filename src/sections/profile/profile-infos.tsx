'use client';
import { useState } from 'react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import {
    Input
} from '@/components/ui/input';
import {
    Button
} from '@/components/ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { User } from 'lucide-react';
import { User as UserType } from '@/types/user';
import { useTranslate } from '@/locales';

interface UserProfileProps {
    user: UserType
}

export default function UserProfileForm({ user }: UserProfileProps) {
    const { t } = useTranslate('profile')
    const [userData, setUserData] = useState({
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
        phone: user.phone,
        address: 'Fırat Üniversitesi',
        city: 'Elazığ',
        postalCode: '10001',
        state: 'Merkez',
        country: 'Türkiye'
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleProfileSave = () => {
        alert(t('success'));
    };

    const handlePasswordSave = () => {
        if (newPassword !== confirmPassword) {
            alert(t('passwordDoesntMatch'));
            return;
        }

        alert(t('successPassword'));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full mx-auto p-4">
            {/* Profile Card */}
            <Card className="w-full shadow-none border-none bg-transparent">
                <CardContent className="">
                    <div className="flex items-center justify-between mb-6 bg-white p-6 rounded-lg">
                        <div className='flex gap-2 items-center'>
                            <Avatar className="h-24 w-24 mb-2">
                                <AvatarFallback className="bg-purple-500 text-2xl">
                                    <User size={32} className='text-white' />
                                </AvatarFallback>
                                <AvatarImage src="" />
                            </Avatar>
                            <h1 className='text-body2 font-onest text-gray-900 font-semibold'> {user.name} {user.surname} </h1>
                        </div>
                        <Button className='bg-gray-800 '> <span className='text-white text-body3 font-onest'> {t('uploadPhoto')} </span> </Button>
                    </div>

                </CardContent>

                {/* Inputs */}
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">{t('name')}</Label>
                            <Input
                                id="firstName"
                                value={userData.firstName}
                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">{t('surname')}</Label>
                            <Input
                                id="lastName"
                                value={userData.lastName}
                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">{t('email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">{t('phone')}</Label>
                            <Input
                                id="phone"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">{t('address')}</Label>
                            <Input
                                id="address"
                                value={userData.address}
                                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="postalCode">{t('postalCode')}</Label>
                            <Input
                                id="postalCode"
                                value={userData.postalCode}
                                onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city">{t('state')}</Label>
                            <Input
                                id="city"
                                value={userData.city}
                                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="state">{t('district')}</Label>
                            <Input
                                id="state"
                                value={userData.state}
                                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="country">{t('country')}</Label>
                            <Select defaultValue={userData.country}  >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Türkiye">Türkiye</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="Germany">Germany</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button
                        className="w-full mt-6 bg-fuchsia-400 hover:bg-fuchsia-700"
                        onClick={handleProfileSave}
                    >
                        {t('save')}
                    </Button>
                </CardContent>

            </Card>

            {/* Password Card */}
            <Card className="w-full shadow-none border-none bg-transparent">
                <CardContent className="space-y-4 bg-white p-8 rounded-lg">
                    <h1 className='text-header4 text-gray-900 font-onest font-semibold'> {t('changePassword')} </h1>
                    <div className="space-y-2 mt-8">
                        <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••••••••••"
                            className='bg-gray-50'
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">{t('newPassword')}</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••••••••••"
                            className='bg-gray-50'
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">{t('newPasswordRepeat')}</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••••••••••"
                            className='bg-gray-50'
                        />
                    </div>

                    <Button
                        className="w-full mt-6 bg-gray-800 hover:bg-slate-900"
                        onClick={handlePasswordSave}
                    >
                        {t('save')}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}