import "./globals.css";

import type { Metadata } from "next";
import { QueryProvider, DialogProviders, Navbar, Footer } from "@/components";
import { Poppins } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { dark } from "@clerk/themes";
import { NextThemeProvider } from "@/components";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Viewly",
  description: "Compose movie lists!",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${poppins.variable} antialiased flex flex-col sm:px-16 md:px-24 !py-4 gap-4 min-h-screen`}>
          <NextThemeProvider defaultTheme="dark" attribute="class">
            <QueryProvider>
              <DialogProviders>
                <Navbar />
                {children}
                <Footer />
              </DialogProviders>
            </QueryProvider>
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "var(--toaster-background)",
                  color: "var(--toaster-foreground)",
                },
              }}
            />
          </NextThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
