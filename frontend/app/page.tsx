import { Button } from "@/components/ui/button"
import { Layout } from "@/components/ui/layout"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import Link from "next/link"
import { TrendingUp, Bell, Zap, Shield, Globe, Smartphone } from "lucide-react"
import { RainbowButton } from "@/components/magicui/rainbow-button"

export default function LandingPage() {
  return (
    <Layout.Root className="flex-col overflow-x-hidden">
      <header className="flex items-center justify-between px-8 py-6 border-b border-border z-50 bg-background/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-4 h-4 rounded-sm bg-primary-foreground rotate-45" />
          </div>
          Alert.Fi
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth">
            <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
          </Link>
          <Link href="/auth">
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      </header>

      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
        <BackgroundRippleEffect cellSize={70} rows={14} cols={32} />
        <div className="absolute inset-0 bg-radial-from-center from-transparent via-background/40 to-background z-10 pointer-events-none" />

        <div className="container relative z-20 max-w-5xl mx-auto px-6 text-center">
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-8 leading-[1.1] md:leading-[1.05]">
            Crypto Alerts, <br />
            <span className="bg-linear-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent italic">
              Done Right.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop checking charts. We'll ping you the second your target price hits. 
            Reliable, fast, and multi-channel notifications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/auth" className="w-full sm:w-auto">
            
              <Button size="xl" className="w-full sm:w-auto px-10 ">
              
                Start Monitoring Free
              
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="w-full sm:w-auto px-10">
              How it works
            </Button>
          </div>

          {/* Social Proof / Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2"><Globe className="size-5" /><span className="font-bold">Binance</span></div>
            <div className="flex items-center gap-2"><Shield className="size-5" /><span className="font-bold">Coinbase</span></div>
            <div className="flex items-center gap-2"><TrendingUp className="size-5" /><span className="font-bold">Kraken</span></div>
            <div className="flex items-center gap-2"><Zap className="size-5" /><span className="font-bold">Uniswap</span></div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-muted/30 border-y border-border relative z-20">
        <Layout.Content className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything you need to trade better</h2>
            <p className="text-muted-foreground text-lg">Powerful features for serious crypto traders and enthusiasts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Instant Delivery", 
                desc: "Get notified via Push, SMS, Email or Telegram the millisecond a price target is hit.",
                icon: <Zap className="" />
              },
              { 
                title: "Advanced Logic", 
                desc: "Set complex triggers: percentage changes, volume spikes, or SMA crossovers.",
                icon: <TrendingUp className="" />
              },
              { 
                title: "Reliable & Secure", 
                desc: "Redundant systems ensure you never miss an alert. Your data is always encrypted.",
                icon: <Shield className="" />
              }
            ].map((feature, i) => (
              <Card key={i} className="group p-10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-border/50 bg-background/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </Layout.Content>
      </section>

      {/* Pricing / CTA Section */}
      <section className="py-32 text-center px-6 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/2 opacity-20 -skew-y-6 transform origin-top-left" />
        <div className="max-w-3xl mx-auto relative cursor-default">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight italic">Ready to never miss <br /> another pump?</h2>
          <p className="text-xl text-muted-foreground mb-12 italic">Join over 10,000+ traders securing their portfolios with real-time alerts.</p>
          <Link href="/auth">
            <Button size="xl" className="px-12 h-16 text-xl rounded-2xl bg-foreground text-background hover:bg-foreground/90 scale-100 hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Get Started for Free
            </Button>
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">No credit card required. Up to 3 active alerts on the free plan.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-20 px-8 relative z-20 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-primary-foreground rotate-45" />
              </div>
              Alert.Fi
            </div>
            <p className="text-sm text-muted-foreground italic">Providing institutional-grade crypto monitoring for everyone.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Features</a></li>
              <li><a href="#" className="hover:text-foreground">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About Us</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Connect</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"><Globe size={18} /></div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"><Smartphone size={18} /></div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"><Bell size={18} /></div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Alert.Fi. Built with ❤️ for the crypto community.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground italic">System Status</a>
            <a href="#" className="hover:text-foreground italic">API Docs</a>
          </div>
        </div>
      </footer>
    </Layout.Root>
  )
}
