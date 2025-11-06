import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InnoJSC Careers - Tuyển dụng nhân tài công nghệ",
  description: "Tham gia đội ngũ InnoJSC - Nơi tài năng được phát triển và khẳng định. Khám phá các cơ hội nghề nghiệp hấp dẫn trong lĩnh vực công nghệ thông tin.",
  keywords: ["InnoJSC", "tuyển dụng", "việc làm IT", "công nghệ", "developer", "frontend", "backend"],
  authors: [{ name: "InnoJSC" }],
  openGraph: {
    title: "InnoJSC Careers - Tuyển dụng nhân tài công nghệ",
    description: "Tham gia đội ngũ InnoJSC - Nơi tài năng được phát triển và khẳng định",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
