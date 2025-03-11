"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Sidebar Context Type
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  openMenus: { [key: string]: boolean };
  toggleMenu: (menu: string) => void;
}

// Create Context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    offers: false,
    transactions: false,
    reports: false,
    affiliates: false,
    mapping: false,
    settings: false,
  });

  useEffect(() => {
    setIsCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar-collapsed", String(newState));
      return newState;
    });
  };

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, openMenus, toggleMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};

