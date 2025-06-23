import { Metadata } from "next";
import { cookies } from "next/headers";


export async function generateMetadata(): Promise<Metadata> {
    const lang = (await cookies()).get('i18nextLng')?.value || 'tr';
    const titles = {
        tr: "Airisto - Gizlilik Politikası",
        en: "Privacy Policy | Airisto",
    };

    const descriptions = {
        tr: "Airisto'nun Gizlilik Politikası - Kişisel bilgilerinizin toplanma, kullanımı ve korunumu hakkında bilgi almak istiyorsanız.",
        en: "Privacy Policy for Airisto - Learn how we collect, use, and protect your personal information.",
    };

    return {
        title: titles[lang as keyof typeof titles],
        description: descriptions[lang as keyof typeof descriptions],
        icons: {
            icon: "/icon.ico",
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