import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

const AudioPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isMuted) {
        // Unmute and play on first user interaction
        setIsMuted(false);
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
      // Remove the event listener after first interaction
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    // Add event listener for first interaction
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [isMuted]);
  
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src="https://soundcloud.com/harrypotter-music/harry-potter-theme-song"
        loop
        muted={isMuted}
      />
      <button 
        className={`audio-control ${isMuted ? 'muted' : 'playing'}`}
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <span className="audio-icon">🔇</span>
        ) : (
          <span className="audio-icon">🔊</span>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;