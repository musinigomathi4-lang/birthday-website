import React, { useState, useEffect } from 'react';
import ComplimentBubble from './ComplimentBubble';
import bitmojiPull from '../../../assets/Curtainpull.png'; // Bitmoji pulling thread
import './Countdown.css';

const BUBBLE_DATA = [
  { id: 1, animClass: "stream-1", delay: "0s", left: "6%", text: "You bring so much joy into everyone's life! ✨", photo: "/character.png" },
  { id: 2, animClass: "stream-2", delay: "2.5s", left: "16%", text: "Always glowing and spreading happiness! 💖", photo: "/character.png" },
  { id: 3, animClass: "stream-3", delay: "1.2s", left: "26%", text: "Your smile brightens up the whole room 🌸", photo: "/character.png" },
  { id: 4, animClass: "stream-4", delay: "3.8s", left: "36%", text: "Never stop being your wonderful self! 🎉", photo: "/character.png" },
  { id: 5, animClass: "stream-1", delay: "0.8s", left: "46%", text: "An absolute light in this world! ⭐", photo: "/character.png" },
  { id: 6, animClass: "stream-2", delay: "2.0s", left: "56%", text: "Love you soo muchhh💕", photo: "/character.png" },
  { id: 7, animClass: "stream-3", delay: "4.2s", left: "66%", text: "Enjoy ur dayyy🥳", photo: "/character.png" },
  { id: 8, animClass: "stream-4", delay: "1.7s", left: "76%", text: "Your positivity is super infectious! 🌈", photo: "/character.png" },
  { id: 9, animClass: "stream-1", delay: "3.1s", left: "84%", text: "So lucky to celebrate you today! 🎁", photo: "/character.png" },
  { id: 10, animClass: "stream-2", delay: "0.4s", left: "92%", text: "Keep growing!!", photo: "/character.png" },
];

export default function CountdownScene({ onComplete }) {
  const [poppedIds, setPoppedIds] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 5 });
  
  // Animation Sequence States
  const [showBitmoji, setShowBitmoji] = useState(false);
  const [isPullingThread, setIsPullingThread] = useState(false);
  const [isWipingUp, setIsWipingUp] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };

        clearInterval(timer);
        triggerCurtainSequence();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerCurtainSequence = () => {
    // Step 1: Bitmoji slides out from right
    setShowBitmoji(true);

    // Step 2: Bitmoji pulls curtain thread cord
    setTimeout(() => {
      setIsPullingThread(true);
    }, 1000);

    // Step 3: Screen wipes UP
    setTimeout(() => {
      setIsWipingUp(true);
    }, 1700);

    // Step 4: Move to Cake Decorating Scene
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);
  };

  const handlePop = (id) => {
    if (!poppedIds.includes(id)) {
      setPoppedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className={`countdown-scene-container ${isWipingUp ? 'wipe-up' : ''}`}>
      {/* Floating Bubbles Layer */}
      <div className="bubble-stream-wrapper">
        {BUBBLE_DATA.map((bubble) => (
          <ComplimentBubble key={bubble.id} bubble={bubble} onPop={handlePop} />
        ))}
      </div>

      {/* Main Countdown Center Card */}
      <div className="countdown-card">
        <h1 className="main-title">Birthday Countdown 🎉</h1>
        <div className="timer-grid">
          <div className="time-unit">
            <span className="time-num">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-unit">
            <span className="time-num">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-unit">
            <span className="time-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">Mins</span>
          </div>
          <div className="time-unit">
            <span className="time-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">Secs</span>
          </div>
        </div>
      </div>

      {/* Curtain Pull Cord */}
      <div className={`curtain-thread ${isPullingThread ? 'pulled' : ''}`}>
        <div className="thread-line"></div>
        <div className="thread-handle"></div>
      </div>

      {/* Wish Bitmoji Host (Only slides in when timer reaches 0) */}
      <div className={`bitmoji-curtain-host ${showBitmoji ? 'enter-right' : ''}`}>
        <div className="speech-bubble-wish">Happy Birthday! 🎉</div>
        <img src={bitmojiPull} alt="Bitmoji Wishing" className="bitmoji-character-img" />
      </div>
    </div>
  );
}