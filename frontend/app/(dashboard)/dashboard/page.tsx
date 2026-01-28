import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Bell, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const stats = [
    { title: "Active Alerts", value: "12", icon: <Bell className="text-emerald-500" />, change: "+2 this week", trend: "up" },
    { title: "Triggered Today", value: "05", icon: <TrendingUp className="text-blue-500" />, change: "-12% vs yesterday", trend: "down" },
    { title: "Channels Enabled", value: "03", icon: <ShieldCheck className="text-amber-500" />, change: "All systems live", trend: "neutral" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your active crypto alerts and recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => ( stat.title && (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'error' : 'default'} className="px-1.5 py-0">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { pair: "BTC/USD", price: "$52,430", condition: "Price Above", time: "2 mins ago" },
                { pair: "ETH/USD", price: "$3,120", condition: "Price Below", time: "1 hour ago" },
                { pair: "SOL/USD", price: "$104.50", condition: "Price Above", time: "4 hours ago" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] text-foreground border border-border">
                      {alert.pair.split('/')[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{alert.pair}</div>
                      <div className="text-xs text-muted-foreground">{alert.condition} {alert.price}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Market Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Bitcoin", symbol: "BTC", price: "$52,240.21", change: "+1.2%" },
                { name: "Ethereum", symbol: "ETH", price: "$3,112.45", change: "-0.5%" },
                { name: "Solana", symbol: "SOL", price: "$103.12", change: "+4.8%" },
              ].map((coin, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-foreground">{coin.name}</div>
                    <Badge variant="outline">{coin.symbol}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{coin.price}</div>
                    <div className={cn("text-xs", coin.change.startsWith('+') ? "text-emerald-500" : "text-destructive")}>
                      {coin.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
