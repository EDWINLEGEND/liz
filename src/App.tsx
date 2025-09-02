import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import CodeInput from './components/CodeInput/CodeInput';
import HeroSection from './components/HeroSection/HeroSection';
import HappyBirthday from './components/HappyBirthday/HappyBirthday';
import Slideshow from './components/Slideshow/Slideshow';
import EasterEggs from './components/EasterEggs/EasterEggs';
import SecretLetters from './components/SecretLetters/SecretLetters';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Footer from './components/Footer/Footer';

// Sample data - replace with actual data
const CORRECT_CODE = 'alohomora'; // Secret code to unlock the site
const FRIEND_NAME = 'Lisa'; // Person's name
const BIRTHDAY_DATE = new Date('2004-09-02'); // Lisa's birthdate

// Sample memories - replace with actual images and captions
const memories = [
  { id: 1, image: '/images/slideshow/1.jpg', caption: 'Cutie Patootie' },
  { id: 2, image: '/images/slideshow/6.jpg', caption: 'Not twins'},
  { id: 3, image: '/images/slideshow/2.jpg', caption: 'Chigmas' },
  { id: 4, image: '/images/slideshow/4.gif', caption: 'Fashion Super Star' },
  { id: 5, image: '/images/slideshow/5.jpg', caption: 'Always very Hungy' },
  { id: 5, image: '/images/slideshow/3.jpg', caption: 'Talented asf' },
  { id: 5, image: '/images/slideshow/7.jpg', caption: '7' },
  { id: 5, image: '/images/slideshow/8.jpg', caption: 'Presented to you by' },
];

// Sample letters - replace with actual messages
const letters = [
  { id: 1, from: 'Ant', message: "Happy birthday lisa . I remember that we met unexpectedly at a canteen dinner through other people and now you are one of the most valuable people in my college life . I guess that's how it is , most unexpected people turn out to be close ones in a point of your life , that's how you are for me and I would love and hope to keep it that way always even though I know we aren't that close but hope to be. Once again happy birthday. PS : this is my first time writing a birthday letter so adjust" },
  { id: 2, from: 'San', message: "Lisa, Since it's your birthday, this would be the perfect time to tell  u how special you r to me.. you r the only person I fight with the most, but thts also because I am really comfortable with you..  You listen to all of my silly things all the time even though I would've already told that 3 times.  Overtime u became someone I wanna keep forever. Alsoooooo, U R SOO PRETTYYY BITCH (go argue with the wall) Happy birthday to my dear Lisa!" },
  { id: 3, from: 'Uthu', message: "happy birthday to my pretty girl. ur so crazy and fun, I love living life with u though  u throw me into this existential spiral at times(much-needed). when I met u, it felt like we were meant to be, like finding a missing puzzle piece. i just knew youd be my best friend. and im so glad u exist. just know that no matter how old u get, ull always be my pet creature, ill always be there for u. also hoping we execute crazier plans this year. proudly, ur owner" },
  { id: 4, from: 'Gau', message: "Happieeeeee Booooooorthadayy to you Leeeeeeesaaaaaah! WHEEEEEEEEEEEE" },
  { id: 6, from: 'Air', message: "Happy Birthday lisa my partner in weirdness. You make my life 100 times more fun when ur around .I really hope u stay this chaotic ,weird ,creature like ,nd just YOU. Cuz normal is boring . Really happy to hv a frnd like you who laughs at the most dumbest things with me nd make me feel involved in madness."  },
  { id: 5, from: 'Ed', message: "Yo,IDK what to say but happy bday",isHidden: true },
];

// Sample signatures for footer
const signatures = [
  'With love, Ron',
  'Always yours, Hermione',
  'Cheers, Hagrid',
  'Best wishes, McGonagall',
  'Your friend, Luna',
];

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Preparing your magical experience...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <AudioPlayer />
      
      {!isUnlocked ? (
        <CodeInput correctCode={CORRECT_CODE} onUnlock={handleUnlock} />
      ) : (
        <>
          <HeroSection birthdayDate={BIRTHDAY_DATE} age={0} />
          
          <HappyBirthday name={FRIEND_NAME} />
          
          <Slideshow memories={memories} />
          
          <SecretLetters letters={letters} />
          
          <Footer signatures={signatures} />
          
          <EasterEggs />
        </>
      )}
    </div>
  )
}

export default App;
