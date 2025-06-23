import { Metadata } from "next";
import { cookies } from "next/headers";


export async function generateMetadata(): Promise<Metadata> {
    const lang = (await cookies()).get('i18nextLng')?.value || 'tr';
    const titles = {
        tr: "Airisto - Kullanım Sözleşmesi",
        en: "Terms of Service | Airisto",
    };

    const descriptions = {
        tr: "Airisto için Hizmet Şartları - Yapay zeka destekli platformumuzu kullanmaya ilişkin hüküm ve koşullarımızı okuyun.",
        en: "Terms of Service for Airisto - Read our terms and conditions for using our AI-powered platform.",
    };

    return {
        title: titles[lang as keyof typeof titles],
        description: descriptions[lang as keyof typeof descriptions],
        icons: {
            icon: "/a.ico",
        }
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1"> {children} </main>
        </div>
    );
}