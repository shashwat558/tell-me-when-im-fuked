"use client"

import { Layout } from "@/components/ui/layout"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  PlusCircle, 
  Bell, 
  History, 
  User,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { toastManager } from "@/components/ui/toast"
import { useEffect } from "react"
import { useSessionStore } from "@/store/session"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, hydrate, clearSession } = useSessionStore()

  useEffect(() => {
    const linkedKey = "telegram_linked"
    const toastShownKey = "telegram_link_prompt_shown"

    const isLinked = window.localStorage.getItem(linkedKey) === "true"
    const alreadyShown = window.localStorage.getItem(toastShownKey) === "true"

    if (!isLinked && !alreadyShown) {
      // Add a small delay to ensure toast provider is mounted
      setTimeout(() => {
        toastManager.add({
          title: "Link your Telegram",
          description: "Connect Telegram to get instant alerts there.",
          type: "info",
        })
      }, 300)

      window.localStorage.setItem(toastShownKey, "true")
    }
  }, [])
  
  const sidebarItems = [
    { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="size-4" /> },
    { title: "Create Alert", href: "/alerts/create", icon: <PlusCircle className="size-4" /> },
    { title: "My Alerts", href: "/alerts", icon: <Bell className="size-4" /> },
    { title: "Notifications", href: "/notifications", icon: <History className="size-4" /> },
    { title: "Profile", href: "/profile", icon: <User className="size-4" /> },
  ]

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [loading, user, router])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarContent>
            <div className="p-6">
              <h1 className="text-xl font-bold tracking-tight text-primary uppercase">TMW<span className="text-gray-500">IF</span></h1>
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton 
                        isActive={pathname === item.href}
                        tooltip={item.title}
                        render={
                          <Link className="font-bold text-gray-300" href={item.href}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        }
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border">
            <div className="flex items-center justify-between gap-4">
              <ThemeToggle />
              <button
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={() => {
                  clearSession()
                  router.push("/auth")
                }}
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <Layout.Content className="flex-1">
          {children}
        </Layout.Content>
      </div>
    </SidebarProvider>
  )
}
