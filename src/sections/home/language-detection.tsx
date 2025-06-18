'use client';

import { useEffect, useState } from 'react';
import { Globe, X, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { allLangs, useTranslate } from '@/locales';

interface LanguageDetectionPopupProps {
  autoShowDelay?: number;
}

export function LanguageDetectionPopup({ autoShowDelay = 500 }: LanguageDetectionPopupProps) {
  const { currentLang, onChangeLang, isInitialized, t } = useTranslate('home');
  const [isOpen, setIsOpen] = useState(false);
  const [wasAutoDetected, setWasAutoDetected] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    if (!isInitialized || hasBeenShown) return;

    const checkAutoDetection = () => {
      const storedLang = localStorage.getItem('i18nextLng');
      const userHasManuallySelected = localStorage.getItem('languageManuallySelected') === 'true';
      const popupShownBefore = localStorage.getItem('languagePopupShown') === 'true';

      if (userHasManuallySelected || popupShownBefore) {
        setHasBeenShown(true);
        return;
      }

      if (!storedLang || (!userHasManuallySelected && currentLang.value)) {
        setWasAutoDetected(true);
        
        const timer = setTimeout(() => {
          setIsOpen(true);
          setHasBeenShown(true);
          localStorage.setItem('languagePopupShown', 'true');
        }, autoShowDelay);

        return () => clearTimeout(timer);
      }
    };

    checkAutoDetection();
  }, [isInitialized, currentLang, hasBeenShown, autoShowDelay]);

  const handleLanguageChange = async (langValue: string) => {
    await onChangeLang(langValue);
    localStorage.setItem('languageManuallySelected', 'true');
    setIsOpen(false);
  };

  const handleKeepCurrent = () => {
    localStorage.setItem('languageManuallySelected', 'true');
    setIsOpen(false);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isInitialized || !wasAutoDetected) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t('language_detected', 'Language Detected')}
          </DialogTitle>
          <DialogDescription>
            {t('language_detection_message', 'We automatically detected your preferred language. You can change it anytime.')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium">{currentLang.label}</p>
                <p className="text-sm text-muted-foreground">
                  {t('current_language', 'Current language')}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Check className="h-3 w-3 mr-1" />
              {t('detected', 'Detected')}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              {t('or_choose_different', 'Or choose a different language:')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {allLangs
                .filter(lang => lang.value !== currentLang.value)
                .slice(0, 4)
                .map((lang) => (
                  <Button
                    key={lang.value}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto p-3"
                    onClick={() => handleLanguageChange(lang.value)}
                  >
                    <span className="text-sm">{lang.label === 'Turkish' ? 'Türkçe' : lang.label}</span>
                  </Button>
                ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleKeepCurrent}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              {t('keep_current', 'Keep Current')}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleDismiss}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {t('language_change_note', 'You can change the language anytime from the settings menu.')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
