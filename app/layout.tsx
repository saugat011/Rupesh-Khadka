import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://yourdomain.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rupesh Khadka | Cybersecurity Researcher & ML Engineer", template: "%s | Rupesh Khadka" },
  description: "Portfolio of Rupesh Khadka, a Cybersecurity Researcher, Malware Analyst, and Machine Learning Engineer.",
};

export const viewport: Viewport = {
  themeColor: "#010603",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Force manual scroll restoration: this stops mobile browsers from snapping to previous positions */}
        <script dangerouslySetInnerHTML={{ __html: `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }` }} />
      </head>
      
      {/* overscroll-y-none (Tailwind) fixes the hydration mismatch and stops pull-to-refresh jumps */}
      <body className="min-h-screen bg-[#010603] text-[#00ff88] antialiased relative selection:bg-emerald-500 selection:text-black overflow-x-hidden overscroll-y-none">
        <div className="crt-overlay" />
        {/* Isolate smooth scrolling to an inner wrapper */}
        <div className="scroll-smooth">
          {children}
        </div>
      </body>
    </html>
  );
}