import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google"
import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Header from "@/components/header/header";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from "./app-sidebar";

const robotoHeading = Roboto({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Budget Tracker App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, robotoHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <SidebarProvider>
            <AppSidebar/>
            <main>
              <SidebarTrigger/>
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
