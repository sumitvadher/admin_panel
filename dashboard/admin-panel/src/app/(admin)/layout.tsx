"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

import AppSidebar from "@/layout/AppSidebar";
import AppHeader from "@/layout/AppHeader";
import Backdrop from "@/layout/Backdrop";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900">
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              {/* Sidebar */}
              <AppSidebar />
              <Backdrop />

              <div className="flex flex-col flex-1 min-h-screen">
                {/* Header */}
                <AppHeader />

                {/* Page Content */}
                <main className="p-6 mt-16">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

