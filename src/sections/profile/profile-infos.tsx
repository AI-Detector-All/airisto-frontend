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
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full mx-auto p-2 sm:p-4">
            {/* Profile Information Card */}
            <Card className="w-full shadow-none border-none bg-transparent order-1">
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
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="address" className="text-sm font-medium">
                                    {t('address')}
                                </Label>
                                <Input
                                    id="address"
                                    value={userData.address}
                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                    placeholder="Enter your address"
                                    className="h-10 sm:h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postalCode" className="text-sm font-medium">
                                    {t('postalCode')}
                                </Label>
                                <Input
                                    id="postalCode"
                                    value={userData.postalCode}
                                    onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                                    className="h-10 sm:h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-medium">
                                    {t('state')}
                                </Label>
                                <Input
                                    id="city"
                                    value={userData.city}
                                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                                    className="h-10 sm:h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-sm font-medium">
                                    {t('district')}
                                </Label>
                                <Input
                                    id="state"
                                    value={userData.state}
                                    onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                                    className="h-10 sm:h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-sm font-medium">
                                    {t('country')}
                                </Label>
                                <Select defaultValue={userData.country}>
                                    <SelectTrigger className='w-full h-10 sm:h-11'>
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
                            className="w-full mt-6 bg-fuchsia-400 hover:bg-fuchsia-700 h-10 sm:h-11 text-sm sm:text-base font-medium"
                            onClick={handleProfileSave}
                        >
                            {t('save')}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Password Change Card */}
            <Card className="w-full shadow-none border-none bg-transparent order-2 lg:order-2">
                <CardContent className="p-0">
                    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg space-y-4 sm:space-y-6">
                        <div className="border-b border-gray-100 pb-3 sm:pb-4">
                            <h2 className='text-lg sm:text-xl lg:text-header4 text-gray-900 font-onest font-semibold'>
                                {t('changePassword')}
                            </h2>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="text-sm font-medium">
                                    {t('currentPassword')}
                                </Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className='bg-gray-50 h-10 sm:h-11 border-gray-200 focus:border-gray-400'
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-medium">
                                    {t('newPassword')}
                                </Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className='bg-gray-50 h-10 sm:h-11 border-gray-200 focus:border-gray-400'
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {t('passwordRequirements') || 'En az 8 karakter, büyük/küçük harf ve rakam içermeli'}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                    {t('newPasswordRepeat')}
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className={`bg-gray-50 h-10 sm:h-11 border-gray-200 focus:border-gray-400 ${
                                        confirmPassword && newPassword !== confirmPassword 
                                            ? 'border-red-300 focus:border-red-400' 
                                            : ''
                                    }`}
                                />
                                {confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {t('passwordDoesntMatch')}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6 bg-gray-800 hover:bg-slate-900 h-10 sm:h-11 text-sm sm:text-base font-medium"
                            onClick={handlePasswordSave}
                            disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                        >
                            {t('save')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}