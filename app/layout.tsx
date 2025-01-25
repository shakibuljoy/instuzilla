import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instuzilla",
  description: "A school management solution",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthenticationProvider>
        {children}
        <Toaster />
      </AuthenticationProvider>
        
      </body>
    </html>
  );
}
