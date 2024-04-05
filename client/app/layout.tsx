import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UsernameProvider } from "@/context/UsernameContext";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
// import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cook",
  description: "Web app for sharing recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0)20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      >
        <AuthProvider>
          <UsernameProvider>
            {children}
            <Toaster />
          </UsernameProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
