import { Metadata } from "next";
import { cookies } from "next/headers";


export async function generateMetadata(): Promise<Metadata> {
    const lang = (await cookies()).get('i18nextLng')?.value || 'tr';
    const titles = {
        tr: "Airisto - Çerez Politikası",
        en: "Cookie Policy | Airisto",
    };

    const descriptions = {
        tr: "Airisto için Çerez Politikası - Platformumuzda kullanılan cookie ve benzer teknolojiler hakkında bilgi almak istiyorsanız.",
        en: "Cookie Policy for Airisto - Learn about how we use cookies and similar technologies on our platform.",
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