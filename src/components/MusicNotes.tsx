
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <NoteShape className="absolute text-music-purple/10 top-[15%] left-[10%] animate-float" />
      <NoteShape className="absolute text-music-purple/10 top-[40%] left-[85%] animate-float" style={{ animationDelay: '1s' }} />
      <NoteShape className="absolute text-music-purple/10 top-[75%] left-[20%] animate-float" style={{ animationDelay: '2s' }} />
      <NoteShape className="absolute text-music-purple/10 top-[30%] left-[70%] animate-float" style={{ animationDelay: '3s' }} />
      <NoteShape className="absolute text-music-purple/10 top-[65%] left-[65%] animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default MusicNotes;
