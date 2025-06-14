import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Info, RefreshCw } from "lucide-react"
import AIDetectionRadarChart from "./ai-detector-chart"
import { AnalysisResults } from "@/types/analysis"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslate } from "@/locales"

interface AIDetectorResultProps {
    isAnalyzing: boolean
    results?: AnalysisResults | null,
    tokenLimitExceeded: boolean
}

export function AIDetectorResult({ isAnalyzing, results, tokenLimitExceeded }: AIDetectorResultProps) {
    
    const { t } = useTranslate('ai-detector')
    
    const getColorBasedOnScore = (score: number) => {
        if (score > 70) return "destructive";
        if (score > 40) return "secondary";
        return "default";
    };

    const getProgressBarStyle = (score: number) => {
        if (score > 70) {
            return {
                backgroundColor: '#fee2e2', // bg-red-100
                '--progress-foreground': '#dc2626' // bg-red-600
            };
        }
        if (score > 40) {
            return {
                backgroundColor: '#fef3c7', // bg-yellow-100
                '--progress-foreground': '#d97706' // bg-yellow-600
            };
        }
        return {
            backgroundColor: '#dcfce7', // bg-green-100
            '--progress-foreground': '#16a34a' // bg-green-600
        };
    };

    return (
        <div className="font-onest">
            {isAnalyzing ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center p-12">
                            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                            <h3 className="text-lg font-semibold mb-2"> {t('analyzing')} </h3>
                            <p className="text-muted-foreground mb-6">
                                {t('resultTitle')}
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
                            <h3 className="text-lg font-semibold mb-2">
                                {tokenLimitExceeded
                                    ? <span> {t('resultOutOfToken')} </span>
                                    : <span> {t('aiDetector')} </span>}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {tokenLimitExceeded
                                    ? <span> {t('tokenLimitExceeded')} </span>
                                    : <span> {t('tokenLimitExceededFalse')} </span>}
                            </p>
                            <Link href={'/dashboard/subscription'}>
                                <Button className="bg-fuchsia-400 rounded-md px-4 py-2 hover:bg-fuchsia-500">
                                    {t('refreshSubs')}
                                </Button>
                            </Link>

                            {!tokenLimitExceeded && (
                                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-medium mb-1">{t('accuracy')}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('accuracyDesc')}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-medium mb-1">{t('graphicResult')}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('graphicResultDesc')}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{t('analyzeResult')}</CardTitle>
                                <Badge variant={getColorBasedOnScore(parseInt(results.aiPercent))}>
                                    {results.aiPercent}% {t('aiContent')}
                                </Badge>
                            </div>
                            <CardDescription>{results.summary}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-3 ">{t('contentAnalysis')}</h4>
                                    <div className="flex flex-col items-center justify-center text-center p-4 border rounded-lg">
                                        <div className="text-6xl font-bold text-primary mb-2">{results.aiPercent}%</div>
                                        <p className="text-muted-foreground">{t('percentageOfAIContent')}</p>
                                        
                                        {/* Düzeltilmiş Progress Bar */}
                                        <div className="w-full mt-4">
                                            <div 
                                                className="w-full h-3 rounded-full overflow-hidden"
                                                style={getProgressBarStyle(parseInt(results.aiPercent))}
                                            >
                                                <div 
                                                    className="h-full transition-all duration-500 ease-in-out"
                                                    style={{
                                                        width: `${parseInt(results.aiPercent)}%`,
                                                        backgroundColor: parseInt(results.aiPercent) > 70 ? '#dc2626' : 
                                                                        parseInt(results.aiPercent) > 40 ? '#d97706' : '#16a34a'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-3 font-onest">{t('suggestions')}</h4>
                                    <ul className="list-disc px-6">
                                        {results.suggestions.map((suggestion, index) => (
                                            <li key={index} className="mb-2">
                                                <p className="text-body3 font-onest">{suggestion}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('indicators')}</CardTitle>
                            <CardDescription>{t('indicatorsDesc')}</CardDescription>
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