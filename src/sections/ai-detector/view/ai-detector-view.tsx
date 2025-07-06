'use client';
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AIDetectorResult } from "../ai-detector-result";
import { AIDetectorInput } from "../ai-detector-input";
import { AIDetectorError, AIDetectorError as AIDetectorErrorType } from "../ai-detector-errors";
import { AnalysisResults } from "@/types/analysis";
import { useTranslate } from "@/locales";

export default function AIDetectorView() {
    const { t } = useTranslate('ai-detector');
    const router = useRouter();

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [tokenLimitExceeded, setTokenLimitExceeded] = useState(false);
    const [results, setResults] = useState<AnalysisResults | null>(null);
    const [activeTab, setActiveTab] = useState("input");
    const [error, setError] = useState<AIDetectorErrorType | null>(null);

    // Error handlers
    const handleRetry = () => {
        setError(null);
        setActiveTab("input");
    };

    const handleClear = () => {
        setText("");
        setTitle("");
        setResults(null);
        setError(null);
        setTokenLimitExceeded(false);
        setActiveTab("input");
    };

    const handleGoBack = () => {
        setError(null);
        setActiveTab("input");
    };

    const handleGoHome = () => {
        router.push("/dashboard");
    };

    const handleVerifyEmail = () => {
        router.push("/verify-email");
    };

    const handleUpgradePlan = () => {
        router.push("/#pricing");
    };

    const handleTokenLimitExceeded = () => {
        setError({
            type: 'token_limit',
            message: t('errors.tokenLimit.description'),
            statusCode: 402
        });
        setActiveTab("error");
    };

    const handleError = (errorType: AIDetectorErrorType['type'], message?: string, statusCode?: number) => {
        setError({
            type: errorType,
            message,
            statusCode
        });
        setActiveTab("error");
    };

    const inputProps = {
        setTitle,
        title,
        text,
        setText,
        isAnalyzing,
        setIsAnalyzing,
        setResults,
        setActiveTab,
        setTokenLimitExceeded: handleTokenLimitExceeded,
        setError: handleError
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <Link href={'/dashboard'} className="flex gap-2 items-center">
                        <ChevronLeft className="text-gray-600" />
                        <h1 className="text-body2 text-gray-600 font-onest"> {t('home')} </h1>
                    </Link>
                    <p className="text-gray-900 text-header2 font-onest font-semibold mt-2"> {t('aiDetector')} </p>
                </div>
            </div>

            <main className="lg:flex-1 lg:container mx-auto lg:px-4 lg:py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between mb-4 mt-4">
                        <TabsList>
                            <TabsTrigger value="input" className="p-5"> {t('analyze')} </TabsTrigger>
                            <TabsTrigger
                                value="results"
                                disabled={!results && !isAnalyzing && !error}
                                className="p-5"
                            >
                                {t('result')}
                            </TabsTrigger>
                            {error && (
                                <TabsTrigger
                                    value="error"
                                    disabled={!error}
                                    className="p-5 text-destructive data-[state=active]:text-destructive"
                                >
                                    {t('error')}
                                </TabsTrigger>
                            )}
                        </TabsList>
                    </div>

                    <TabsContent value="input" className="mt-0">
                        <AIDetectorInput
                            {...inputProps}
                        />
                    </TabsContent>

                    <TabsContent value="results" className="lg:mt-0 mt-16">
                        <AIDetectorResult
                            isAnalyzing={isAnalyzing}
                            results={results}
                            tokenLimitExceeded={tokenLimitExceeded}
                        />
                    </TabsContent>


                    <TabsContent value="error" className="mt-0">
                        <AIDetectorError
                            error={error}
                            onRetry={handleRetry}
                            onClear={handleClear}
                            onGoBack={handleGoBack}
                            onGoHome={handleGoHome}
                            onVerifyEmail={handleVerifyEmail}
                            onUpgradePlan={handleUpgradePlan}
                            showGoHome
                            showRetry
                            showClear
                        />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}