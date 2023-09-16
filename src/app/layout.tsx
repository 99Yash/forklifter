import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: "Online portfolio generator",
  keywords: [
    "portfolio",
    "generator",
    "NextJS",
    "React",
    "TailwindCSS",
    "TypeScript",
    "MongoDB",
    "NodeJS",
  ],
  twitter: {
    title: siteConfig.name,
    description:
      "A fully responsive Portfolio generator • Shadcn/UI • Server Components",
    creator: "@YashGouravKar1",
  },
  authors: {
    name: "Yash Gourav Kar",
    url: siteConfig.links.twitter,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <ClerkProvider>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
          <TailwindIndicator />
        </body>
      </ClerkProvider>
    </html>
  );
}
