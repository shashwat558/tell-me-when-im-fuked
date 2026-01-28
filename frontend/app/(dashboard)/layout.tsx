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
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const sidebarItems = [
    { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="size-4" /> },
    { title: "Create Alert", href: "/alerts/create", icon: <PlusCircle className="size-4" /> },
    { title: "My Alerts", href: "/alerts", icon: <Bell className="size-4" /> },
    { title: "Notifications", href: "/notifications", icon: <History className="size-4" /> },
    { title: "Profile", href: "/profile", icon: <User className="size-4" /> },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarContent>
            <div className="p-6">
              <h1 className="text-xl font-bold tracking-tight text-primary uppercase">Coss Crypto</h1>
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
                          <Link href={item.href}>
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
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
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
