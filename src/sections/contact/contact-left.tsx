import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, MapPin, Phone, Shield, Users, Zap } from "lucide-react";

export function ContactLeft() {
    return (
        <div className="lg:col-span-1 space-y-8">

            <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Mail className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">E-posta</h3>
                                <p className="text-gray-600 mb-2">info@sirket.com</p>
                                <p className="text-sm text-gray-500">Genel sorular ve destek</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Phone className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Telefon</h3>
                                <p className="text-gray-600 mb-2">+90 (212) 555 0123</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <MapPin className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Adres</h3>
                                <p className="text-gray-600 mb-2">
                                    Maslak Mahallesi, Teknoloji Caddesi<br />
                                    No: 123, 34485 Sarıyer/İstanbul
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Building2 className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg">Kurumsal Müşteriler</CardTitle>
                    </div>
                    <CardDescription>
                        İşletmeniz için özel çözümler ve avantajlı fiyatlandırma
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { icon: Users, text: "Sınırsız kullanıcı hesabı" },
                            { icon: Zap, text: "Öncelikli teknik destek" },
                            { icon: Shield, text: "Gelişmiş güvenlik özellikleri" }
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                                <feature.icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                <span className="text-gray-700">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-2">
                        <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                            <Mail className="w-4 h-4" />
                            kurumsal@sirket.com
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}