"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Bell, Phone, Mail, Navigation } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile & Preferences</h1>
        <p className="text-neutral-400">Manage your contact information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <Card className="text-center p-6 bg-linear-to-b from-neutral-900 to-black">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-neutral-800 border-4 border-neutral-900 mx-auto overflow-hidden flex items-center justify-center">
                <User size={48} className="text-neutral-600" />
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white text-black border-2 border-neutral-950 hover:bg-neutral-200 transition-all cursor-pointer">
                <Shield size={14} />
              </button>
            </div>
            <h3 className="text-lg font-bold text-white">Shashwat</h3>
            <p className="text-sm text-neutral-500 mb-4">shashwat@example.com</p>
            <Badge variant="success">Pro Plan</Badge>
          </Card>
          
          <nav className="space-y-1">
            {[
              { label: 'General', icon: <User size={16} />, active: true },
              { label: 'Notification Methods', icon: <Bell size={16} /> },
              { label: 'Security', icon: <Shield size={16} /> },
            ].map((item) => (
              <button 
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  item.active ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white hover:bg-neutral-900"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>We use these to send your price alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  <div className="flex gap-2">
                    <Input defaultValue="shashwat@example.com" disabled />
                    <Button variant="outline" size="sm">Verified</Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <div className="flex gap-2">
                    <Input placeholder="+1 (555) 000-0000" />
                    <Button variant="default" size="sm">Verify</Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                    <Navigation size={14} /> Telegram Username
                  </label>
                  <div className="flex gap-2">
                    <Input placeholder="@yourusername" />
                    <Button variant="default" size="sm">Connect</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-neutral-800 pt-6">
              <Button variant="default" className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Default settings for new alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Market Volatility', desc: 'Notify when Bitcoin moves more than 5% in 1 hour' },
                { title: 'Weekly Summary', desc: 'Receive a summary of your alert activity' },
                { title: 'Sound Alerts', desc: 'Play sound when dashboard is open' },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-neutral-900 bg-neutral-950/50">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-white">{pref.title}</div>
                    <div className="text-xs text-neutral-500">{pref.desc}</div>
                  </div>
                  <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    <span className="translate-x-1 inline-block h-4 w-4 rounded-full bg-neutral-400" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"
