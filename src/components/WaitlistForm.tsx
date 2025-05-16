// src/components/WaitlistForm.tsx
import React, { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Mail } from 'lucide-react'

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const WaitlistForm: React.FC = () => {
  const [email, setEmail]     = useState('')
  const [isSubmitting, setIs] = useState(false)
  const [isSuccess, setOk]    = useState(false)
  const { toast }             = useToast()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      return toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
    }

    setIs(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Network response was not ok')
      setOk(true)
      toast({
        title: 'Success!',
        description: "You've been added to Catena's waitlist. Stay tuned!",
      })
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Failed to add you to the waitlist. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIs(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 p-6">
        <div className="relative mx-auto">
          <div className="animate-pulse-slow text-music-purple">
            <Mail className="h-12 w-12 mx-auto" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full animate-wave bg-music-purple opacity-20" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">You're on the list!</h3>
        <p className="text-gray-600">
          We'll let you know when Catena is ready to launch. Get ready for an amazing experience!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10 pr-4 py-6 bg-white/80 backdrop-blur-sm border-music-purple/30 focus:border-music-purple focus:ring-music-purple text-gray-800"
        />
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-music-purple hover:bg-music-purple/90 text-white font-medium py-6"
      >
        {isSubmitting ? "Adding you..." : "Join Catena Waitlist"}
      </Button>
    </form>
  )
}

export default WaitlistForm
