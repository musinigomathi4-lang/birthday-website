import React, { useState, useEffect } from 'react';
import bitmojiImg from '../../../assets/Curtainpull.png';
import './Curtain.css';

export default function CurtainScene({ onFinish }) {
  const [showBitmoji, setShowBitmoji] = useState(false);
  const [isPullingThread, setIsPullingThread] = useState(false);
  const [isWipingUp, setIsWipingUp] = useState(false);

  useEffect(() => {
    // Step 1: Bitmoji slides in from right
    setShowBitmoji(true);

    // Step 2: Bitmoji pulls curtain thread cord
    const pullTimer = setTimeout(() => {
      setIsPullingThread(true);
    }, 1000);

    // Step 3: Screen slides UP
    const wipeTimer = setTimeout(() => {
      setIsWipingUp(true);
    }, 1600);

    // Step 4: Complete transition to Scene 3
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2400);

    return () => {
      clearTimeout(pullTimer);
      clearTimeout(wipeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`scene-container curtain-scene ${isWipingUp ? 'wipe-up' : ''}`}>
      {/* Curtain Pull Cord */}
      <div className={`curtain-thread ${isPullingThread ? 'pulled' : ''}`}>
        <div className="thread-line"></div>
        <div className="thread-handle"></div>
      </div>

      {/* Bitmoji Character */}
      <div className={`bitmoji-curtain-host ${showBitmoji ? 'enter-right' : ''}`}>
        <div className="speech-bubble-wish">Happy Birthday! 🎉</div>
        <img src={bitmojiImg} alt="Bitmoji Host" className="bitmoji-character-img" />
      </div>
    </div>
  );
}