import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Info, RefreshCw } from "lucide-react";
import { AnalysisResults } from "@/types/analysis-results";
import { Progress } from "@/components/ui/progress";

interface AIDetectionRadarChartProps {
  isAnalyzing: boolean;
  results?: AnalysisResults | null;
}

export default function AIDetectionRadarChart({ isAnalyzing, results }: AIDetectionRadarChartProps) {
  if (isAnalyzing) {
    return (
      <Card className="w-full mt-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center p-12">
            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-semibold mb-2">İçerik Analiz Etme</h3>
            <p className="text-muted-foreground mb-6">
              Yapay zeka tespit sistemimiz örüntü göstergelerini işliyor. Bu sadece bir kaç dakika sürer...
            </p>
            <Progress value={45} className="w-full max-w-md" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!results) return null;
  
  // Convert indicators to radar chart data format
  const radarData = results.indicators.map(indicator => ({
    indicator: indicator.type,
    score: indicator.score,
    fullMark: 100
  }));
  
  const getScoreCategory = (score: number) => {
    if (score > 70) return { label: "Yüksek Yapay Zeka Olasılığı", color: "text-red-500" };
    if (score > 40) return { label: "Orta Düzey Yapay Zeka Olasılığı", color: "text-amber-500" };
    return { label: "Muhtemel İnsan İçeriği", color: "text-green-500" };
  };

  const scoreInfo = getScoreCategory(results.score);

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Yapay Zeka Örüntü Analizi</CardTitle>
          <div className={`text-lg font-bold ${scoreInfo.color}`}>{results.score}%</div>
        </div>
        <CardDescription>Yapay zeka içerik göstergelerinin görsel dökümü</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="AI Score"
                dataKey="score"
                stroke="#7c3aed"
                fill="#7c3aed"
                fillOpacity={0.5}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <Alert className="mt-4">
          <Info className="w-4 h-4" />
          <AlertTitle className={scoreInfo.color}>{scoreInfo.label}</AlertTitle>
          <AlertDescription className="text-sm">
            {results.summary} Grafikteki daha yüksek değerler, yapay zeka tarafından oluşturulan içerik imzalarının daha güçlü olduğunu göstermektedir.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          {radarData.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm p-2 border rounded">
              <span>{item.indicator}</span>
              <span className={
                item.score > 70 ? "text-red-500 font-medium" : 
                item.score > 40 ? "text-amber-500 font-medium" : 
                "text-green-500 font-medium"
              }>
                {item.score}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}