'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, User, CheckCircle, ChevronLeft } from 'lucide-react';
import { CorporateForm } from '../corporate-form';
import { UserForm } from '../user-form';
import { corporateSignUp } from '@/services/auth';
import Link from 'next/link';

export const CreateCorporateView = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [corporateData, setCorporateData] = useState({
        name: '',
        domain: '',
        isActive: false
    });
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        type: 'CORPORATE',
        provider: 'LOCAL',
        isActive: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);


    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!userData.email.trim()) {
            newErrors.email = 'E-posta gereklidir';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = 'Geçerli bir e-posta adresi giriniz';
        }
        if (!userData.name.trim()) {
            newErrors.name = 'Ad gereklidir';
        }
        if (!userData.surname.trim()) {
            newErrors.surname = 'Soyad gereklidir';
        }
        if (!userData.password.trim()) {
            newErrors.password = 'Şifre gereklidir';
        } else if (userData.password.length < 6) {
            newErrors.password = 'Şifre en az 6 karakter olmalıdır';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {

        if (!validateStep2()) return;
        console.log("Step 2 data:", userData, corporateData);

        setIsSubmitting(true);
        try {
            const response = await corporateSignUp(userData, corporateData);

            if (!response.user || !response.corporate) {
                throw new Error('Kullanıcı veya kurum oluşturulamadı');
            }

            setSubmitSuccess(true);
            setTimeout(() => {
                setCorporateData({ name: '', domain: '', isActive: true });
                setUserData({
                    email: '', name: '', surname: '', password: '', type: 'CORPORATE',
                    isActive: true, provider: 'LOCAL'
                });
                setCurrentStep(1);
                setSubmitSuccess(false);
            }, 3000);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrors({ submit: error.message });
            } else {
                setErrors({ submit: 'An unknown error occurred' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Başarıyla Oluşturuldu!</h3>
                            <p className="text-gray-600 mb-4">
                                Kurum ve kullanıcı başarıyla eklendi. Yeni kayıt için yönlendiriliyorsunuz...
                            </p>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <div className="w-full px-8 flex flex-col ">
                {/* Header */}
                <div>
                    <Link href={'/dashboard'} className="flex gap-2 items-center">
                        <ChevronLeft className="text-gray-600" />
                        <h1 className="text-body2 text-gray-600 font-onest">Ana Sayfa</h1>
                    </Link>
                    <p className="text-gray-900 text-header2 font-onest font-semibold mt-2">Tüm Kurumlar</p>
                </div>

                <div className='w-full flex flex-col justify-center items-center font-onest'>
                    <div className="mb-8 w-2/3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    <Building2 className="h-4 w-4" />
                                </div>
                                <span className={`ml-2 text-sm font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
                                    }`}>
                                    Kurum Bilgileri
                                </span>
                            </div>

                            <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'
                                }`}></div>

                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    <User className="h-4 w-4" />
                                </div>
                                <span className={`ml-2 text-sm font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
                                    }`}>
                                    Kullanıcı Ataması
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='w-2/3'>
                        {currentStep === 1 && (
                            <CorporateForm setCurrentStep={setCurrentStep} corporateData={corporateData} setCorporateData={setCorporateData} />
                        )}

                        {currentStep === 2 && (
                            <UserForm userData={userData} setUserData={setUserData} corporateData={corporateData} setCurrentStep={setCurrentStep} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
                        )}
                    </div>

                </div>


            </div>
        </div>
    );
};

export default CreateCorporateView;