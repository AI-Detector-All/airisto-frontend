import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NoSSR } from "@/components/no-ssr";

export const metadata: Metadata = {
  title: "Airisto",
  description: "Generated by create next app",
};

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
