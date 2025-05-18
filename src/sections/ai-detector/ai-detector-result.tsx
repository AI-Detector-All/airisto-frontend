import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnalysisResults } from "@/types/analysis-results"
import { Info, RefreshCw } from "lucide-react"
import AIDetectionRadarChart from "./ai-detector-chart"

interface AIDetectorResultProps {
    isAnalyzing: boolean
    results?: AnalysisResults | null
}
export function AIDetectorResult({ isAnalyzing, results }: AIDetectorResultProps) {
    const getColorBasedOnScore = (score: number) => {
        if (score > 70) return "destructive";
        if (score > 40) return "secondary";
        return "default";
    };

    return (
        <div>
            {isAnalyzing ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center p-12">
                            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Analiz Ediliyor</h3>
                            <p className="text-muted-foreground mb-6">
                                Yapay zeka algılama sistemimiz metninizi işliyor. Bu sadece bir kaç dakika sürer...
                            </p>
                            <Progress value={45} className="w-full max-w-md" />
                        </div>
                    </CardContent>
                </Card>
            ) : !results ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center p-12">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <Info className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Yapay Zeka Metin Tespiti</h3>
                            <p className="text-muted-foreground mb-6">
                                Yapay zeka tarafından oluşturulan kalıplar için içeriği analiz etmek üzere düzenleyiciye metin yapıştırın. Gelişmiş algoritmamız yapay zeka yazarlığı olasılığını değerlendirecektir.
                            </p>
                            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h4 className="font-medium mb-1">Doğruluk</h4>
                                        <p className="text-sm text-muted-foreground">Birden fazla yapay zeka modelinde yüksek hassasiyetli algılama</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <h4 className="font-medium mb-1">Grafik Sonuçları</h4>
                                        <p className="text-sm text-muted-foreground"> Gelişmiş algoritmamız yapay zeka yazarlığı olasılığını değerlendirecektir. </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Analiz Sonuçları</CardTitle>
                                <Badge variant={getColorBasedOnScore(results.score)}>
                                    {results.score}% Yapay Zeka İçeriği
                                </Badge>
                            </div>
                            <CardDescription>{results.summary}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-3">İçerik Değerlendirmesi</h4>
                                    <div className="flex flex-col items-center justify-center text-center p-4 border rounded-lg">
                                        <div className="text-6xl font-bold text-primary mb-2">{results.score}%</div>
                                        <p className="text-muted-foreground">Yapay zeka tarafından oluşturulan içerik olasılığı</p>
                                        <Progress
                                            value={results.score}
                                            className={`w-full mt-4 ${results.score > 70 ? "bg-red-500" : results.score > 40 ? "bg-yellow-500" : "bg-green-500"}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tespit Göstergeleri</CardTitle>
                            <CardDescription>Analiz edilen metinde tespit edilen spesifik kalıplar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AIDetectionRadarChart isAnalyzing={isAnalyzing} results={results} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}