'use client';
import React from 'react';
import Link from 'next/link';
import { Shield, Home, ArrowLeft, Lock, AlertTriangle } from 'lucide-react';

export default function Error403Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-error-25 via-white to-warning-25 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Shield Icon with Animation */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-error-400 to-error-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-warning-400 rounded-full flex items-center justify-center animate-bounce">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* 403 Text */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold font-onest text-transparent bg-gradient-to-r from-error-500 via-error-400 to-warning-500 bg-clip-text leading-none mb-4">
            403
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-onest text-gray-900 mb-4">
            Erişim Engellendi
          </h1>
          <div className="bg-error-50 border border-error-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-error-500" size={24} />
              <h3 className="text-lg font-semibold font-onest text-error-700">
                Yetki Hatası
              </h3>
            </div>
            <p className="text-error-600 font-onest text-left">
              Bu sayfaya erişim yetkiniz bulunmamaktadır. Bu durumun bir hata olduğunu düşünüyorsanız, 
              lütfen sistem yöneticinizle iletişime geçin veya uygun yetkilerle giriş yapmayı deneyin.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-magenta-500 text-white font-semibold font-onest rounded-xl hover:from-fuchsia-600 hover:to-magenta-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home size={20} />
            Dashboard&apos;a Dön
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-error-600 font-semibold font-onest rounded-xl border-2 border-error-200 hover:border-error-300 hover:bg-error-25 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={20} />
            Geri Git
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
          <h3 className="text-xl font-semibold font-onest text-gray-800 mb-4">
            Ne Yapabilirsiniz?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="bg-gradient-to-r from-fuchsia-50 to-magenta-50 p-4 rounded-lg border border-fuchsia-100">
              <h4 className="font-semibold font-onest text-fuchsia-700 mb-2">
                Yetki Kontrolü
              </h4>
              <p className="text-sm text-fuchsia-600 font-onest">
                Doğru kullanıcı hesabıyla giriş yaptığınızdan emin olun.
              </p>
            </div>
            <div className="bg-gradient-to-r from-success-50 to-success-25 p-4 rounded-lg border border-success-200">
              <h4 className="font-semibold font-onest text-success-700 mb-2">
                Yönetici Desteği
              </h4>
              <p className="text-sm text-success-600 font-onest">
                Sistem yöneticinizden ek yetkiler talep edin.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/dashboard/support"
              className="inline-flex items-center gap-2 text-fuchsia-600 hover:text-fuchsia-700 font-semibold font-onest transition-colors duration-200"
            >
              Destek Ekibiyle İletişime Geç →
            </Link>
          </div>
        </div>

        {/* Floating Warning Elements */}
        <div className="fixed top-16 left-8 w-6 h-6 bg-error-300 rounded-full opacity-40 animate-ping"></div>
        <div className="fixed bottom-16 right-8 w-8 h-8 bg-warning-300 rounded-full opacity-30 animate-ping delay-700"></div>
        <div className="fixed top-1/3 right-16 w-4 h-4 bg-error-400 rounded-full opacity-50 animate-ping delay-300"></div>
        <div className="fixed bottom-1/3 left-16 w-5 h-5 bg-warning-400 rounded-full opacity-40 animate-ping delay-1000"></div>
      </div>
    </div>
  );
}