import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NoSSR } from "@/components/no-ssr";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const lang = (await cookies()).get('i18nextLng')?.value || 'tr';

  const titles = {
    tr: "Airisto | En İyi Yapay Zeka Tespit Aracı",
    en: "Airisto | Ultimate Ai Dedection Tool",
  };

  const descriptions = {
    tr: "Airisto, makaleleri analiz ederek ne kadar yapay zeka tarafından yazıldığını tespit eder.",
    en: "Airisto detects how much an article was written by artificial intelligence.",
  };

  return {
    title: titles[lang as keyof typeof titles],
    description: descriptions[lang as keyof typeof descriptions],
    icons: [
      {
        rel: 'icon',
        url: '/icon.ico',
        media: '(prefers-color-scheme: dark)',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/icon-dark.ico',
        media: '(prefers-color-scheme: light)',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/icon-dark.ico',
        sizes: '32x32',
      }
    ]
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <NoSSR>
        <Header />
        <main className="flex-1"> {children} </main>
        <Footer />
      </NoSSR>
    </div>
  );
}
