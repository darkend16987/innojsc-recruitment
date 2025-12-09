import type { Metadata } from "next";
import { Open_Sans, Roboto_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { AuthProvider } from "@/contexts/AuthContext";

const openSans = Open_Sans({
  weight: ['300', '400', '600', '700'],
  variable: "--font-open-sans",
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  weight: ['400', '500'],
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['600', '700', '800'],  // Semi-Bold, Bold, Extra-Bold
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careers.innojsc.com';
const siteName = 'Inno JSC Careers';
const siteDescription = 'Hãy tham gia cùng chúng tôi - INNO JSC. Công ty tư vấn xây dựng hàng đầu Việt Nam';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Inno JSC Careers - Join us and build your dream",
    template: "%s | InnoJSC Careers",
  },
  description: siteDescription,
  keywords: [
    "InnoJSC",
    "tuyển dụng",
    "việc làm xây dựng",
    "công nghệ",
    "Việc làm kiến trúc",
    "Kiến trúc sư",
    "Kỹ sư xây dựng",
    "Xây dựng",
    "Tư vấn xây dựng",
    "việc làm Hà Nội",
    "việc làm TP.HCM",
    "BIM",
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
    title: "Inno JSC Careers - Join us and build your dream",
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
    title: "Inno JSC Careers - Join us and build your dream",
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
                telephone: "0243-2121-776",
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
        className={`${openSans.variable} ${robotoMono.variable} ${montserrat.variable} antialiased`}
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
