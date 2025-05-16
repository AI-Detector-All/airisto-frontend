import { Card, CardContent } from "@/components/ui/card";
import { FileText, } from "lucide-react";

export function HomeContent() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 py-8 lg:mt-32">
      <h1 className="text-header font-onest font-bold text-center mb-2">Yapay Zeka İçerik Dedektifi</h1>
      <p className="text-center text-gray-600 mb-8">
        Yapay zeka tarafından oluşturulan içeriği tespit etmek ve dakikalar içinde orijinalliği sağlamak için hepsi bir arada platform
      </p>

      <div className="relative w-full">

        <div className="flex space-x-4 w-full overflow-hidden">
          <Card className="flex-1 min-w-[260px] bg-gradient-to-r from-purple-500 to-orange-500 overflow-hidden">
            <div className="bg-white rounded">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-orange-400 flex items-center justify-center rounded-lg mb-3">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Yapay Zeka Metin Dedektörü</h3>
                <p className="text-gray-600 text-sm">
                  Yapay zeka tarafından oluşturulup oluşturulmadıklarını doğrulamak için metinleri, belgeleri ve makaleleri analiz edin.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}