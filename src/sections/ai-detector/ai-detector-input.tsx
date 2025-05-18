import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AnalysisResults } from "@/types/analysis-results";
import { AlertCircle, BarChart3, Check, RefreshCw } from "lucide-react";
import { SetStateAction } from "react";

// Mock data for AI detection results
const mockAnalysisResults = {
    score: 78,
    summary: "Bu metin öncelikle yapay zeka tarafından oluşturulmuş gibi görünüyor",
    chartData: [
        { position: 0, score: 65 },
        { position: 10, score: 75 },
        { position: 20, score: 90 },
        { position: 30, score: 85 },
        { position: 40, score: 70 },
        { position: 50, score: 65 },
        { position: 60, score: 80 },
        { position: 70, score: 95 },
        { position: 80, score: 75 },
        { position: 90, score: 70 },
        { position: 100, score: 80 },
    ],
    indicators: [
        {
            type: "Örüntü Tanıma",
            score: 82,
            description: "Tekrarlayan cümle yapıları ve yapay zeka üretimine özgü öngörülebilir geçişler",
            icon: BarChart3
        },
        {
            type: "Kelime Analizi",
            score: 75,
            description: "Sınırlı deyimsel ifadeler ile doğal olarak tutarlı olmayan kelime dağarcığı",
            icon: AlertCircle
        },
        {
            type: "Anlamsal Tutarlılık",
            score: 65,
            description: "İçerik konu bütünlüğünü koruyor ancak genel bilgi yoğunluğu belirtileri gösteriyor",
            icon: Check
        },
        {
            type: "İstatistiksel Modeller",
            score: 90,
            description: "Kelime sıklığı dağılımı, bilinen yapay zeka metin oluşturma modelleriyle yakından eşleşiyor",
            icon: BarChart3
        }
    ]
};

interface AIDetectorInputProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    isAnalyzing: boolean;
    setIsAnalyzing: React.Dispatch<React.SetStateAction<boolean>>;
    setResults: React.Dispatch<React.SetStateAction<AnalysisResults | null>>;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function AIDetectorInput({ text, setText, isAnalyzing, setIsAnalyzing, setResults, setActiveTab }: AIDetectorInputProps) {
    const handleAnalyze = () => {
        if (!text.trim()) return;

        setIsAnalyzing(true);
        setActiveTab("results");

        // Simulate analysis delay
        setTimeout(() => {
            setResults(mockAnalysisResults);
            setIsAnalyzing(false);
        }, 1500);
    };

    const handleClear = () => {
        setText("");
        setResults(null);
        setActiveTab("input");
    };
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Metin Analizi </CardTitle>
                    <CardDescription>Yapay zeka tarafından oluşturulan desenleri tespit etmek için içerik yapıştırın veya yazın</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={text}
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value)}
                        placeholder="Enter or paste text to detect AI-generated content..."
                        className="w-full h-64 resize-none"
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {text.length} karakter
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleClear} disabled={!text.trim()}>
                            Temizle
                        </Button>
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !text.trim()}
                        >
                            {isAnalyzing ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Analiz Ediliyor...
                                </>
                            ) : (
                                "Analiz Et"
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}