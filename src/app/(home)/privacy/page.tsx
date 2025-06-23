'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, Globe, FileText } from 'lucide-react';
import { useTranslate } from '@/locales';


export default function Page() {
    const { t } = useTranslate('privacy-policy');
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Shield className="h-16 w-16 text-primary" />
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
                                <Database className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_1.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_1.intro')}</p>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {t('section_1.personal_info.title')}
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>{t('section_1.personal_info.name')}</li>
                                            <li>{t('section_1.personal_info.email')}</li>
                                            <li>{t('section_1.personal_info.phone')}</li>
                                            <li>{t('section_1.personal_info.company')}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {t('section_1.usage_data.title')}
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>{t('section_1.usage_data.ip_address')}</li>
                                            <li>{t('section_1.usage_data.browser_info')}</li>
                                            <li>{t('section_1.usage_data.pages_visited')}</li>
                                            <li>{t('section_1.usage_data.time_spent')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_2.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_2.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_2.purposes.service_provision')}</li>
                                    <li>{t('section_2.purposes.customer_support')}</li>
                                    <li>{t('section_2.purposes.communication')}</li>
                                    <li>{t('section_2.purposes.improvements')}</li>
                                    <li>{t('section_2.purposes.legal_compliance')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_3.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_3.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_3.cases.service_providers')}</li>
                                    <li>{t('section_3.cases.legal_requirements')}</li>
                                    <li>{t('section_3.cases.business_transfer')}</li>
                                    <li>{t('section_3.cases.consent')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_4.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_4.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_4.measures.encryption')}</li>
                                    <li>{t('section_4.measures.access_controls')}</li>
                                    <li>{t('section_4.measures.regular_audits')}</li>
                                    <li>{t('section_4.measures.staff_training')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_5.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_5.intro')}</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('section_5.rights.access')}</li>
                                    <li>{t('section_5.rights.correction')}</li>
                                    <li>{t('section_5.rights.deletion')}</li>
                                    <li>{t('section_5.rights.portability')}</li>
                                    <li>{t('section_5.rights.objection')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}