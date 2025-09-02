import React, { useState } from 'react';
import { gsap } from 'gsap';
import './Footer.css';

interface FooterProps {
  signatures: string[];
}

const Footer: React.FC<FooterProps> = ({ signatures }) => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const revealEasterEgg = () => {
    setShowEasterEgg(true);
    
    // Animate the easter egg message
    gsap.fromTo('.easter-egg-message', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    
    // Create sparkle effect
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'footer-sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDuration = `${0.5 + Math.random() * 1}s`;
      document.querySelector('.footer')?.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 2000);
    }
    
    // Hide the easter egg message after a delay
    setTimeout(() => {
      gsap.to('.easter-egg-message', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => setShowEasterEgg(false)
      });
    }, 5000);
  };
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="signatures">
          {signatures.map((signature, index) => (
            <div key={index} className="signature">{signature}</div>
          ))}
        </div>
        
        <div className="hidden-button-container">
          <button 
            className="hidden-button"
            onClick={revealEasterEgg}
            aria-label="Hidden Easter Egg"
          >
            <span className="hidden-icon">✨</span>
          </button>
        </div>
        
        {showEasterEgg && (
          <div className="easter-egg-message">
            "Mischief Managed! Happy Birthday from all your friends who love you!"
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;