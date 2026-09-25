import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata = {
  title: "Mates & Weights",
  description: "Aussie gym volume, streaks, and mate battles.",
  applicationName: "Mates & Weights",
  appleWebApp: {
    capable: true,
    title: "Mates & Weights",
    statusBarStyle: "default"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#E6E6E3"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
