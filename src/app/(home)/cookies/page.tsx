'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, BarChart3, Shield, Globe, Trash2, RefreshCw } from 'lucide-react';
import { useTranslate } from '@/locales';


export default function CookiePolicyPage() {
    const { t } = useTranslate('cookie-policy');

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 font-onest">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Cookie className="h-16 w-16 text-primary" />
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
                    {/* What Are Cookies */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Cookie className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_1.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_1.intro')}</p>
                                <p>{t('section_1.description')}</p>
                                <p>{t('section_1.purpose')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Types of Cookies We Use */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Settings className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_2.title')}</h2>
                            </div>
                            <div className="space-y-6 text-muted-foreground">
                                {/* Essential Cookies */}
                                <div className="bg-muted/30 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Shield className="h-5 w-5 text-green-600" />
                                        <h3 className="font-semibold text-foreground">{t('section_2.essential.title')}</h3>
                                    </div>
                                    <p className="mb-2">{t('section_2.essential.description')}</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>{t('section_2.essential.examples.authentication')}</li>
                                        <li>{t('section_2.essential.examples.security')}</li>
                                        <li>{t('section_2.essential.examples.session_management')}</li>
                                        <li>{t('section_2.essential.examples.load_balancing')}</li>
                                    </ul>
                                    <p className="text-sm mt-2 text-green-600 font-medium">{t('section_2.essential.required')}</p>
                                </div>

                                {/* Analytics Cookies */}
                                <div className="bg-muted/30 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BarChart3 className="h-5 w-5 text-blue-600" />
                                        <h3 className="font-semibold text-foreground">{t('section_2.analytics.title')}</h3>
                                    </div>
                                    <p className="mb-2">{t('section_2.analytics.description')}</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>{t('section_2.analytics.examples.page_views')}</li>
                                        <li>{t('section_2.analytics.examples.user_behavior')}</li>
                                        <li>{t('section_2.analytics.examples.performance_metrics')}</li>
                                        <li>{t('section_2.analytics.examples.error_tracking')}</li>
                                    </ul>
                                    <p className="text-sm mt-2 text-blue-600 font-medium">{t('section_2.analytics.optional')}</p>
                                </div>

                                {/* Functional Cookies */}
                                <div className="bg-muted/30 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Settings className="h-5 w-5 text-purple-600" />
                                        <h3 className="font-semibold text-foreground">{t('section_2.functional.title')}</h3>
                                    </div>
                                    <p className="mb-2">{t('section_2.functional.description')}</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>{t('section_2.functional.examples.language_preference')}</li>
                                        <li>{t('section_2.functional.examples.theme_settings')}</li>
                                        <li>{t('section_2.functional.examples.dashboard_layout')}</li>
                                        <li>{t('section_2.functional.examples.notification_preferences')}</li>
                                    </ul>
                                    <p className="text-sm mt-2 text-purple-600 font-medium">{t('section_2.functional.optional')}</p>
                                </div>

                                {/* Marketing Cookies */}
                                <div className="bg-muted/30 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-5 w-5 text-orange-600" />
                                        <h3 className="font-semibold text-foreground">{t('section_2.marketing.title')}</h3>
                                    </div>
                                    <p className="mb-2">{t('section_2.marketing.description')}</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>{t('section_2.marketing.examples.ad_personalization')}</li>
                                        <li>{t('section_2.marketing.examples.conversion_tracking')}</li>
                                        <li>{t('section_2.marketing.examples.social_media')}</li>
                                        <li>{t('section_2.marketing.examples.remarketing')}</li>
                                    </ul>
                                    <p className="text-sm mt-2 text-orange-600 font-medium">{t('section_2.marketing.optional')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Third-Party Cookies */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_3.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_3.intro')}</p>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">{t('section_3.services.title')}</h3>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>{t('section_3.services.google_analytics')}</li>
                                            <li>{t('section_3.services.google_ads')}</li>
                                            <li>{t('section_3.services.intercom')}</li>
                                            <li>{t('section_3.services.hotjar')}</li>
                                            <li>{t('section_3.services.stripe')}</li>
                                        </ul>
                                    </div>
                                </div>
                                <p>{t('section_3.disclaimer')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cookie Duration */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <RefreshCw className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_4.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_4.intro')}</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                        <h3 className="font-semibold text-foreground mb-2">{t('section_4.session.title')}</h3>
                                        <p>{t('section_4.session.description')}</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                        <h3 className="font-semibold text-foreground mb-2">{t('section_4.persistent.title')}</h3>
                                        <p>{t('section_4.persistent.description')}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Managing Cookies */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Trash2 className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_5.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_5.intro')}</p>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">{t('section_5.browser_settings.title')}</h3>
                                        <p>{t('section_5.browser_settings.description')}</p>
                                        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                                            <li>{t('section_5.browser_settings.chrome')}</li>
                                            <li>{t('section_5.browser_settings.firefox')}</li>
                                            <li>{t('section_5.browser_settings.safari')}</li>
                                            <li>{t('section_5.browser_settings.edge')}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">{t('section_5.our_controls.title')}</h3>
                                        <p>{t('section_5.our_controls.description')}</p>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                    <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                                        {t('section_5.warning')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Updates to This Policy */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <RefreshCw className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{t('section_6.title')}</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>{t('section_6.intro')}</p>
                                <p>{t('section_6.notification')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}