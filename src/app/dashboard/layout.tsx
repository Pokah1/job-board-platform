"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

function LayoutWrapper({children} : {children: React.ReactNode}) {
    const { toggleSidebar } = useSidebar();

    return (
        <div className="flex bg-background text-primary-foreground min-h-screen">
            <Sidebar />

            {/* Main Content */}

            <main className="flex-1 p-6 overflow-y-auto">
                {/* Mobile menu button */}
                <Button 
                onClick={toggleSidebar}
                className="lg:hidden mb-4 p-2 bg-gray-800 rounded-lg"
                >
                    <Menu size={24}/>
                </Button>
                {children}

            </main>
        </div>
    );
}

export default function DashboardLayout({children}: {children: ReactNode}) {
    return (
        <SidebarProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
        </SidebarProvider>
    );
}