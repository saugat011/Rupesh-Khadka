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
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "CEH Rupesh Khadka | Cybersecurity Researcher",
    template: "%s | CEH Rupesh Khadka",
  },

  description:
    "Official portfolio of CEH Rupesh Khadka — Ethical Hacker, Malware Researcher, AI Security Enthusiast, Penetration Tester, and Full-Stack Developer specializing in reverse engineering, AI-driven cybersecurity, and secure system development.",

  keywords: [
    "CEH Rupesh Khadka",
    "Cybersecurity Researcher",
    "Ethical Hacker",
    "Malware Analyst",
    "Reverse Engineering",
    "Penetration Testing",
    "VAPT",
    "AI Security",
    "Machine Learning",
    "Full Stack Developer",
    "Cybersecurity Nepal",
    "CTF Player",
    "Security Researcher",
    "Bug Bounty",
  ],

  authors: [
    {
      name: "CEH Rupesh Khadka",
      url: "https://yourdomain.com",
    },
  ],

  creator: "CEH Rupesh Khadka",
  publisher: "CEH Rupesh Khadka",

  applicationName: "CEH Rupesh Khadka Portfolio",

  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://yourdomain.com",
  },

  openGraph: {
    title: "CEH Rupesh Khadka | Cybersecurity Researcher",
    description:
      "Cybersecurity Researcher, Malware Analyst, Ethical Hacker, AI Security Enthusiast, and Full-Stack Developer.",
    url: "https://yourdomain.com",
    siteName: "CEH Rupesh Khadka",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CEH Rupesh Khadka Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CEH Rupesh Khadka | Cybersecurity Researcher",
    description:
      "Ethical Hacker, Malware Researcher, AI Security Enthusiast, and Full-Stack Developer.",
    images: ["/og-image.png"],
    creator: "@yourusername",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#000000",

  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}

