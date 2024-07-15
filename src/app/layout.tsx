import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSON AI Saas App",
  description: "Convert unstructured String data into JSON format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(rubik.className, "antialiased bg-background")}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
