"use client";

import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FileText, MessageSquare, Settings, HelpCircle, X, User, LogOut, Star } from 'lucide-react';
import { LogoutButton } from "./LogoutButton"; // Fixed typo here

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  activePath: string;
}

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-screen lg:h-auto min-h-screen w-64 bg-background border-r border-gray-800 flex flex-col overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-brand">Talentra</div>
          {/* Close button on mobile */}
          <button onClick={closeSidebar} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2 px-4">
          <SidebarLink href="/dashboard" icon={<Home size={18} />} label="Home" activePath={pathname} />
          <SidebarLink href="/jobs" icon={<Briefcase size={18} />} label="Jobs" activePath={pathname} />
          <SidebarLink href="/featured" icon={<Star size={18} />} label="Fearured Jobs" activePath={pathname} />
          
          <SidebarLink href="/profiles" icon={<User size={18} />} label="Profiles" activePath={pathname} />
          <SidebarLink href="/applications" icon={<FileText size={18} />} label="My Applications" activePath={pathname} />
          <SidebarLink href="/messages" icon={<MessageSquare size={18} />} label="Messages" badge={3} activePath={pathname} />
          <SidebarLink href="/documents" icon={<FileText size={18} />} label="Documents" activePath={pathname} />
        </nav>

        <div className="mb-6 px-4 space-y-2 mt-auto">
          <SidebarLink href="/settings" icon={<Settings size={18} />} label="Settings" activePath={pathname} />
          <SidebarLink href="/help" icon={<HelpCircle size={18} />} label="Help" activePath={pathname} />
          
          {/* Logout Button */}
          <LogoutButton 
            variant="link"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition w-full text-left"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </LogoutButton>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ href, icon, label, badge, activePath }: SidebarLinkProps) {
  const active = activePath === href;
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
        active ? "bg-blue-500 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">{badge}</span>}
    </Link>
  );
}
