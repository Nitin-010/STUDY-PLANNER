import React from 'react';
import { MusicNoteIcon } from './icons/MusicNoteIcon';

const MusicPlayer: React.FC = () => {
  return (
    <div className="bg-neutral-900/60 rounded-xl shadow-lg p-6 sticky top-8 border border-neutral-800 text-center flex flex-col items-center justify-center min-h-[12rem]">
      {/* Visuals */}
      <MusicNoteIcon className="w-10 h-10 text-teal-400" />
      <h3 className="font-bold text-lg text-slate-200 mt-3">Focus Music</h3>
      <p className="text-xs text-slate-500 mt-1">Lofi beats stream is playing.</p>
      
      {/* Hidden Iframe for audio playback */}
      <iframe
          className="absolute w-0 h-0 opacity-0 pointer-events-none" // Hide it but let it play
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk&controls=0"
          title="YouTube video player"
          allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
};

export default MusicPlayer;