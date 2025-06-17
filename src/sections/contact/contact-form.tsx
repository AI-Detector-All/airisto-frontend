'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Building2, CheckCircle2, MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        customerType: 'individual',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Mesajınız başarıyla gönderildi!');
        }, 1000);
    };

    return (
        <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        Mesaj Gönderin
                    </CardTitle>
                    <CardDescription className="text-base">
                        Formu doldurun, size en kısa sürede dönüş yapalım. Kurumsal müşterilerimiz için özel çözümler sunuyoruz.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">

                        {/* Müşteri Tipi Seçimi */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Müşteri Tipi</Label>
                            <div className="flex gap-4">
                                <div
                                    className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.customerType === 'individual'
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setFormData({ ...formData, customerType: 'individual' })}
                                >
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-purple-600" />
                                        <div>
                                            <p className="font-medium">Bireysel</p>
                                            <p className="text-sm text-gray-500">Kişisel kullanım</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.customerType === 'corporate'
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setFormData({ ...formData, customerType: 'corporate' })}
                                >
                                    <div className="flex items-center gap-3">
                                        <Building2 className="w-5 h-5 text-purple-600" />
                                        <div>
                                            <p className="font-medium">Kurumsal</p>
                                            <p className="text-sm text-gray-500">İşletme için</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">
                                    Ad *
                                </Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Adınız"
                                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">
                                    Soyad *
                                </Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Soyadınız"
                                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    E-posta Adresi *
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="ornek@email.com"
                                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">
                                    Telefon
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+90 (555) 123 45 67"
                                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                                />
                            </div>
                        </div>

                        {formData.customerType === 'corporate' && (
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-medium">
                                    Şirket Adı *
                                </Label>
                                <Input
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="ABC Teknoloji A.Ş."
                                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                                    required={formData.customerType === 'corporate'}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-sm font-medium">
                                Konu *
                            </Label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                                required
                            >
                                <option value="">Konu seçiniz</option>
                                <option value="general">Genel Bilgi</option>
                                <option value="support">Teknik Destek</option>
                                <option value="sales">Satış ve Fiyatlandırma</option>
                                <option value="corporate">Kurumsal Çözümler</option>
                                <option value="partnership">İş Ortaklığı</option>
                                <option value="other">Diğer</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm font-medium">
                                Mesajınız *
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder={formData.customerType === 'corporate'
                                    ? "Kurumsal ihtiyaçlarınız, ekip büyüklüğünüz ve beklentileriniz hakkında bize bilgi verin..."
                                    : "Sorularınız, önerileriniz veya ihtiyaçlarınız hakkında bize bilgi verin..."
                                }
                                className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 min-h-[120px]"
                                rows={5}
                                required
                            />
                        </div>

                        {formData.customerType === 'corporate' && (
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="flex items-start gap-3">
                                    <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-purple-800 mb-1">Kurumsal Müşteri Avantajları</h4>
                                        <p className="text-sm text-purple-700 mb-2">
                                            Size özel fiyatlandırma, esnek ödeme seçenekleri ve özel hesap yöneticisi desteği sunuyoruz.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg font-medium group disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Mesajı Gönder
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                {formData.customerType === 'corporate'
                                    ? '24 saat içinde geri dönüş garantisi'
                                    : '48 saat içinde yanıtlıyoruz'
                                }
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}