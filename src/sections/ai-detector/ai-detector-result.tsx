import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Info, RefreshCw, Search, Database, BarChart3, CheckCircle } from "lucide-react"
import AIDetectionRadarChart from "./ai-detector-chart"
import { AnalysisResults } from "@/types/analysis"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslate } from "@/locales"
import { useState, useEffect } from "react"

interface AIDetectorResultProps {
    isAnalyzing: boolean
    results?: AnalysisResults | null,
    tokenLimitExceeded: boolean
}

interface AnalysisStep {
    id: string
    label: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    progress: number
    completed: boolean
}

export function AIDetectorResult({ isAnalyzing, results, tokenLimitExceeded }: AIDetectorResultProps) {
    
    const { t } = useTranslate('ai-detector')
    
    const [currentStep, setCurrentStep] = useState(0)
    const [overallProgress, setOverallProgress] = useState(0)
    
    const analysisSteps: AnalysisStep[] = [
        {
            id: 'scanning',
            label: t('textAnalyzing'),
            description: t('textAnalyzingDesc'),
            icon: Search,
            progress: 0,
            completed: false
        },
        {
            id: 'sources',
            label: t('sourcesScanning'),
            description: t('sourcesScanningDesc'),
            icon: Database,
            progress: 0,
            completed: false
        },
        {
            id: 'analyzing',
            label: t('aiScanning'),
            description: t('aiScanningDesc'),
            icon: BarChart3,
            progress: 0,
            completed: false
        },
        {
            id: 'finalizing',
            label: t('finalScanning'),
            description: t('finalScanningDesc'),
            icon: CheckCircle,
            progress: 0,
            completed: false
        }
    ]
    
    const [steps, setSteps] = useState(analysisSteps)
    
    useEffect(() => {
        if (!isAnalyzing) {
            setCurrentStep(0)
            setOverallProgress(0)
            setSteps(analysisSteps)
            return
        }
        
        const stepDurations = [1000, 2000, 3000, 2000]
        let totalTime = 0
        
        stepDurations.forEach((duration, index) => {
            setTimeout(() => {
                setCurrentStep(index)
                
                let stepProgress = 0
                const stepInterval = setInterval(() => {
                    stepProgress += Math.random() * 10 + 5 
                    if (stepProgress >= 100) {
                        stepProgress = 100
                        clearInterval(stepInterval)
                        
                        setSteps(prev => prev.map((step, i) => 
                            i === index 
                                ? { ...step, progress: 100, completed: true }
                                : step
                        ))
                        
                        const newOverallProgress = ((index + 1) / stepDurations.length) * 100
                        setOverallProgress(newOverallProgress)
                    } else {
                        setSteps(prev => prev.map((step, i) => 
                            i === index 
                                ? { ...step, progress: stepProgress }
                                : step
                        ))
                        
                        const baseProgress = (index / stepDurations.length) * 100
                        const stepContribution = (stepProgress / 100) * (100 / stepDurations.length)
                        setOverallProgress(baseProgress + stepContribution)
                    }
                }, 100)
            }, totalTime)
            
            totalTime += duration
        })
    }, [isAnalyzing])

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
                        <div className="flex flex-col items-center justify-center text-center p-8">
                            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-6" />
                            <h3 className="text-xl font-semibold mb-2"> {t('aiScanningTitle')} </h3>
                            <p className="text-muted-foreground mb-8">
                                {t('aiScanningDesc2')}
                            </p>
                            
                            <div className="w-full max-w-md mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">{t('generalProgress')}</span>
                                    <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
                                </div>
                                <Progress value={overallProgress} className="w-full h-2" />
                            </div>
                            
                            <div className="w-full max-w-lg space-y-4">
                                {steps.map((step, index) => {
                                    const Icon = step.icon
                                    const isActive = index === currentStep && isAnalyzing
                                    const isCompleted = step.completed
                                    
                                    return (
                                        <div 
                                            key={step.id}
                                            className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300
                                                ${isActive ? 'border-primary bg-primary/5' : 
                                                  isCompleted ? 'border-green-200 bg-green-50' : 
                                                  'border-gray-200 bg-gray-50'}`}
                                        >
                                            <div className={`p-2 rounded-full transition-colors duration-300
                                                ${isActive ? 'bg-primary text-white' : 
                                                  isCompleted ? 'bg-green-500 text-white' : 
                                                  'bg-gray-200 text-gray-400'}`}>
                                                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                                            </div>
                                            
                                            <div className="flex-1 text-left">
                                                <h4 className={`font-medium transition-colors duration-300
                                                    ${isActive ? 'text-primary' : 
                                                      isCompleted ? 'text-green-700' : 
                                                      'text-gray-600'}`}>
                                                    {step.label}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {step.description}
                                                </p>
                                                
                                                {(isActive || isCompleted) && (
                                                    <div className="mt-2">
                                                        <Progress 
                                                            value={step.progress} 
                                                            className="w-full h-1"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="text-right">
                                                {isCompleted ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                ) : isActive ? (
                                                    <span className="text-sm font-medium text-primary">
                                                        {Math.round(step.progress)}%
                                                    </span>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
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