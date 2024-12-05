import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "test task 3",
  description: "created by VLAD Shelest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
