import HomeView from "@/sections/home/view/home-view";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Tespit Aracı</title>
        <meta name="description" content="Yazının yapay zeka tarafından mı yoksa insan tarafından mı yazıldığını analiz eder." />
        <meta name="keywords" content="AI tespiti, yapay zeka, Türkçe analiz, GPT dedektörü" />
      </Head>
      <HomeView />
    </>
  );
}
