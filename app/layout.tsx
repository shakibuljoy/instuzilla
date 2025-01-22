import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";


  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthenticationProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex flex-1">
      
        <SidebarTrigger />
        <div className="flex-1 mx-auto items-center sm:gap-4 sm:py-4 sm:pl-14 md:w-7xl">
          {children}
        </div>
      </main>
    </SidebarProvider>
        <Toaster />
        </AuthenticationProvider>
        
      </body>
    </html>
  );
}
