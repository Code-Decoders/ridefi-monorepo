"use client";

import { useEffect } from "react";
import "./globals.css";
import {  onUserChanged } from "./_lib/firebase";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const authPages = ["/login", "/signup"];
  useEffect(() => {
    onUserChanged().then((user) => {
      if (pathname === "/") {
        return;
      } else if (user && authPages.includes(pathname)) {
        window.location.href = "/dashboard";
      } else {
        if (!user && !authPages.includes(pathname)) {
          window.location.href = "/login";
        }
      }
    });
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>RideFi</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
