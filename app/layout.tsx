import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Spending Tracker",
    template: "%s | Spending Tracker",
  },
  description: "Track your expenses across bank accounts and credit cards, and get clear insights into your spending habits to make more informed financial decisions.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Spending Tracker",
    title: "Spending Tracker",
    description: "Track your expenses across bank accounts and credit cards and get clear insights into your spending habits.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spending Tracker",
      }
    ],
  },
  icons: {
    icon: [
      { url: "/icons/icon-32px.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192px.png", sizes: "192x192x", type: "image/png" },
    ],
    apple: "/icons/icon-180px.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
