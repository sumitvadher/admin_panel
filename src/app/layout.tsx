import "./globals.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex">
                <Sidebar />
                <div className="flex flex-col flex-1 ml-64"> {/* Adjust content width based on sidebar */}
                    <Navbar />
                    <main className="p-6">{children}</main>
                </div>
            </body>
        </html>
    );
}

