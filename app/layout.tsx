import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/provider";
import { Providers } from "./providers/themeProvider";

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
  description: "My portfolio ",
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
          <Providers>{children}</Providers>
        </body>
      </StoreProvider>
    </html>
  );
}
