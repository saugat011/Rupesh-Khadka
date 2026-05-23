import type { Metadata, Viewport } from "next"; // <-- Add Viewport here
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
  description: "Official portfolio of CEH Rupesh Khadka...",
  // ... Keep the rest of your metadata exactly the same ...
  // REMOVE the themeColor line from here!
};

// Add this new export for the viewport/theme color
export const viewport: Viewport = {
  themeColor: "#000000",
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
      <body className="min-h-screen bg-black text-white antialiased relative selection:bg-emerald-500 selection:text-black">
        <div className="crt-overlay" />
        {children}
      </body>
    </html>
  );
}