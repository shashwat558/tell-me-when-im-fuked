import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Navigation, ExternalLink } from "lucide-react"

export default function NotificationsPage() {
  const history = [
    { id: 1, coin: "Bitcoin", symbol: "BTC", trigger: "Above $52,000", price: "$52,005.12", channel: "Telegram", time: "2 hours ago", status: "Delivered" },
    { id: 2, coin: "Ethereum", symbol: "ETH", trigger: "Below $3,100", price: "$3,098.45", channel: "Email", time: "5 hours ago", status: "Delivered" },
    { id: 3, coin: "Solana", symbol: "SOL", trigger: "Above $100.00", price: "$100.50", channel: "SMS", time: "Yesterday at 4:32 PM", status: "Delivered" },
    { id: 4, coin: "Chainlink", symbol: "LINK", trigger: "+10% in 24h", price: "$21.14", channel: "Telegram", time: "Yesterday at 11:05 AM", status: "Delivered" },
    { id: 5, coin: "Bitcoin", symbol: "BTC", trigger: "Above $50,000", price: "$50,010.00", channel: "Email", time: "2 days ago", status: "Delivered" },
  ]

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Email': return <Mail size={14} className="text-blue-500" />
      case 'SMS': return <MessageSquare size={14} className="text-emerald-500" />
      case 'Telegram': return <Navigation size={14} className="text-sky-500" />
      default: return null
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notification History</h1>
        <p className="text-muted-foreground font-semibold">View all alerts that have been triggered in the past 30 days.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {history.map((event) => (
              <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-muted/40 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground border border-border">
                    {event.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{event.coin} Alert</span>
                      <Badge variant="outline" className="text-[10px] py-0">{event.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Triggered {event.trigger} at {event.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-900">
                    {getChannelIcon(event.channel)}
                    <span className="text-xs text-neutral-400 font-medium">{event.channel}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-500">{event.time}</div>
                    <button className="text-xs text-neutral-500 hover:text-white flex items-center gap-1 mt-1 transition-colors cursor-pointer">
                      View Tx <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <button className="text-sm font-medium text-neutral-500 hover:text-white transition-colors cursor-pointer">
          Load older notifications...
        </button>
      </div>
    </div>
  )
}
