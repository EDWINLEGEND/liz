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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const particlesInit = async (engine: any) => {
    // Using loadFull without checkVersion for tsparticles v3 compatibility
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
    
    gsap.from('.countdown-container', { 
      opacity: 0, 
      y: 30, 
      duration: 1.5, 
      delay: 0.5, 
      ease: 'power3.out' 
    });
    
    gsap.from('.age-clock', { 
      opacity: 0, 
      scale: 0.8, 
      duration: 1.5, 
      delay: 1, 
      ease: 'elastic.out(1, 0.5)' 
    });

    // Calculate time left
    const calculateTimeLeft = () => {
      const difference = +birthdayDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

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
        <h1 className="hero-title">Magical Birthday Countdown</h1>
        
        <div className="countdown-container">
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
        
        <div className="age-clock">
          <div className="age-display">
            <span className="age-value">{age}</span>
            <span className="age-label">Magical Years</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;