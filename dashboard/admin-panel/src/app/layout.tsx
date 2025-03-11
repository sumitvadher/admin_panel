import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

// Ensure correct imports
import AppSidebar from "@/layout/AppSidebar";
import AppHeader from "@/layout/AppHeader";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              {/* ✅ Single Sidebar */}
              <AppSidebar />

              <div className="flex flex-col flex-1 min-h-screen">
                {/* ✅ Single Header */}
                <AppHeader />

                {/* ✅ Prevent Navbar Overlap */}
                <main className="p-6 mt-16">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

