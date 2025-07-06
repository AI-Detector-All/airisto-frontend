import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  CreditCard, 
  Mail, 
  Clock, 
  FileX, 
  Server, 
  Shield, 
  RefreshCw,
  Home,
  ArrowLeft
} from "lucide-react";
import { useTranslate } from "@/locales";

export interface AIDetectorError {
  type: 'subscription_expired' | 'token_limit' | 'email_not_verified' | 'file_too_large' | 'invalid_file' | 'ai_service_unavailable' | 'network_error' | 'validation_error' | 'unknown_error';
  message?: string;
  details?: string;
  statusCode?: number;
}

interface AIDetectorErrorProps {
  error: AIDetectorError | null;
  onRetry?: () => void;
  onClear?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  onVerifyEmail?: () => void;
  onUpgradePlan?: () => void;
  showRetry?: boolean;
  showClear?: boolean;
  showGoBack?: boolean;
  showGoHome?: boolean;
}

export function AIDetectorError({
  error,
  onRetry,
  onClear,
  onGoBack,
  onGoHome,
  onVerifyEmail,
  onUpgradePlan,
  showRetry = false,
  showClear = false,
  showGoHome = false
}: AIDetectorErrorProps) {
  const { t } = useTranslate('ai-detector');

  if (!error) return null;

  const getErrorConfig = (errorType: AIDetectorError['type']) => {
    switch (errorType) {
      case 'subscription_expired':
        return {
          icon: <Clock className="h-5 w-5" />,
          title: t('errors.subscriptionExpired.title'),
          description: t('errors.subscriptionExpired.description'),
          variant: 'destructive' as const,
          severity: 'high' as const,
          actions: [
            { 
              label: t('errors.subscriptionExpired.upgradeButton'), 
              onClick: onUpgradePlan,
              variant: 'default' as const,
              icon: <CreditCard className="h-4 w-4" />
            }
          ]
        };
      
      case 'token_limit':
        return {
          icon: <CreditCard className="h-5 w-5" />,
          title: t('errors.tokenLimit.title'),
          description: t('errors.tokenLimit.description'),
          variant: 'destructive' as const,
          severity: 'high' as const,
          actions: [
            { 
              label: t('errors.tokenLimit.upgradeButton'), 
              onClick: onUpgradePlan,
              variant: 'default' as const,
              icon: <CreditCard className="h-4 w-4" />
            }
          ]
        };
      
      case 'email_not_verified':
        return {
          icon: <Mail className="h-5 w-5" />,
          title: t('errors.emailNotVerified.title'),
          description: t('errors.emailNotVerified.description'),
          variant: 'destructive' as const,
          severity: 'high' as const,
          actions: [
            { 
              label: t('errors.emailNotVerified.verifyButton'), 
              onClick: onVerifyEmail,
              variant: 'default' as const,
              icon: <Mail className="h-4 w-4" />
            }
          ]
        };
      
      case 'file_too_large':
        return {
          icon: <FileX className="h-5 w-5" />,
          title: t('errors.fileTooLarge.title'),
          description: t('errors.fileTooLarge.description'),
          variant: 'destructive' as const,
          severity: 'medium' as const,
          actions: [
            { 
              label: t('errors.fileTooLarge.chooseAnotherButton'), 
              onClick: onClear,
              variant: 'outline' as const,
              icon: <FileX className="h-4 w-4" />
            }
          ]
        };
      
      case 'invalid_file':
        return {
          icon: <FileX className="h-5 w-5" />,
          title: t('errors.invalidFile.title'),
          description: t('errors.invalidFile.description'),
          variant: 'destructive' as const,
          severity: 'medium' as const,
          actions: [
            { 
              label: t('errors.invalidFile.chooseAnotherButton'), 
              onClick: onClear,
              variant: 'outline' as const,
              icon: <FileX className="h-4 w-4" />
            }
          ]
        };
      
      case 'ai_service_unavailable':
        return {
          icon: <Server className="h-5 w-5" />,
          title: t('errors.aiServiceUnavailable.title'),
          description: t('errors.aiServiceUnavailable.description'),
          variant: 'destructive' as const,
          severity: 'high' as const,
          actions: [
            { 
              label: t('errors.aiServiceUnavailable.retryButton'), 
              onClick: onRetry,
              variant: 'outline' as const,
              icon: <RefreshCw className="h-4 w-4" />
            }
          ]
        };
      
      case 'network_error':
        return {
          icon: <Server className="h-5 w-5" />,
          title: t('errors.networkError.title'),
          description: t('errors.networkError.description'),
          variant: 'destructive' as const,
          severity: 'medium' as const,
          actions: [
            { 
              label: t('errors.networkError.retryButton'), 
              onClick: onRetry,
              variant: 'outline' as const,
              icon: <RefreshCw className="h-4 w-4" />
            }
          ]
        };
      
      case 'validation_error':
        return {
          icon: <Shield className="h-5 w-5" />,
          title: t('errors.validationError.title'),
          description: error.message || t('errors.validationError.description'),
          variant: 'destructive' as const,
          severity: 'medium' as const,
          actions: [
            { 
              label: t('errors.validationError.fixButton'), 
              onClick: onGoBack,
              variant: 'outline' as const,
              icon: <ArrowLeft className="h-4 w-4" />
            }
          ]
        };
      
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: t('errors.unknownError.title'),
          description: error.message || t('errors.unknownError.description'),
          variant: 'destructive' as const,
          severity: 'medium' as const,
          actions: [
            { 
              label: t('errors.unknownError.retryButton'), 
              onClick: onRetry,
              variant: 'outline' as const,
              icon: <RefreshCw className="h-4 w-4" />
            }
          ]
        };
    }
  };

  const config = getErrorConfig(error.type);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 w-full">
      <Card className="w-full max-w-5xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-destructive/10 text-destructive">
              {config.icon}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <CardTitle className="text-xl font-semibold">
              {config.title}
            </CardTitle>
          </div>
          <CardDescription className="text-base text-muted-foreground">
            {config.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 w-full">
          {/* Error Details */}
          {error.details && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t('errors.details')}</AlertTitle>
              <AlertDescription className="mt-2">
                {error.details}
              </AlertDescription>
            </Alert>
          )}

          {/* Status Code */}
          {error.statusCode && (
            <div className="text-sm text-muted-foreground text-center">
              {t('errors.statusCode')}: {error.statusCode}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 lg:justify-between">
            {config.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                onClick={action.onClick}
                className="w-full sm:w-auto"
                disabled={!action.onClick}
              >
                {action.icon}
                <span className="ml-2">{action.label}</span>
              </Button>
            ))}

            {showGoHome && (
              <Button
                variant="outline"
                onClick={onGoHome}
                className="w-full sm:w-auto"
              >
                <Home className="h-4 w-4 mr-2" />
                {t('errors.goHome')}
              </Button>
            )}

            {showRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('errors.retry')}
              </Button>
            )}

            {showClear && (
              <Button
                variant="outline"
                onClick={onClear}
                className="w-full sm:w-auto"
              >
                <FileX className="h-4 w-4 mr-2" />
                {t('errors.clear')}
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {t('errors.helpText')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}