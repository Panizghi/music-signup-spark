
import React from 'react';
import { cn } from '@/lib/utils';

const NoteShape: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg 
    className={cn("h-8 w-8", className)}
    viewBox="0 0 24 24" 
    fill="currentColor"
    style={style}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const MusicNotes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <NoteShape className="absolute text-music-purple/20 top-[15%] left-[10%] animate-float" style={{ transform: 'rotate(5deg)' }} />
      <NoteShape className="absolute text-music-light-purple/20 top-[40%] left-[85%] animate-float" style={{ animationDelay: '1s', transform: 'rotate(-10deg)' }} />
      <NoteShape className="absolute text-music-soft-blue/30 top-[75%] left-[20%] animate-float" style={{ animationDelay: '2s', transform: 'rotate(15deg)' }} />
      <NoteShape className="absolute text-music-purple/25 top-[30%] left-[70%] animate-float" style={{ animationDelay: '3s', transform: 'scale(1.2) rotate(-5deg)' }} />
      <NoteShape className="absolute text-music-light-purple/20 top-[65%] left-[65%] animate-float" style={{ animationDelay: '1.5s', transform: 'scale(0.8) rotate(8deg)' }} />
      <NoteShape className="absolute text-white/10 top-[10%] left-[40%] animate-float" style={{ animationDelay: '2.5s', transform: 'scale(1.1) rotate(-12deg)' }} />
      <NoteShape className="absolute text-music-soft-blue/20 top-[50%] left-[15%] animate-float" style={{ animationDelay: '3.5s', transform: 'scale(0.9) rotate(20deg)' }} />
    </div>
  );
};

export default MusicNotes;
