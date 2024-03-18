import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Energy Dashboard",
  description: "Designed and developed by Parvan Andrei Leonard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen w-full bg-white text-black flex",
        inter.className, {
        'debug-screens': process.env.NODE_ENV === "development"
      })}>
        {/* sidebar */}
        {/* <p className="border"> SIDEBAR</p> */}
        <SideNavbar />
        {/* main page */}
        <div className="p-8 w-full">  {children}</div>
       </body>
    </html>
  );
}
