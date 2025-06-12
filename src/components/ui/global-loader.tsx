import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalLoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

export function GlobalLoader({ 
  size = "md", 
  fullScreen = true, 
  text = "Yükleniyor...",
  className 
}: GlobalLoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (fullScreen) {
    return (
      <div className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}>
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className={cn(
            "animate-spin text-primary",
            sizeClasses[size]
          )} />
          {text && (
            <p className={cn(
              "text-muted-foreground font-medium",
              textSizes[size]
            )}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center justify-center p-8",
      className
    )}>
      <div className={cn("flex items-center",className)}>
        <Loader2 className={cn(
          "animate-spin text-white",
          sizeClasses[size]
        )} />
        {text && (
          <p className={cn(
            "text-white font-medium",
            textSizes[size]
          )}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

// Skeleton Loader için ayrı component
export function DashboardSkeleton() {
  return (
    <div className="bg-gray-100 w-full min-h-screen p-8 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Recently Section Skeleton */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Documents Section Skeleton */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Plan Section Skeleton */}
      <div className="bg-white rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

// Inline Loader (küçük componentler için)
export function InlineLoader({ 
  size = "sm", 
  text,
  className 
}: Omit<GlobalLoaderProps, 'fullScreen'>) {
  return (
    <GlobalLoader 
      size={size}
      fullScreen={false}
      text={text}
      className={className}
    />
  );
}