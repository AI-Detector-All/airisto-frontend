'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, User, AlertTriangle, CreditCard, Shield, Ban, RefreshCw } from 'lucide-react';
import { useTranslate } from '@/locales';

export default function Page() {
    const { t } = useTranslate('terms-of-service');
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Scale className="h-16 w-16 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
                    <p className="text-muted-foreground text-lg">
                        {t('subtitle')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        {t('last_updated')}: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <User className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_1.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_1.intro')}</p>
                                <p>{t('section_1.agreement')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_2.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_2.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_2.features.ai_automation')}</li>
                                    <li>{t('section_2.features.workflow_optimization')}</li>
                                    <li>{t('section_2.features.data_analysis')}</li>
                                    <li>{t('section_2.features.integration_tools')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_3.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_3.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_3.responsibilities.accurate_info')}</li>
                                    <li>{t('section_3.responsibilities.account_security')}</li>
                                    <li>{t('section_3.responsibilities.lawful_use')}</li>
                                    <li>{t('section_3.responsibilities.respect_rights')}</li>
                                    <li>{t('section_3.responsibilities.no_harmful_content')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CreditCard className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_4.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_4.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_4.terms.subscription_based')}</li>
                                    <li>{t('section_4.terms.payment_methods')}</li>
                                    <li>{t('section_4.terms.auto_renewal')}</li>
                                    <li>{t('section_4.terms.price_changes')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Ban className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_5.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_5.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_5.prohibited.illegal_activities')}</li>
                                    <li>{t('section_5.prohibited.malicious_content')}</li>
                                    <li>{t('section_5.prohibited.reverse_engineering')}</li>
                                    <li>{t('section_5.prohibited.spam_abuse')}</li>
                                    <li>{t('section_5.prohibited.interference')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_6.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_6.intro')}</p>
                                <p>{t('section_6.user_content')}</p>
                                <p>{t('section_6.license_grant')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <RefreshCw className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_7.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_7.intro')}</p>
                                <p>{t('section_7.notification')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_8.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_8.intro')}</p>
                                <p>{t('section_8.disclaimer')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}