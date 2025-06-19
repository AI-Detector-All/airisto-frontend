import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { useTranslate } from '@/locales';
import { updateCorporate } from '@/services/corporate';
import { Corporate } from '@/types/corporates';
import { User as UserType } from '@/types/user';
import { useState } from 'react';
import { toast } from 'sonner';

interface CorporateInfoProps {
    user: UserType
}


export function CorporateInfo({ user }: CorporateInfoProps) {
    const { t } = useTranslate('profile')

    const [corporateData, setCorporateData] = useState<Corporate>({
        id: user.corporate?.id || '',
        name: user.corporate?.name || '',
        domain: user.corporate?.domain || '',
        subscription: user.corporate?.subscription || null,
        members: user.corporate?.members || [],
        isActive: user.corporate?.isActive || false,
        totalUsedAnalyses: user.corporate?.totalUsedAnalyses || 0,
        createdAt: user.corporate?.createdAt || new Date(),
        updatedAt: user.corporate?.updatedAt || new Date(),
        country: user.corporate?.country || '',
        city: user.corporate?.city || '',
        state: user.corporate?.state || '',
        address: user.corporate?.address || '',
        postalCode: user.corporate?.postalCode || ''
    });


    const handleCorporateSave = async () => {
        try {
            const response = await updateCorporate(corporateData.id, corporateData);

            if (response) {
                toast.success(t('corporateUpdated'), { duration: 3000 });
                window.location.reload();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('update failed:', error);

            let errorMessage = t('errorDesc');
            let errorTitle = t('errorTitle');

            if (error?.response?.status === 400) {
                errorTitle = t('errorInvalidSignUp');
                errorMessage = t('errorInvalidSignUpDesc');
            } else if (error?.response?.status === 500) {
                errorTitle = t('errorServer');
                errorMessage = t('errorServerDesc');
            } else if (error?.response?.status === 404) {
                errorTitle = t('errorUserNotFound');
                errorMessage = t('errorUserNotFoundDesc');
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
        <div className="bg-white p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-onest font-semibold text-gray-900 mb-4 sm:mb-6">
                {t('corporateInformation') || 'Kurumsal Bilgiler'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                    <Label htmlFor="corporateName" className="text-sm font-medium">
                        {t('corporateName') || 'Kuruluş Adı'}
                    </Label>
                    <Input
                        id="corporateName"
                        value={corporateData.name}
                        onChange={(e) => setCorporateData({ ...corporateData, name: e.target.value })}
                        className="h-10 sm:h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="domain" className="text-sm font-medium">
                        {t('Domain') || 'Domain'}
                    </Label>
                    <Input
                        id="domain"
                        value={corporateData.domain}
                        disabled
                        onChange={(e) => setCorporateData({ ...corporateData, domain: e.target.value })}
                        className="h-10 sm:h-11"
                    />
                </div>

                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="corporateAddress" className="text-sm font-medium">
                        {t('address')}
                    </Label>
                    <Input
                        id="corporateAddress"
                        value={corporateData.address}
                        onChange={(e) => setCorporateData({ ...corporateData, address: e.target.value })}
                        placeholder="Enter corporate address"
                        className="h-10 sm:h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="corporatePostalCode" className="text-sm font-medium">
                        {t('postalCode')}
                    </Label>
                    <Input
                        id="corporatePostalCode"
                        value={corporateData.postalCode}
                        onChange={(e) => setCorporateData({ ...corporateData, postalCode: e.target.value })}
                        className="h-10 sm:h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="corporateCity" className="text-sm font-medium">
                        {t('city') || 'Şehir'}
                    </Label>
                    <Input
                        id="corporateCity"
                        value={corporateData.city}
                        onChange={(e) => setCorporateData({ ...corporateData, city: e.target.value })}
                        className="h-10 sm:h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="corporateState" className="text-sm font-medium">
                        {t('state') || 'İlçe'}
                    </Label>
                    <Input
                        id="corporateState"
                        value={corporateData.state}
                        onChange={(e) => setCorporateData({ ...corporateData, state: e.target.value })}
                        className="h-10 sm:h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="corporateCountry" className="text-sm font-medium">
                        {t('country')}
                    </Label>
                    <Select
                        value={corporateData.country}
                        onValueChange={(value) => setCorporateData({ ...corporateData, country: value })}
                    >
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
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 h-10 sm:h-11 text-sm sm:text-base font-medium"
                onClick={handleCorporateSave}
            >
                {t('saveCorporate') || 'Kurumsal Bilgileri Kaydet'}
            </Button>
            <Toaster />
        </div>
    )
}