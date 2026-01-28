"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Pause, 
  Play, 
  Trash2, 
  Mail, 
  MessageSquare, 
  Navigation,
  Pencil
} from "lucide-react"

import { Modal } from "@/components/ui/modal"

export default function MyAlertsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)

  const alerts = [
    { id: 1, coin: "BTC", condition: "Above $55,000", channels: ['mail', 'telegram'], status: 'active' },
    { id: 2, coin: "ETH", condition: "Below $2,800", channels: ['telegram'], status: 'paused' },
    { id: 3, coin: "SOL", condition: "+15% in 24h", channels: ['mail', 'sms'], status: 'active' },
    { id: 4, coin: "LINK", condition: "Above $22.00", channels: ['sms'], status: 'active' },
  ]

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
        {alerts.map((alert) => (
          <Card key={alert.id} className="hover:border-neutral-700 transition-colors overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center font-bold text-lg text-white">
                  {alert.coin}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{alert.coin}/USD</h3>
                    <Badge variant={alert.status === 'active' ? 'success' : 'default'} className="uppercase text-[10px]">
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-400">{alert.condition}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Channels</div>
                  <div className="flex items-center gap-2">
                    {alert.channels.includes('mail') && <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400"><Mail size={14} /></div>}
                    {alert.channels.includes('telegram') && <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400"><Navigation size={14} /></div>}
                    {alert.channels.includes('sms') && <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400"><MessageSquare size={14} /></div>}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-l border-neutral-800 pl-6 ml-2 sm:ml-0">
                  <Button variant="ghost" size="icon" title={alert.status === 'active' ? 'Pause' : 'Resume'}>
                    {alert.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-rose-500 hover:text-white hover:bg-rose-500/10"
                    onClick={() => setIsDeleteModalOpen(true)}
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
            <Button variant="destructive" onClick={() => setIsDeleteModalOpen(false)}>Delete Alert</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
