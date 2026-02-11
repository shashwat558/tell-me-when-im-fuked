"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Info } from "lucide-react"
import { useSessionStore } from "@/store/session"
import { toastManager } from "@/components/ui/toast"
import { useSearchParams } from "next/navigation"

type AlertApiItem = {
  id: string
  userId: string
  alert_medium: "TELEGRAM" | "EMAIL"
  coin_name: string
  coin_symbol: "BTC" | "ETH" | "SOL" | "MON"
  price_above: number | null
  price_below: number | null
}

export default function CreateAlertPage() {
  const { user } = useSessionStore()
  const searchParams = useSearchParams()
  const alertId = searchParams.get("alertId")

  const [coinSymbol, setCoinSymbol] = React.useState<AlertApiItem["coin_symbol"]>("BTC")
  const [priceAbove, setPriceAbove] = React.useState("")
  const [priceBelow, setPriceBelow] = React.useState("")
  const [channels, setChannels] = React.useState({ email: true, telegram: false })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(Boolean(alertId))

  const getCoinName = (symbol: AlertApiItem["coin_symbol"]) => {
    switch (symbol) {
      case "BTC":
        return "Bitcoin"
      case "ETH":
        return "Ethereum"
      case "SOL":
        return "Solana"
      case "MON":
        return "Monero"
      default:
        return symbol
    }
  }

  React.useEffect(() => {
    if (!alertId) return

    let isMounted = true

    const loadAlert = async () => {
      try {
        const res = await fetch(`/api/alerts?alertId=${alertId}`)
        if (!res.ok) throw new Error("Failed to load alert")
        const data = await res.json()
        const alert = data?.alert as AlertApiItem | undefined
        if (!alert) throw new Error("Missing alert")

        if (isMounted) {
          setCoinSymbol(alert.coin_symbol)
          setPriceAbove(alert.price_above != null ? String(alert.price_above) : "")
          setPriceBelow(alert.price_below != null ? String(alert.price_below) : "")
          setChannels({
            email: alert.alert_medium === "EMAIL",
            telegram: alert.alert_medium === "TELEGRAM",
          })
        }
      } catch {
        toastManager.add({
          title: "Unable to load alert",
          description: "Please try again.",
          type: "error",
        })
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadAlert()
    return () => {
      isMounted = false
    }
  }, [alertId])

  const handleSubmit = async () => {
    if (!user?.id) {
      toastManager.add({
        title: "Missing user",
        description: "Please sign in again.",
        type: "error",
      })
      return
    }

    const above = priceAbove.trim() === "" ? null : Number(priceAbove)
    const below = priceBelow.trim() === "" ? null : Number(priceBelow)

    if ((above != null && Number.isNaN(above)) || (below != null && Number.isNaN(below))) {
      toastManager.add({
        title: "Invalid price",
        description: "Please enter a valid number.",
        type: "error",
      })
      return
    }

    const alertMedium: AlertApiItem["alert_medium"] = channels.telegram ? "TELEGRAM" : "EMAIL"

    setIsSubmitting(true)
    try {
      const payload = {
        userId: user.id,
        coin_name: getCoinName(coinSymbol),
        coin_symbol: coinSymbol,
        price_above: above,
        price_below: below,
        alert_medium: alertMedium,
      }

      const res = await fetch("/api/alerts", {
        method: alertId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertId ? { ...payload, alertId } : payload),
      })

      if (!res.ok) throw new Error("Save failed")

      toastManager.add({
        title: alertId ? "Alert updated" : "Alert created",
        description: "Your alert has been saved.",
        type: "success",
      })
    } catch {
      toastManager.add({
        title: "Unable to save alert",
        description: "Please try again.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <Select value={coinSymbol} onValueChange={(value) => setCoinSymbol(value as AlertApiItem["coin_symbol"])}>
              <SelectTrigger>
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="SOL">Solana (SOL)</SelectItem>
                <SelectItem value="MON">Monero (MON)</SelectItem>
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
                    <Input
                      className="pl-7"
                      placeholder="e.g. 60000"
                      value={priceAbove}
                      onChange={(event) => setPriceAbove(event.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Price Below</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      className="pl-7"
                      placeholder="e.g. 45000"
                      value={priceBelow}
                      onChange={(event) => setPriceBelow(event.target.value)}
                    />
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
                  <Checkbox
                    id={channel.id}
                    checked={channels[channel.id as keyof typeof channels] ?? false}
                    onCheckedChange={(checked) => {
                      if (channel.id === "sms") return
                      setChannels((prev) => ({
                        ...prev,
                        [channel.id]: Boolean(checked),
                      }))
                    }}
                  />
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
          <Button
            variant="default"
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting || isLoading}
          >
            {isLoading ? "Loading..." : alertId ? "Update Alert" : "Create Alert"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
