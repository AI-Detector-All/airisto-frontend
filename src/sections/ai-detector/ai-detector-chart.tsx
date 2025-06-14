import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { Info, RefreshCw, FileText, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface AnalysisResults {
  aiPercent: string;
  categoryScores: Array<{
    category: string;
    score: number;
    explanation: string;
  }>;
  summary: string;
  suggestions: string[];
}

interface AIDetectionRadarChartProps {
  isAnalyzing: boolean;
  results?: AnalysisResults | null;
}

export default function AIDetectionRadarChart({ isAnalyzing, results }: AIDetectionRadarChartProps) {
  if (isAnalyzing) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <div className="relative mb-4">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-30"></div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Analiz Ediliyor...</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Yapay zeka örüntüleri tespit ediliyor
          </p>
          <Progress value={65} className="w-full max-w-sm h-2" />
        </div>
      </div>
    );
  }
  
  if (!results) return null;
  
  const getScoreCategory = (score: number) => {
    if (score > 70) return { 
      label: "Yüksek AI Olasılığı", 
      color: "text-red-500", 
      bgColor: "bg-red-500",
      lightBg: "bg-red-50",
      icon: AlertTriangle,
      badgeVariant: "destructive" as const
    };
    if (score > 40) return { 
      label: "Orta Düzey AI", 
      color: "text-amber-500", 
      bgColor: "bg-amber-500",
      lightBg: "bg-amber-50",
      icon: TrendingUp,
      badgeVariant: "secondary" as const
    };
    return { 
      label: "İnsan İçeriği", 
      color: "text-green-500", 
      bgColor: "bg-green-500",
      lightBg: "bg-green-50",
      icon: CheckCircle,
      badgeVariant: "default" as const
    };
  };

  const scoreInfo = getScoreCategory(parseInt(results.aiPercent));
  const overallScore = parseInt(results.aiPercent);

  // Chart data için renk belirleme
  const getBarColor = (score: number) => {
    if (score > 70) return "#ef4444"; // red-500
    if (score > 40) return "#f59e0b"; // amber-500
    return "#10b981"; // green-500
  };

  const chartData = results.categoryScores.map(item => ({
    name: item.category,
    score: item.score,
    explanation: item.explanation,
    shortName: item.category.length > 15 ? item.category.substring(0, 12) + "..." : item.category
  }));

  // Pie chart için data
  const pieData = [
    { name: "AI İçerik", value: overallScore, fill: getBarColor(overallScore) },
    { name: "İnsan İçerik", value: 100 - overallScore, fill: "#e5e7eb" }
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border-2 rounded-xl shadow-xl max-w-xs border-gray-100">
          <p className="font-bold text-gray-800 mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Skor: <span className="font-semibold">{data.score}%</span>
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">{data.explanation}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Ana Skor Dairesel Gösterge */}
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={450}
                  dataKey="value"
                  stroke="none"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-2xl font-bold ${scoreInfo.color}`}>{overallScore}%</div>
            <div className="text-xs text-muted-foreground">AI Skoru</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          {React.createElement(scoreInfo.icon, { 
            className: `w-5 h-5 ${scoreInfo.color}` 
          })}
          <Badge variant={scoreInfo.badgeVariant} className="font-medium">
            {scoreInfo.label}
          </Badge>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <h4 className="font-semibold text-sm">Kategori Analizi</h4>
        </div>
        
        <div className="h-72 w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="shortName" 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
                axisLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]} strokeWidth={0}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.score)}
                    className="drop-shadow-sm"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Durum Alert */}
      <Alert className={`border-l-4 ${scoreInfo.lightBg} border-l-current`}>
        <Info className="w-4 h-4" />
        <AlertTitle className={`${scoreInfo.color} font-semibold`}>
          {scoreInfo.label}
        </AlertTitle>
        <AlertDescription className="text-sm leading-relaxed">
          {results.summary} Yüksek skorlar yapay zeka imzalarının daha güçlü olduğunu gösterir.
        </AlertDescription>
      </Alert>
      
      {/* Kategori Detayları */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          <h4 className="font-semibold text-sm">Detaylı Kategori Skorları</h4>
        </div>
        
        <div className="space-y-3">
          {results.categoryScores.map((item, index) => {
            const categoryInfo = getScoreCategory(item.score);
            return (
              <div key={index} className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${categoryInfo.lightBg} border-gray-200 hover:border-gray-300`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {React.createElement(categoryInfo.icon, { 
                        className: `w-4 h-4 ${categoryInfo.color}` 
                      })}
                      <span className="font-medium text-sm">{item.category}</span>
                    </div>
                    <Badge variant={categoryInfo.badgeVariant} className="font-semibold">
                      {item.score}%
                    </Badge>
                  </div>
                  
                  <div className="w-full bg-white bg-opacity-50 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ 
                        width: `${item.score}%`,
                        backgroundColor: getBarColor(item.score)
                      }}
                    />
                  </div>
                  
                  <p className="text-xs text-gray-600 leading-relaxed bg-white bg-opacity-30 p-2 rounded">
                    {item.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}