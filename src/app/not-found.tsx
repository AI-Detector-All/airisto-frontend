'use client';
import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function Error404Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-25 via-white to-magenta-25 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <div className="text-[12rem] md:text-[16rem] font-bold font-onest text-transparent bg-gradient-to-r from-fuchsia-400 via-magenta-400 to-fuchsia-600 bg-clip-text leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-bold font-onest text-fuchsia-100 blur-sm -z-10 leading-none">
            404
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-onest text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-onest max-w-md mx-auto">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-magenta-500 text-white font-semibold font-onest rounded-xl hover:from-fuchsia-600 hover:to-magenta-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home size={20} />
            Ana Sayfaya Dön
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-fuchsia-600 font-semibold font-onest rounded-xl border-2 border-fuchsia-200 hover:border-fuchsia-300 hover:bg-fuchsia-25 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={20} />
            Geri Git
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-fuchsia-100 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="text-fuchsia-500" size={24} />
            <h3 className="text-xl font-semibold font-onest text-gray-800">
              Aradığınızı Bulamadınız mı?
            </h3>
          </div>
          <p className="text-gray-600 font-onest mb-4">
            Belki şu linkler yardımcı olabilir:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-fuchsia-50 text-fuchsia-700 font-onest rounded-lg hover:bg-fuchsia-100 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/documents"
              className="px-4 py-2 bg-fuchsia-50 text-fuchsia-700 font-onest rounded-lg hover:bg-fuchsia-100 transition-colors duration-200"
            >
              Dokümanlar
            </Link>
            <Link
              href="/dashboard/support"
              className="px-4 py-2 bg-fuchsia-50 text-fuchsia-700 font-onest rounded-lg hover:bg-fuchsia-100 transition-colors duration-200"
            >
              Destek
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-r from-fuchsia-300 to-magenta-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-magenta-400 to-fuchsia-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="fixed top-1/2 right-20 w-12 h-12 bg-gradient-to-r from-fuchsia-200 to-magenta-200 rounded-full opacity-30 animate-pulse delay-500"></div>
      </div>
    </div>
  );
}