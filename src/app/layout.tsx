import "./globals.css";
import { Schibsted_Grotesk, Anybody } from "next/font/google";
import { ReactNode } from "react";

import { AI } from "@/app/action";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Providers } from "./providers";

import type { Metadata } from "next";

const fontSans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

const fontHeading = Anybody({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@myhandle",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <AI>
          <Providers>{children}</Providers>
        </AI>
      </body>
    </html>
  );
}
