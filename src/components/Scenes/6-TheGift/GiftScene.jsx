import React, { useState } from 'react';
import confetti from 'canvas-confetti';

import bitmojiExcited from '../../../assets/bitmoji-excited.png';
import bitmojiLove from '../../../assets/bitmoji-love.png';

import './Gift.css';

export default function GiftScene({ onOpenKeepsakes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [speechText, setSpeechText] = useState("Phew, found it! I got something for you! 🎁 Tap the box!");

  const handleGiftClick = () => {
    if (isOpen) return;

    setIsOpen(true);
    setSpeechText("TA-DA! 🥳 Look at what was inside! Tap any item!");

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="cozy-gift-room">
      <div className="fairy-lights-garland">
        <div className="light-bulb"></div>
        <div className="light-bulb"></div>
        <div className="light-bulb"></div>
        <div className="light-bulb"></div>
        <div className="light-bulb"></div>
        <div className="light-bulb"></div>
        <div className="light-bulb"></div>
      </div>

      <div className="ambient-sparkle sparkle-1"></div>
      <div className="ambient-sparkle sparkle-2"></div>
      <div className="ambient-sparkle sparkle-3"></div>
      <div className="ambient-sparkle sparkle-4"></div>

      <div className="cinematic-header">
        <h1 className="main-title">
          {isOpen ? "Your Keepsakes Unlocked! ✨" : "A Special Present 🎁"}
        </h1>
        <p className="sub-title">
          {isOpen ? "Choose a keepsake to view!" : "Tap the present to open"}
        </p>
      </div>

      <div className="gift-stage">
        {!isOpen ? (
          <div className="gift-box-container" onClick={handleGiftClick}>
            <div className="gift-lid">
              <div className="gift-bow"></div>
            </div>
            <div className="gift-body">
              <div className="gift-ribbon-vertical"></div>
              <div className="gift-ribbon-horizontal"></div>
            </div>
          </div>
        ) : (
          <div className="keepsakes-revealed-row">
            <div 
              className="keepsake-card pop-in-1" 
              onClick={() => onOpenKeepsakes && onOpenKeepsakes('polaroid')}
            >
              <div className="card-icon">📸</div>
              <div className="card-label">The Snapshot</div>
            </div>

            <div 
              className="keepsake-card pop-in-2" 
              onClick={() => onOpenKeepsakes && onOpenKeepsakes('letter')}
            >
              <div className="card-icon">💌</div>
              <div className="card-label">Birthday Letter</div>
            </div>
          </div>
        )}
      </div>

      <div className="bitmoji-host-anchor">
        <div className="host-speech-bubble" key={speechText}>
          <p>{speechText}</p>
        </div>
        <img 
          src={isOpen ? bitmojiLove : bitmojiExcited} 
          alt="Bitmoji Host" 
          className="host-bitmoji-img" 
        />
      </div>
    </div>
  );
}