"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Info } from "lucide-react"

export default function CreateAlertPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Alert</h1>
        <p className="text-muted-foreground">Configure your price triggers and notification preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert Condition</CardTitle>
          <CardDescription>Select the asset and set the trigger conditions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Cryptocurrency</label>
            <Select defaultValue="btc">
              <SelectTrigger>
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="sol">Solana (SOL)</SelectItem>
                <SelectItem value="link">Chainlink (LINK)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="price">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="price">Price Level</TabsTrigger>
              <TabsTrigger value="percentage">Percentage Change</TabsTrigger>
            </TabsList>
            <TabsContent value="price" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Price Above</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input className="pl-7" placeholder="e.g. 60000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Price Below</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input className="pl-7" placeholder="e.g. 45000" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="percentage" className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Price change in last 24h</label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Input className="pr-8" placeholder="e.g. 5" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                  <Select defaultValue="increase">
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="increase">Increase</SelectItem>
                      <SelectItem value="decrease">Decrease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Where should we send the alert when it triggers?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'email', name: 'Email', desc: 'Instant email alert' },
              { id: 'sms', name: 'SMS', desc: 'Mobile text msg' },
              { id: 'telegram', name: 'Telegram', desc: '@alert_fi_bot' },
            ].map((channel) => (
              <label 
                key={channel.id} 
                className="flex flex-col gap-2 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 cursor-pointer hover:border-neutral-700 transition-all peer-checked:border-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{channel.name}</span>
                  <Checkbox id={channel.id} />
                </div>
                <span className="text-xs text-neutral-500">{channel.desc}</span>
              </label>
            ))}
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400">
            <Info size={14} />
            Multiple channels can be selected. Standard carrier rates may apply for SMS.
          </div>
        </CardContent>
        <CardFooter className="border-t border-neutral-800 pt-6">
          <Button variant="default" className="w-full" size="lg">Create Alert</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
