"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);


export function SidebarProvider ({children} : {children: ReactNode }) {
    const [isOpen, setIspon] = useState(false);

    const toggleSidebar = () => setIspon((prev) => !prev);
    const closeSidebar = () => setIspon(false);

    return (
        <SidebarContext.Provider value={{isOpen, toggleSidebar, closeSidebar}}>
         {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context =  useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context;
}