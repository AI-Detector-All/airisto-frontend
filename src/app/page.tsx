'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Star, BookOpen, Lightbulb, Quote, Languages, Brain, BarChart3, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AiristoComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState('tr');

  useEffect(() => {
    setIsClient(true);
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const content = {
    tr: {
      title: "AIRISTO",
      subtitle: "Yapay Zeka Destekli Analiz Platformu",
      comingSoon: "YAKINDA",
      description: "Bilgeliğin ve teknolojinin buluştuğu yeni nesil AI analiz platformu",
      features: [
        { icon: Brain, title: "Akıllı Analiz", desc: "Gelişmiş AI algoritmaları ile derinlemesine veri analizi" },
        { icon: BarChart3, title: "Görselleştirme", desc: "İnteraktif grafikler ve raporlar" },
        { icon: Zap, title: "Hızlı Sonuçlar", desc: "Gerçek zamanlı analiz ve anında sonuçlar" }
      ],
      contact: "İletişim",
      footer: "Tüm hakları saklıdır.",
      projectDesc: "Airisto, Aristoteles'in bilgelik felsefesini modern yapay zeka teknolojisiyle birleştiren yenilikçi bir analiz platformudur.",
      quotes: [
        "Bilgelik, öğrenmeye başlamaktır",
        "Mükemmellik bir alışkanlıktır",
        "Eğitimli zihin, kabul etmeden düşünebilir",
        "Bilgi güçtür, ancak bilgelik özgürlüktür"
      ]
    },
    en: {
      title: "AIRISTO",
      subtitle: "AI-Powered Analysis Platform",
      comingSoon: "COMING SOON",
      description: "Next-generation AI analysis platform where wisdom meets technology",
      features: [
        { icon: Brain, title: "Smart Analysis", desc: "Deep data analysis with advanced AI algorithms" },
        { icon: BarChart3, title: "Visualization", desc: "Interactive charts and comprehensive reports" },
        { icon: Zap, title: "Fast Results", desc: "Real-time analysis with instant results" }
      ],
      contact: "Contact",
      footer: "All rights reserved.",
      projectDesc: "Airisto is an innovative analysis platform that combines Aristotle's philosophy of wisdom with modern artificial intelligence technology.",
      quotes: [
        "Wisdom begins with learning",
        "Excellence is a habit",
        "The educated mind can think without accepting",
        "Knowledge is power, but wisdom is freedom"
      ]
    }
  };

  const currentContent = content[language];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % currentContent.quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isClient, currentContent.quotes.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      {isClient && (
        <div className="absolute inset-0">
          <div 
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-300"
            style={{
              left: mousePosition.x * 0.02 + '%',
              top: mousePosition.y * 0.02 + '%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div 
            className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-2xl transition-all duration-300"
            style={{
              right: (100 - mousePosition.x * 0.03) + '%',
              bottom: (100 - mousePosition.y * 0.03) + '%',
              transform: 'translate(50%, 50%)'
            }}
          />
        </div>
      )}

      {/* Static Background for SSR */}
      {!isClient && (
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-2xl right-1/4 bottom-1/4 transform translate-x-1/2 translate-y-1/2" />
        </div>
      )}

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {/* Fixed positions for consistent SSR/Client rendering */}
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '10%', top: '20%', animationDelay: '0s' }} />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '20%', top: '60%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '70%', top: '30%', animationDelay: '2s' }} />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '80%', top: '70%', animationDelay: '0.5s' }} />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '30%', top: '80%', animationDelay: '1.5s' }} />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '60%', top: '10%', animationDelay: '2.5s' }} />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '90%', top: '50%', animationDelay: '0.8s' }} />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '5%', top: '90%', animationDelay: '1.8s' }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        {/* Language Toggle */}
        <div className="absolute top-8 right-8">
          <button
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-all duration-300"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'tr' ? 'EN' : 'TR'}</span>
          </button>
        </div>

        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Aristotle Portrait */}
          <div className="mb-12 relative">
            <div className="w-48 h-48 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-spin-slow opacity-20"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-2xl">
                  <Image src="/airisto.png" alt="Aristotle" width={96} height={96}  className='lg:ml-2'/>
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 tracking-tight">
              {currentContent.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-4 font-light">
              {currentContent.subtitle}
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400"></div>
              <Lightbulb className="w-6 h-6 text-purple-400 animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-wide">
              {currentContent.comingSoon}
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              {currentContent.description}
            </p>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {currentContent.projectDesc}
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {currentContent.features.map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border flex flex-col justify-center items-center border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <feature.icon className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Section */}
          <div className="mb-12 relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <Quote className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <p className="text-lg text-slate-200 italic transition-all duration-500">
                "{currentContent.quotes[currentQuote]}"
              </p>
              <p className="text-sm text-slate-400 mt-2">- Aristoteles</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-slate-300 font-medium">{currentContent.contact}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <span className="text-purple-400 font-mono text-sm">mfdemir@firat.edu.tr</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-sm text-slate-500">
              © 2025 Airisto Project. {currentContent.footer}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}