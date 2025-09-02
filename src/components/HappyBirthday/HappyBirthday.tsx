import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typed from 'typed.js';
import './HappyBirthday.css';

interface HappyBirthdayProps {
  name: string;
}

const HappyBirthday: React.FC<HappyBirthdayProps> = ({ name }) => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // GSAP animation for the container
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power3.out'
    });
    
    // Typed.js animation for the text
    const typed = new Typed(typedRef.current, {
      strings: [
        `Happy Birthday, ${name}!`,
        `Wishing you a Magical Birthday, ${name}!`,
        `May your ${name}'s day be filled with magic!`
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '✨',
    });
    
    return () => {
      typed.destroy();
    };
  }, [name]);
  
  const handleTap = () => {
    // Add spark animation on tap/click
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        boxShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 50px rgba(212, 175, 55, 0.5)',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
    }
  };
  
  return (
    <div className="happy-birthday-section">
      <div 
        ref={containerRef} 
        className="happy-birthday-container"
        onClick={handleTap}
      >
        <h2 className="happy-birthday-text">
          <span ref={typedRef}></span>
        </h2>
      </div>
    </div>
  );
};

export default HappyBirthday;