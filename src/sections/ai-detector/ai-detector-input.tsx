import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/locales";
import { newAnalyze } from "@/services/analysis";
import { AnalysisResults } from "@/types/analysis";
import { FileText, RefreshCw, Upload, X, Info, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useRef } from "react";
import { toast } from "sonner";

interface AIDetectorInputProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    isAnalyzing: boolean;
    setIsAnalyzing: React.Dispatch<React.SetStateAction<boolean>>;
    setResults: React.Dispatch<React.SetStateAction<AnalysisResults | null>>;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    setTokenLimitExceeded: React.Dispatch<React.SetStateAction<boolean>>
}

export function AIDetectorInput({
    text,
    setText,
    isAnalyzing,
    setIsAnalyzing,
    setResults,
    setActiveTab,
    title,
    setTitle,
    setTokenLimitExceeded
}: AIDetectorInputProps) {
    const { t } = useTranslate('ai-detector');
    const { user, isLoading, refreshUserData } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const referenceFileInputRef = useRef<HTMLInputElement>(null);
    
    const [uploadedFileName, setUploadedFileName] = React.useState<File | null>(null);
    const [referenceDocuments, setReferenceDocuments] = React.useState<File[]>([]);
    
    const router = useRouter();
    const [showVerifyModal, setShowVerifyModal] = React.useState(false);

    if (isLoading) return <DashboardSkeleton />

    const handleAnalyze = async () => {
        if (!text.trim() && !uploadedFileName) return;

        if (user && !user.isEmailVerified) {
            setShowVerifyModal(true);
            return;
        }

        setIsAnalyzing(true);
        setActiveTab("results");

        try {
            const response = await newAnalyze(
                user?.corporate ? user?.corporate.id : undefined, 
                title, 
                text, 
                uploadedFileName ?? undefined,
                referenceDocuments.length > 0 ? referenceDocuments : undefined
            );

            setResults(response);
            setIsAnalyzing(false);
            refreshUserData();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response.status === 402) {
                toast.warning(t("youDontHaveTokenTitle"), {
                    description: t("youDontHaveTokenDesc"),
                });
                setTokenLimitExceeded(true);
                return;
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleClear = () => {
        setText("");
        setResults(null);
        setActiveTab("input");
        setUploadedFileName(null);
        setReferenceDocuments([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        if (referenceFileInputRef.current) {
            referenceFileInputRef.current.value = "";
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadedFileName(file);
        setText("");
    };

    const handleReferenceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        // Mevcut referans dosyaları + yeni dosyalar
        const newReferenceFiles = [...referenceDocuments, ...files];
        
        // Maksimum 3 dosya kontrolü
        if (newReferenceFiles.length > 3) {
            toast.warning("Maksimum 3 referans doküman yükleyebilirsiniz", {
                description: "Lütfen daha az dosya seçin."
            });
            return;
        }

        setReferenceDocuments(newReferenceFiles);
    };

    const removeReferenceDocument = (index: number) => {
        const updatedFiles = referenceDocuments.filter((_, i) => i !== index);
        setReferenceDocuments(updatedFiles);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const triggerReferenceFileInput = () => {
        referenceFileInputRef.current?.click();
    };

    return (
        <div className="flex gap-4 w-full">
            {/* Ana Analiz Kartı */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t('inputTitle')}</CardTitle>
                    <CardDescription>{t('inputDesc')}</CardDescription>
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
                            <p className="text-sm text-muted-foreground mt-2">{t('documentUploaded')}</p>
                            <Badge variant="secondary" className="mt-2">Ana Doküman</Badge>
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder={t('inputTitlePlaceholder')}
                                className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                value={title}
                                required
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                            />
                            <Textarea
                                value={text}
                                required
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setText(e.target.value)}
                                placeholder={t('inputTextPlaceholder')}
                                className="w-full h-64 resize-none mt-2"
                            />
                        </>
                    )}
                    
                    {/* Hidden file inputs */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".txt,.md,.doc,.docx,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <input
                        type="file"
                        ref={referenceFileInputRef}
                        accept=".txt,.md,.doc,.docx,.pdf"
                        multiple
                        className="hidden"
                        onChange={handleReferenceFileUpload}
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {!uploadedFileName && `${text.length} ${t('character')}`}
                        {uploadedFileName && t('documentReady')}
                    </div>
                    <div className="flex gap-2">
                        {!uploadedFileName && (
                            <Button variant="outline" onClick={triggerFileInput}>
                                <Upload className="w-4 h-4 mr-2" />
                                {t('uploadFile')}
                            </Button>
                        )}
                        <Button variant="outline" onClick={handleClear} disabled={!text.trim() && !uploadedFileName}>
                            {t('clear')}
                        </Button>
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || (!text.trim() && !uploadedFileName)}
                        >
                            {isAnalyzing ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    {t('analyzing')}
                                </>
                            ) : (
                                <div>
                                    {t('analyze')}
                                </div>
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Referans Dokümanlar Kartı */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Referans Dokümanlar (Opsiyonel)
                        <Badge variant="outline" className="text-xs">
                            {referenceDocuments.length}/3
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        Geçmiş çalışmalarınızı yükleyerek karşılaştırmalı analiz yapabilirsiniz
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Bilgilendirme Alert */}
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Neden referans doküman?</strong> Geçmiş çalışmalarınızı yükleyerek:
                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                <li>Yazım dili tutarlılığınızı kontrol edebiliriz</li>
                                <li>Akademik tarzınızla uyumluluğunu değerlendirebiliriz</li>
                                <li>Kişisel yazım stilinizi tanıyarak daha doğru analiz yapabiliriz</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    {/* Yüklenen Referans Dokümanlar */}
                    {referenceDocuments.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm">Yüklenen Referans Dokümanlar:</h4>
                            <div className="grid gap-3">
                                {referenceDocuments.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{file.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                Referans {index + 1}
                                            </Badge>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => removeReferenceDocument(index)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dosya Yükleme Alanı */}
                    {referenceDocuments.length < 3 && (
                        <div
                            onClick={triggerReferenceFileInput}
                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Plus className="w-8 h-8 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Referans Doküman Ekle</p>
                                    <p className="text-sm text-muted-foreground">
                                        PDF, DOCX veya DOC formatında dosyalarınızı seçin
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Kalan: {3 - referenceDocuments.length} dosya
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {referenceDocuments.length === 3 && (
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                                ✓ Maksimum sayıda referans doküman yüklendi
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                Artık karşılaştırmalı analiz için hazırsınız
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Email Verification Dialog */}
            <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('emailVerificationRequired')}</DialogTitle>
                        <DialogDescription>
                            {t('youMustVerifyYourEmailToContinue')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                router.push("/verify-email");
                            }}
                        >
                            {t('verifyNow')}
                        </Button>
                        <Button variant="ghost" onClick={() => setShowVerifyModal(false)}>
                            {t('cancel')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}