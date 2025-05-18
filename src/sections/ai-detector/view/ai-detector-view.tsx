'use client';
import { useState } from "react";
import { Save, ChevronLeft } from "lucide-react";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { AnalysisResults } from "@/types/analysis-results";
import { AIDetectorResult } from "../ai-detector-result";
import { AIDetectorInput } from "../ai-detector-input";


export default function AIDetectorView() {
    const [text, setText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<AnalysisResults | null>(null);
    const [fileName, setFileName] = useState("Adsız Doküman");
    const [activeTab, setActiveTab] = useState("input");

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <Link href={'/dashboard'} className="flex gap-2 items-center">
                        <ChevronLeft className="text-gray-600" />
                        <h1 className="text-body2 text-gray-600 font-onest">Ana Sayfa</h1>
                    </Link>
                    <p className="text-gray-900 text-header2 font-onest font-semibold mt-2">Yapay Zeka Detektörü</p>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between mb-4">
                        <TabsList>
                            <TabsTrigger value="input" className="p-5" > Analiz Et </TabsTrigger>
                            <TabsTrigger value="results" disabled={!results && !isAnalyzing} className="p-5"> Sonuçlar </TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2">
                            <Input
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="max-w-xs"
                            />
                            <TooltipProvider>
                                <TooltipUI>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Save className="w-4 h-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent> Kaydet </TooltipContent>
                                </TooltipUI>
                            </TooltipProvider>
                        </div>
                    </div>

                    <TabsContent value="input" className="mt-0">
                        <AIDetectorInput text={text} setText={setText} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} setResults={setResults} setActiveTab={setActiveTab} />
                    </TabsContent>

                    <TabsContent value="results" className="mt-0">
                        <AIDetectorResult isAnalyzing={isAnalyzing} results={results} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}