'use client'

import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, GlobeIcon, HeartIcon, CoffeeIcon } from 'lucide-react'

export function Footer() {
  return (
    <div className="w-full border-t mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            <p>Developed by <a href="https://sai-sribhashyam.netlify.app" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">Venkata Anantha Sai Sribhashyam</a></p>
            <p>Version 1.0.0 | © 2024 All Rights Reserved</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors"
              onClick={() => window.open('https://github.com/saiSribhashyam', '_blank')}
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors"
              onClick={() => window.open('https://www.linkedin.com/in/venkata-anantha-sai-sribhashyam-a96121226/', '_blank')}
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors"
              onClick={() => window.open('https://sai-sribhashyam.netlify.app', '_blank')}
              aria-label="Portfolio Website"
            >
              <GlobeIcon className="h-5 w-5" />
            </Button>
            <div className="h-4 w-px bg-border mx-2" />
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary transition-colors space-x-2"
              onClick={() => window.open('https://buymeacoffee.com/saisribhashyam', '_blank')}
            >
              <CoffeeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Buy me a coffee</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-red-500 transition-colors space-x-2"
              onClick={() => window.open('https://github.com/saiSribhashyam/YTChat', '_blank')}
            >
              <HeartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Support Project</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}