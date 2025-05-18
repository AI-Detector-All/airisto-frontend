import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AnalysisResults } from "@/types/analysis-results";
import { AlertCircle, BarChart3, Check, FileText, RefreshCw, Upload, X } from "lucide-react";
import React, { SetStateAction, useRef } from "react";

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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(null);

    const handleAnalyze = () => {
        if (!text.trim() && !uploadedFileName ) return;

        setIsAnalyzing(true);
        setActiveTab("results");

        setTimeout(() => {
            setResults(mockAnalysisResults);
            setIsAnalyzing(false);
        }, 1500);
    };

    const handleClear = () => {
        setText("");
        setResults(null);
        setActiveTab("input");
        setUploadedFileName(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadedFileName(file.name);
        setText("");
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Metin Analizi</CardTitle>
                    <CardDescription>Yapay zeka tarafından oluşturulan desenleri tespit etmek için metin girin veya dosya yükleyin</CardDescription>
                </CardHeader>
                <CardContent>
                    {uploadedFileName ? (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted-foreground/25 rounded-md bg-muted/50 relative">
                            <Button
                                onClick={handleClear}
                                className="absolute top-2 right-2 p-1 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                                aria-label="Dosyayı kaldır"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </Button>
                            <FileText className="w-16 h-16 mb-4 text-primary" />
                            <span className="text-lg font-medium">{uploadedFileName}</span>
                            <p className="text-sm text-muted-foreground mt-2">Dosya yüklendi ve analiz için hazır</p>
                        </div>
                    ) : (
                        <Textarea
                            value={text}
                            onChange={(e: { target: { value: SetStateAction<string> } }) => setText(e.target.value)}
                            placeholder="Enter or paste text to detect AI-generated content..."
                            className="w-full h-64 resize-none"
                        />
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".txt,.md,.doc,.docx,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {!uploadedFileName && `${text.length} karakter`}
                        {uploadedFileName && "Dosya analiz için hazır"}
                    </div>
                    <div className="flex gap-2">
                        {!uploadedFileName && (
                            <Button variant="outline" onClick={triggerFileInput}>
                                <Upload className="w-4 h-4 mr-2" />
                                Dosya Yükle
                            </Button>
                        )}
                        <Button variant="outline" onClick={handleClear} disabled={!text.trim() && !uploadedFileName}>
                            Temizle
                        </Button>
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || (!text.trim() && !uploadedFileName)}
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
    );
}