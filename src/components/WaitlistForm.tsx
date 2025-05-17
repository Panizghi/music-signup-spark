import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import dotenv from 'dotenv';
// This function would be replaced with actual database connection
import { MongoClient, ServerApiVersion } from 'mongodb';

const username = process.env.DB_USER
const password = process.env.DB_KEY

if (!username || !password) {
  throw new Error('Missing DB_USER or DB_KEY environment variables')
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const saveEmailToStorage = (email: string): void => {
  const existing = localStorage.getItem('catenaWaitlistEmails')
  const emails = existing ? JSON.parse(existing) : []
  if (!emails.includes(email)) {
    emails.push(email)
    localStorage.setItem('catenaWaitlistEmails', JSON.stringify(emails))
  }
}

// build your connection string
const uri = `mongodb+srv://${username}:${password}@cluster0.ewizuey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// configure a single client instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

/**
 * Saves an email address into the "subscribers" collection.
 */
export const saveEmailToDatabase = async (email: string): Promise<void> => {
  try {
    await client.connect()
    const db = client.db('email_waitlist')
    const subscribers = db.collection('emails')
    const result = await subscribers.insertOne({
      email,
      subscribedAt: new Date(),
    })
    console.log(`✔️  Saved email ${email} with _id: ${result.insertedId}`)
  } catch (err) {
    console.error('❌  Failed to save email:', err)
    throw err
  } finally {
    await client.close()
  }
}



const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This will be replaced with real database connection
      await saveEmailToDatabase(email);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Success!",
        description: "You've been added to Catena's waitlist. Stay tuned!",
      });
      
      console.log("Waitlist emails:", JSON.parse(localStorage.getItem('catenaWaitlistEmails') || '[]'));
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: "Failed to add you to the waitlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 p-6">
        <div className="relative mx-auto">
          <div className="animate-pulse-slow text-music-purple">
            <Mail className="h-12 w-12 mx-auto" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full animate-wave bg-music-purple opacity-20"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">You're on the list!</h3>
        <p className="text-gray-600">
          We'll let you know when Catena is ready to launch. Get ready for an amazing experience!
        </p>
      </div>
    );
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
  );
};

export default WaitlistForm;
