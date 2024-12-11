import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProvider from "./provider";
import { MSWComponent } from "./provider/MSWComponent";
import { SwygScript } from "./scripts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "디지털 다이어리 'Woozuda'",
  description:
    "글쓰기 템플릿 및 도구 지원과 일기 분석 통계 기능을 지원하는 다이어리앱입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SwygScript />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center`}
      >
        <MSWComponent />
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
