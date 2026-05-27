import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/themeProvider";
import { I18nProvider } from "./providers/i18nProvider";
import SiteHeader from "./components/SiteHeader";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://mathiasfx.github.io";
const SITE_DESCRIPTION =
  "Portfolio de Mathias Pereira — Frontend Developer especializado en React, Next.js y Node.js.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mathias Pereira | Frontend Developer",
    template: "%s | Mathias Pereira",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Mathias Pereira",
    title: "Mathias Pereira | Frontend Developer",
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/appsuperparty.png", width: 1200, height: 630, alt: "Mathias Pereira Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathias Pereira | Frontend Developer",
    description: SITE_DESCRIPTION,
    images: ["/images/appsuperparty.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <I18nProvider>
            <SiteHeader />
            <main className="w-full flex-1 flex flex-col items-center">{children}</main>
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
