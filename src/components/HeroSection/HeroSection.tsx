import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './HeroSection.css';

interface HeroSectionProps {
  birthdayDate: Date;
  age: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ birthdayDate, age }) => {
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    return calculatedAge;
  };

  const [currentAge, setCurrentAge] = useState(calculateAge(birthdayDate));

  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  useEffect(() => {
    // Animate elements when component mounts
    gsap.from('.hero-title', { 
      opacity: 0, 
      y: 50, 
      duration: 1.5, 
      ease: 'power3.out' 
    });
    
    gsap.from('.age-clock', { 
      opacity: 0, 
      scale: 0.8, 
      duration: 1.5, 
      delay: 0.5, 
      ease: 'elastic.out(1, 0.5)' 
    });

    // Update age if needed
    const checkAgeUpdate = () => {
      const newAge = calculateAge(birthdayDate);
      if (newAge !== currentAge) {
        setCurrentAge(newAge);
      }
    };
    
    const timer = setInterval(checkAgeUpdate, 1000 * 60 * 60 * 24); // Check daily
    return () => clearInterval(timer);
  }, [birthdayDate, currentAge]);

  return (
    <div className="hero-section">
      <div className="parallax-bg"></div>
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: '#D4AF37',
            },
            links: {
              color: '#D4AF37',
              distance: 150,
              enable: false,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: true,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.5,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      <div className="hero-content">
        <h1 className="hero-title">Happy Birthday Lisa!</h1>
        
        <div className="age-clock">
          <div className="age-display">
            <span className="age-value">{currentAge}</span>
            <span className="age-label">Magical Years</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;