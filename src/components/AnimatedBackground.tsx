
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-music-dark-purple to-gray-900 animate-pulse-slow" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-music-purple/5 animate-wave" style={{ animationDelay: '0s' }} />
      <div className="absolute top-3/4 left-2/3 h-96 w-96 rounded-full bg-music-light-purple/5 animate-wave" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/3 h-48 w-48 rounded-full bg-music-soft-blue/5 animate-wave" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-music-purple/5 animate-wave" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/4 right-1/3 h-56 w-56 rounded-full bg-music-light-purple/5 animate-wave" style={{ animationDelay: '2s' }} />
      
      {/* Light particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full opacity-25"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
