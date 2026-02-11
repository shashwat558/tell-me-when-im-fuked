"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Pause, 
  Play,
  Trash2, 
  Navigation,
  Pencil,
  Mail
} from "lucide-react"

import { Modal } from "@/components/ui/modal"
import { useSessionStore } from "@/store/session"

type AlertItem = {
  id: string
  userId: string
  coin_name: string
  coin_symbol: string
  price_above: number | null
  price_below: number | null
  alert_medium: "TELEGRAM" | "EMAIL"
  paused: boolean
  created_at: string
  updated_at: string
}

export default function MyAlertsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [alerts, setAlerts] = React.useState<AlertItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [deleteAlertId, setDeleteAlertId] = React.useState<string | null>(null)
  const [togglingAlertId, setTogglingAlertId] = React.useState<string | null>(null)
  const { user } = useSessionStore()

  React.useEffect(() => {
    let isMounted = true

    const loadAlerts = async () => {
      try {
        const res = await fetch("/api/alerts")
        if (!res.ok) throw new Error("Failed to load alerts")
        const data = await res.json()
        const allAlerts = (data?.alerts ?? []) as AlertItem[]

        const filtered = user?.id
          ? allAlerts.filter((alert) => alert.userId === user.id)
          : allAlerts

        if (isMounted) {
          setAlerts(filtered)
        }
      } catch {
        if (isMounted) {
          setAlerts([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadAlerts()
    return () => {
      isMounted = false
    }
  }, [user?.id])

  const handleDelete = async () => {
    if (!deleteAlertId) return
    try {
      const res = await fetch("/api/alerts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId: deleteAlertId }),
      })
      if (!res.ok) throw new Error("Delete failed")
      setAlerts((prev) => prev.filter((alert) => alert.id !== deleteAlertId))
    } finally {
      setDeleteAlertId(null)
      setIsDeleteModalOpen(false)
    }
  }

  const handleTogglePause = async (alertId: string, paused: boolean) => {
    setTogglingAlertId(alertId)
    try {
      const res = await fetch("/api/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId, paused: !paused }),
      })
      if (!res.ok) throw new Error("Pause failed")
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === alertId ? { ...alert, paused: !paused } : alert
        )
      )
    } finally {
      setTogglingAlertId(null)
    }
  }

  const formatCondition = (alert: AlertItem) => {
    const above = alert.price_above
    const below = alert.price_below

    if (above != null && below != null) {
      return `Between $${below.toLocaleString()} - $${above.toLocaleString()}`
    }
    if (above != null) {
      return `Above $${above.toLocaleString()}`
    }
    if (below != null) {
      return `Below $${below.toLocaleString()}`
    }
    return "Custom trigger"
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Price Alerts</h1>
          <p className="text-neutral-400">Manage and monitor your existing price triggers.</p>
        </div>
        <Button variant="default" onClick={() => window.location.href = '/alerts/create'}>
          New Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <Card className="p-6 text-neutral-400">Loading alerts...</Card>
        ) : alerts.length === 0 ? (
          <Card className="p-6 text-neutral-400">No alerts found.</Card>
        ) : alerts.map((alert) => (
          <Card key={alert.id} className="hover:border-neutral-700 transition-colors overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center font-bold text-lg text-white">
                  {alert.coin_symbol}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{alert.coin_symbol}/USD</h3>
                    <Badge variant={alert.paused ? "default" : "success"} className="uppercase text-[10px]">
                      {alert.paused ? "paused" : "active"}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-400">{formatCondition(alert)}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Channels</div>
                  <div className="flex items-center gap-2">
                    {alert.alert_medium === "TELEGRAM" ? (
                      <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400"><Navigation size={14} /></div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400"><Mail size={14} /></div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-l border-neutral-800 pl-6 ml-2 sm:ml-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    title={alert.paused ? "Resume" : "Pause"}
                    onClick={() => handleTogglePause(alert.id, alert.paused)}
                    disabled={togglingAlertId === alert.id}
                  >
                    {alert.paused ? <Play size={16} /> : <Pause size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.location.href = `/alerts/create?alertId=${alert.id}`
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-rose-500 hover:text-white hover:bg-rose-500/10"
                    onClick={() => {
                      setDeleteAlertId(alert.id)
                      setIsDeleteModalOpen(true)
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Alert"
      >
        <div className="space-y-4">
          <p className="text-neutral-400 text-sm">
            Are you sure you want to delete this alert? This action cannot be undone and you will stop receiving notifications for this price trigger.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Alert</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
