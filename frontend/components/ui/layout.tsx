import * as React from "react"
import { cn } from "@/lib/utils"

const LayoutRoot = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("flex min-h-screen bg-background text-foreground", className)}>
    {children}
  </div>
)

const LayoutContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <main className={cn("flex-1 overflow-y-auto p-8", className)}>
    {children}
  </main>
)

export const Layout = {
  Root: LayoutRoot,
  Content: LayoutContent,
}
