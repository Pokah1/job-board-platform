"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useSidebar();

   const { token } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (token === undefined) return; // loading
      if (token === null) router.push("/login"); // redirect no token
    }, [token, router]);
  
    if (token === undefined) return <p>Loading authentication status...</p>;

  return (
    <div className="flex min-h-screen bg-background text-primary-foreground">
      {/* Sidebar */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        {/* Mobile menu button */}
        <Button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 p-2 bg-gray-800 rounded-lg self-start"
        >
          <Menu size={24} />
        </Button>

        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </SidebarProvider>
  );
}
