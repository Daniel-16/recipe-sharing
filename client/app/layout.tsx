import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UsernameProvider } from "@/context/UsernameContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cook",
  description:
    "Explore a vibrant community of food enthusiasts, share unique recipes, and inspire others on our recipe sharing app. Join us, whether you're a seasoned chef or a passionate home cook, for a delightful culinary journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="favicon.png" />
      </head>
      <body
        className={inter.className}
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0)20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      >
        <AuthProvider>
          <UsernameProvider>{children}</UsernameProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
