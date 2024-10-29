'use client'


import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"

import { LucideSlashSquare, XIcon, GithubIcon, LinkedinIcon, GlobeIcon, MailIcon } from 'lucide-react'

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={componentRef} >
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-l w-12 h-12  shadow-lg  hover:bg-primary/90 text-primary-foreground"
          style={{ transform: 'translate(5px, -60px)' }} // Adjust the position here
          
        >
          <LucideSlashSquare className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-background border-2 border-primary rounded-lg shadow-lg p-4 w-80 animate-in slide-in-from-bottom-5 font-mono ">
          <div className="flex justify-between items-center mb-4 border-b border-primary pb-2">
            <h3 className="font-bold text-primary"> {"<"} Contact Me {"/>"}</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2 mb-4">
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://github.com/saiSribhashyam', '_blank')}>
              <GithubIcon className="mr-2 h-4 w-4" /> Visit My GitHub
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.linkedin.com/in/venkata-anantha-sai-sribhashyam-a96121226/', '_blank')}>
              <LinkedinIcon className="mr-2 h-4 w-4" /> Connect on LinkedIn
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://sai-sribhashyam.netlify.app', '_blank')}>
              <GlobeIcon className="mr-2 h-4 w-4" /> Visit My Portfolio
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = 'mailto:sai.sribhashyam20@email.com?subject=Bug Report @ YT Chat'}>
              <MailIcon className="mr-2 h-4 w-4" /> Found bugs? Mail me
            </Button>
          </div>
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="font-mono"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="font-mono"
            />
            <Textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="min-h-[100px] font-mono"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <SendIcon className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </form> */}
        </div>
      )}
    </div>
  )
}