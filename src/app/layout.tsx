import type { Metadata } from "next";
import { Navbar, QueryProvider } from "@/components";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
        <body className={`${poppins.variable} antialiased flex flex-col sm:px-16 md:px-24 py-4 gap-4 min-h-screen`}>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
