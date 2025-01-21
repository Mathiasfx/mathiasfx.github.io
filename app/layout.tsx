import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/provider";
import { Providers } from "./providers/themeProvider";
import { I18nProvider } from "./providers/i18nProvider";

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

export const metadata: Metadata = {
  title: "Mathias Pereira | Frontend Developer",
  description: "My developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <StoreProvider>
        <body
          className={`${montserrat.variable} ${roboto.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <Providers>
            <I18nProvider> {children}</I18nProvider>
          </Providers>
        </body>
      </StoreProvider>
    </html>
  );
}
