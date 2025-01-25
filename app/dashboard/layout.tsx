import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { AppSidebar } from "../components/AppSidebar";

export const metadata: Metadata = {
  title: "Instuzilla",
  description: "Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";


  return (
      <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex flex-1">
      
        <SidebarTrigger />
        <div className="flex-1 mx-auto items-center sm:gap-4 sm:py-4 sm:pl-14 md:w-7xl">
          {children}
        </div>
      </main>
    </SidebarProvider>
        
  );
}
