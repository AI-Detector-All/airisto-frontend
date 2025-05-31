'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building2, 
  AlertTriangle, 
  Mail,
  Clock, 
  Shield,
  Users,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Page() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useAuth();
  
  const corporateInfo = user?.corporate

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    // API call to check corporate status
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleContactSupport = () => {
    window.open('mailto:destek@firma.com?subject=Kurum Aktivasyon Sorunu&body=Merhaba, kurumumuz aktif değil ve sisteme erişim sağlayamıyorum.', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Main Alert Card */}
        <Card className="border-red-200 shadow-lg">
          <CardHeader className="text-center bg-red-50 rounded-t-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">
              Erişim Kısıtlandı
            </CardTitle>
            <CardDescription className="text-red-600 text-lg">
              Kurumunuz şu anda aktif değil
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <Alert className="border-amber-200 bg-amber-50">
              <Shield className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>@{corporateInfo?.domain}</strong> uzantılı email adresiniz <strong>{corporateInfo?.name}</strong> kurumuna bağlıdır. 
                Kurumunuzun aboneliği aktif olmadığı için sisteme erişim sağlayamazsınız.
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-gray-600" />
                Kurum Bilgileri
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Kurum Adı:</span>
                  <div className="font-medium">{corporateInfo?.name}</div>
                </div>
                <div>
                  <span className="text-gray-600">Domain:</span>
                  <div className="font-medium text-blue-600">{corporateInfo?.domain}</div>
                </div>
                <div>
                  <span className="text-gray-600">Yönetici:</span>
                  <div className="font-medium">{"Yönetici"}</div>
                </div>
                <div>
                  <span className="text-gray-600">Durum:</span>
                  <Badge variant="destructive" className="ml-1">İnaktif</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Ne yapmalısınız?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-900">Kurum Yöneticinizle İletişime Geçin</div>
                    <div className="text-sm text-blue-700 mt-1">
                      Kurumunuzun abonelik durumu hakkında bilgi almak için yöneticiniz <strong>{"Yönetici"}</strong> ile iletişime geçin.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-900">Email Gönder</div>
                    <div className="text-sm text-green-700 mt-1">
                      Doğrudan kurum yöneticinize email gönderin: 
                      <a 
                        href={`mailto:${"yöneticiemail"}?subject=Sistem Erişim Sorunu&body=Merhaba, sistemе erişim sağlayamıyorum. Kurum aboneliği ile ilgili bilgi alabilir miyim?`}
                        className="text-green-800 hover:underline font-medium ml-1"
                      >
                        {"yöneticiemail"}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-purple-900">Aktivasyon Bekleyin</div>
                    <div className="text-sm text-purple-700 mt-1">
                      Kurum yöneticiniz abonelik işlemlerini tamamladıktan sonra sisteme otomatik olarak erişim sağlayabileceksiniz.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleRefreshStatus}
                disabled={isRefreshing}
                className="flex-1"
                variant="outline"
              >
                {isRefreshing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Durumu Yenile
              </Button>
              
              <Button 
                onClick={() => window.open(`mailto:${"yöneticiemail"}?subject=Sistem Erişim Sorunu&body=Merhaba ${"yöneticiemail"}, sistemе erişim sağlayamıyorum. Kurum aboneliği ile ilgili bilgi alabilir miyim?`, '_blank')}
                className="flex-1"
              >
                <Mail className="mr-2 h-4 w-4" />
                Yönetici ile İletişim
              </Button>
            </div>
            <div className="border-t pt-4 mt-6">
              <div className="text-center text-sm text-gray-600">
                Acil durumlarda teknik destek ekibimizle iletişime geçebilirsiniz
              </div>
              <div className="flex justify-center mt-2">
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={handleContactSupport}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Teknik Destek
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}