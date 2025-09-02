import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './EasterEggs.css';

interface EasterEggsProps {}

const EasterEggs: React.FC<EasterEggsProps> = () => {
  const owlRef = useRef<HTMLDivElement>(null);
  const wandRef = useRef<HTMLDivElement>(null);
  const potionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate the easter egg elements
    if (owlRef.current) {
      gsap.to(owlRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
    
    if (wandRef.current) {
      gsap.to(wandRef.current, {
        rotation: 5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
    
    if (potionRef.current) {
      gsap.to(potionRef.current, {
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, []);
  
  const handleOwlClick = () => {
    if (owlRef.current) {
      // Play owl sound
      const audio = new Audio('/sounds/owl.mp3');
      audio.play();
      
      // Show message
      const message = document.createElement('div');
      message.className = 'easter-egg-message';
      message.textContent = 'Hedwig says hello!';
      document.body.appendChild(message);
      
      gsap.fromTo(message, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      
      setTimeout(() => {
        gsap.to(message, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => message.remove()
        });
      }, 2000);
    }
  };
  
  const handleWandClick = () => {
    if (wandRef.current) {
      // Play spell sound
      const audio = new Audio('/sounds/spell.mp3');
      audio.play();
      
      // Create sparkle effect
      for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDuration = `${0.5 + Math.random() * 1}s`;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
      }
    }
  };
  
  const handlePotionClick = () => {
    if (potionRef.current) {
      // Play potion sound
      const audio = new Audio('/sounds/potion.mp3');
      audio.play();
      
      // Change background color temporarily
      const originalColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = '#1A472A';
      
      setTimeout(() => {
        document.body.style.backgroundColor = originalColor;
      }, 1000);
    }
  };
  
  return (
    <div className="easter-eggs-container">
      <div 
        ref={owlRef} 
        className="easter-egg owl"
        onClick={handleOwlClick}
      >
        🦉
      </div>
      
      <div 
        ref={wandRef} 
        className="easter-egg wand"
        onClick={handleWandClick}
      >
        ⚡
      </div>
      
      <div 
        ref={potionRef} 
        className="easter-egg potion"
        onClick={handlePotionClick}
      >
        🧪
      </div>
    </div>
  );
};

export default EasterEggs;