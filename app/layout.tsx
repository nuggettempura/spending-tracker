import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
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
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
