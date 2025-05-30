import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { newAnalyze } from "@/services/analysis";
import { AnalysisResults } from "@/types/analysis";
import { FileText, RefreshCw, Upload, X } from "lucide-react";
import React, { SetStateAction, useRef } from "react";


interface AIDetectorInputProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    isAnalyzing: boolean;
    setIsAnalyzing: React.Dispatch<React.SetStateAction<boolean>>;
    setResults: React.Dispatch<React.SetStateAction<AnalysisResults | null>>;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function AIDetectorInput({ text, setText, isAnalyzing, setIsAnalyzing, setResults, setActiveTab, title, setTitle }: AIDetectorInputProps) {
    const { user, isLoading, refreshUserData } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFileName, setUploadedFileName] = React.useState<File | null>(null);

    if (isLoading) return <DashboardSkeleton />

    const handleAnalyze = async() => {
        if (!text.trim() && !uploadedFileName) return;
        setIsAnalyzing(true);
        setActiveTab("results");

        const response = await newAnalyze(user?.corporate ?? undefined, title, text, uploadedFileName ?? undefined);
        console.log(response);
        
        if (!response) return;

        setResults(response);
        setIsAnalyzing(false);
        refreshUserData();
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

        setUploadedFileName(file);
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
                            <span className="text-lg font-medium">{uploadedFileName.name}</span>
                            <p className="text-sm text-muted-foreground mt-2">Dosya yüklendi ve analiz için hazır</p>
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Lütfen bir başlık girin"
                                className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={title}
                                required
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                            />
                            <Textarea
                                value={text}
                                required
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setText(e.target.value)}
                                placeholder="Lütfen analiz yapmak istediğiniz metni girin veya dosya yükleyin"
                                className="w-full h-64 resize-none mt-2"
                            />

                        </>
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