import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careers.innojsc.com';
const siteName = 'InnoJSC Careers';
const siteDescription = 'Tham gia đội ngũ InnoJSC - Nơi tài năng được phát triển và khẳng định. Khám phá các cơ hội nghề nghiệp hấp dẫn trong lĩnh vực công nghệ thông tin.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InnoJSC Careers - Tuyển dụng nhân tài công nghệ",
    template: "%s | InnoJSC Careers",
  },
  description: siteDescription,
  keywords: [
    "InnoJSC",
    "tuyển dụng",
    "việc làm IT",
    "công nghệ",
    "developer",
    "frontend",
    "backend",
    "react",
    "nodejs",
    "việc làm Hà Nội",
    "việc làm TP.HCM",
    "lập trình viên",
  ],
  authors: [{ name: "InnoJSC", url: "https://innojsc.com" }],
  creator: "InnoJSC",
  publisher: "InnoJSC",

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: siteName,
    title: "InnoJSC Careers - Tuyển dụng nhân tài công nghệ",
    description: siteDescription,
    images: [
      {
        url: "/images/og-image.jpg", // 1200x630px
        width: 1200,
        height: 630,
        alt: "InnoJSC Careers",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@innojsc", // Update với Twitter handle thực tế
    creator: "@innojsc",
    title: "InnoJSC Careers - Tuyển dụng nhân tài công nghệ",
    description: siteDescription,
    images: ["/images/og-image.jpg"],
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Verification (add when available)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Alternates for language versions (if needed)
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "InnoJSC",
              url: "https://innojsc.com",
              logo: `${siteUrl}/images/logo.svg`,
              sameAs: [
                "https://www.facebook.com/innojsc",
                "https://www.linkedin.com/company/innojsc",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84-969-979-391",
                contactType: "Customer Service",
                areaServed: "VN",
                availableLanguage: ["Vietnamese", "English"],
              },
            }),
          }}
        />
        {/* Structured Data - JobPosting will be added per job page */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
