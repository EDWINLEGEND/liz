import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SecretLetters.css';

interface Letter {
  id: number;
  from: string;
  message: string;
  isHidden?: boolean;
}

interface SecretLettersProps {
  letters: Letter[];
}

const SecretLetters: React.FC<SecretLettersProps> = ({ letters }) => {
  const [visibleLetters, setVisibleLetters] = useState<Letter[]>([]);
  const [showSection, setShowSection] = useState(false);
  const [foundHidden, setFoundHidden] = useState(false);
  
  useEffect(() => {
    // Filter out hidden letters initially
    setVisibleLetters(letters.filter(letter => !letter.isHidden));
  }, [letters]);
  
  const handleRevealClick = () => {
    setShowSection(true);
    
    // Animate the section
    gsap.from('.secret-letters-container', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  };
  
  const findHiddenLetter = () => {
    if (!foundHidden) {
      // Add the hidden letter to visible letters
      const hiddenLetter = letters.find(letter => letter.isHidden);
      if (hiddenLetter) {
        setVisibleLetters(prev => [...prev, hiddenLetter]);
        setFoundHidden(true);
        
        // Show success message
        const message = document.createElement('div');
        message.className = 'hidden-letter-found';
        message.textContent = 'You found a hidden letter!';
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
        }, 3000);
      }
    }
  };
  
  return (
    <div className="secret-letters-section">
      {!showSection ? (
        <div className="reveal-container">
          <button className="reveal-button" onClick={handleRevealClick}>
            Reveal Secret Messages
          </button>
        </div>
      ) : (
        <div className="secret-letters-container">
          <h2 className="secret-letters-title">Secret Messages</h2>
          
          <div className="letters-container">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Navigation, Pagination]}
              className="letters-swiper"
              navigation={true}
              pagination={{ clickable: true }}
            >
              {visibleLetters.map((letter) => (
                <SwiperSlide key={letter.id}>
                  <div className="letter-card">
                    <div className="letter-content">
                      <div className="letter-message">{letter.message}</div>
                      <div className="letter-from">— {letter.from}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <div className="hidden-letter-hint">
            <span onClick={findHiddenLetter}>Looking for more?</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretLetters;