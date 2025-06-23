'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, } from 'lucide-react';
import { useTranslate } from '@/locales';

interface CookieConsentProps {
  delay?: number;
  scrollTrigger?: number;
  triggerType?: 'delay' | 'scroll' | 'both';
}

export function CookieConsent({ 
  delay = 2000, 
  scrollTrigger = 20, 
  triggerType = 'delay' 
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const [delayTriggered, setDelayTriggered] = useState(false);
  const { t } = useTranslate('use-cookie');

  useEffect(() => {
    if (triggerType === 'delay') return;

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrolled >= scrollTrigger && !scrollTriggered) {
        setScrollTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTrigger, scrollTriggered, triggerType]);

  useEffect(() => {
    if (triggerType === 'scroll') return;

    const timer = setTimeout(() => {
      setDelayTriggered(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, triggerType]);

  useEffect(() => {
    let triggered = false;

    switch (triggerType) {
      case 'delay':
        triggered = delayTriggered;
        break;
      case 'scroll':
        triggered = scrollTriggered;
        break;
      case 'both':
        triggered = delayTriggered && scrollTriggered;
        break;
    }

    if (triggered && shouldShow) {
      setIsVisible(true);
    }
  }, [delayTriggered, scrollTriggered, shouldShow, triggerType]);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      setShouldShow(true);
    }
  }, []);

  const getCookieConsent = () => {
    const localConsent = localStorage.getItem('cookie-consent');
    if (localConsent) return localConsent;
    
    const cookies = document.cookie.split(';');
    const consentCookie = cookies.find(cookie => 
      cookie.trim().startsWith('cookie-consent=')
    );
    
    if (consentCookie) {
      const consentValue = consentCookie.split('=')[1];
      localStorage.setItem('cookie-consent', consentValue);
      return consentValue;
    }
    
    return null;
  };

  const setCookieConsent = (value: 'accepted' | 'declined') => {
    localStorage.setItem('cookie-consent', value);
    
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `cookie-consent=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    
    setIsVisible(false);
  };

  const handleAccept = () => {
    setCookieConsent('accepted');
  };

  const handleDecline = () => {
    setCookieConsent('declined');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="mx-auto max-w-4xl border-border/50 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Cookie className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                  {t('title')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('description')}
                  <a 
                    href="/privacy" 
                    className="text-primary hover:underline ml-1"
                  >
                    {t('privacy_policy')}
                  </a>
                  {t('and')}
                  <a 
                    href="/terms" 
                    className="text-primary hover:underline ml-1"
                  >
                    {t('terms_of_service')}
                  </a>
                  {t('for_more_info')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="text-xs"
              >
                {t('decline')}
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="text-xs"
              >
                {t('accept')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}