import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

const AudioPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
  }, []);
  
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
        src="/audio/harry_potter_theme.mp3"
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