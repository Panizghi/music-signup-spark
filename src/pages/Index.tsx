
import React from 'react';
import WaitlistForm from '@/components/WaitlistForm';
import MusicNotes from '@/components/MusicNotes';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-music-pattern text-white p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <AnimatedBackground />
      <MusicNotes />
      
      <div className="max-w-xl w-full mx-auto relative z-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-music-light-purple via-music-purple to-music-soft-blue">
            Catena
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 font-light">
            Connecting experiences like never before
          </p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-white">
              Join our exclusive waitlist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-200 text-center mb-4">
              Be the first to experience Catena's revolutionary platform. 
              Early access members receive exclusive benefits!
            </p>
            <WaitlistForm />
          </CardContent>
        </Card>
        
        <div className="mt-12 text-center space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Feature icon="🔗" title="Connected" description="Seamlessly integrated experiences" />
            <Feature icon="🌍" title="Global" description="Access anywhere, anytime" />
            <Feature icon="🚀" title="Innovative" description="Cutting-edge technology" />
          </div>
          
          <p className="text-sm text-gray-400 mt-16">
            © 2025 Catena. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

const Feature: React.FC<{icon: string; title: string; description: string}> = ({ 
  icon, 
  title, 
  description 
}) => (
  <div className="flex flex-col items-center p-4 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="font-medium text-lg">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export default Index;
