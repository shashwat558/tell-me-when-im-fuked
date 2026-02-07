import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast"
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "TellMeWhen | Real-time Crypto Price Alerts",
  description: "Stop checking charts. We'll ping you the second your target price hits. Reliable, fast, and multi-channel notifications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider position="top-center">
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
