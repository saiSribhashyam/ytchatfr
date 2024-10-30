'use client'

import { useState, useEffect } from 'react'
import { ChatInterfaceComponent } from "@/components/chat-interface"
import { ThemeProvider } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOffIcon } from 'lucide-react'

function NoInternetPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center">
            <WifiOffIcon className="mr-2 h-6 w-6" />
            No Internet Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Please check your internet connection and try again.
          </p>
          <Button 
            className="w-full" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Home() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial state
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <ThemeProvider attribute="class">
      {isOnline ? <ChatInterfaceComponent /> : <NoInternetPage />}
    </ThemeProvider>
  )
}