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
            if (error.response.status === 500 && error.response.data.message === "AI servisi şu anda kullanılamıyor.") {
                toast.warning(t("aiServiceUnavailable"), {
                    description: t("aiServiceUnavailableDesc"),
                });
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
            toast.warning(t('errorReference'), {
                description: t('errorReferenceDesc')
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
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* Main Input Card */}
            <Card className="w-full order-1">
                <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl">{t('inputTitle')}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{t('inputDesc')}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                    {uploadedFileName ? (
                        <div className="flex flex-col items-center justify-center h-48 sm:h-64 border-2 border-dashed border-muted-foreground/25 rounded-md bg-muted/50 relative">
                            <Button
                                onClick={handleClear}
                                className="absolute top-2 right-2 p-1 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                                aria-label="Dosyayı kaldır"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                            </Button>
                            <FileText className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-primary" />
                            <span className="text-base sm:text-lg font-medium text-center px-4 break-words">
                                {uploadedFileName.name}
                            </span>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center px-4">
                                {t('documentUploaded')}
                            </p>
                            <Badge variant="secondary" className="mt-2 text-xs">
                                Ana Doküman
                            </Badge>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder={t('inputTitlePlaceholder')}
                                className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={title}
                                required
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                            />
                            <Textarea
                                value={text}
                                required
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setText(e.target.value)}
                                placeholder={t('inputTextPlaceholder')}
                                className="w-full h-48 sm:h-64 resize-none text-sm sm:text-base"
                            />
                        </div>
                    )}

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

                <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-4">
                    <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                        {!uploadedFileName && `${text.length} ${t('character')}`}
                        {uploadedFileName && t('documentReady')}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto order-1 sm:order-2">
                        {!uploadedFileName && (
                            <Button 
                                variant="outline" 
                                onClick={triggerFileInput}
                                className="w-full sm:w-auto text-sm"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {t('uploadFile')}
                            </Button>
                        )}
                        <Button 
                            variant="outline" 
                            onClick={handleClear} 
                            disabled={!text.trim() && !uploadedFileName}
                            className="w-full sm:w-auto text-sm"
                        >
                            {t('clear')}
                        </Button>
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || (!text.trim() && !uploadedFileName)}
                            className="w-full sm:w-auto text-sm font-medium"
                        >
                            {isAnalyzing ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    {t('analyzing')}
                                </>
                            ) : (
                                t('analyze')
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Reference Documents Card */}
            <Card className="w-full order-2 lg:order-2">
                <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="break-words">{t('referenceDocumentsTitle')}</span>
                        </div>
                        <Badge variant="outline" className="text-xs w-fit">
                            {referenceDocuments.length}/3
                        </Badge>
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        {t('referenceDocumentsDesc')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Info Alert */}
                    <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertDescription className="text-sm">
                            <strong className="text-blue-800 dark:text-blue-200">
                                {t('referenceDocumentsInfoTitle')}
                            </strong>
                            <span className="text-blue-700 dark:text-blue-300 ml-1">
                                {t('referenceDocumentsDesc')}
                            </span>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                                <li>{t('referenceDocumentsInfo1')}</li>
                                <li>{t('referenceDocumentsInfo2')}</li>
                                <li>{t('referenceDocumentsInfo3')}</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    {/* Uploaded Reference Documents */}
                    {referenceDocuments.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm sm:text-base">
                                {t('uploadedReferenceDocuments')}
                            </h4>
                            <div className="space-y-3">
                                {referenceDocuments.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg bg-muted/30 gap-3 sm:gap-0"
                                    >
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium truncate" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {t('reference')} {index + 1}
                                            </Badge>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => removeReferenceDocument(index)}
                                                className="h-8 w-8 p-0 flex-shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add Reference Document */}
                    {referenceDocuments.length < 3 && (
                        <div
                            onClick={triggerReferenceFileInput}
                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm sm:text-base">
                                        {t('addReferenceDocument')}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                        {t('addReferenceDocumentDesc')}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {t('remain')} {3 - referenceDocuments.length} {t('file')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Max Reference Reached */}
                    {referenceDocuments.length === 3 && (
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                                {t('maxReference')}
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                {t('nowReference')}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Email Verification Modal */}
            <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
                <DialogContent className="mx-4 sm:mx-0">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">
                            {t('emailVerificationRequired')}
                        </DialogTitle>
                        <DialogDescription className="text-sm sm:text-base">
                            {t('youMustVerifyYourEmailToContinue')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                        <Button
                            onClick={() => {
                                router.push("/verify-email");
                            }}
                            className="w-full sm:w-auto"
                        >
                            {t('verifyNow')}
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={() => setShowVerifyModal(false)}
                            className="w-full sm:w-auto"
                        >
                            {t('cancel')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}