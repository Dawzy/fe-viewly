import type { Metadata } from "next";
import { Navbar } from "@/components";
import { Poppins } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={`${poppins.variable} antialiased flex flex-col sm:px-16 md:px-24 py-4 gap-4 min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
