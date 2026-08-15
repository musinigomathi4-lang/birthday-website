import React, { useState } from 'react';
import bitmojiShocked from '../../../assets/bitmoji-shocked.png';
import bitmojiDramatic from '../../../assets/bitmoji-dramatic.png';
import bitmojiHappy from '../../../assets/bitmoji-happy.png';
import './CakeIntro.css';

export default function CakeIntroScene({ onNext }) {
  const [hasClickedNo, setHasClickedNo] = useState(false);
  const [currentBitmoji, setCurrentBitmoji] = useState(bitmojiShocked);
  const [dialogue, setDialogue] = useState("Oh no! I forgot to decor your cake! 😱 Wanna help me?");

  const handleNoClick = () => {
    setHasClickedNo(true);
    setCurrentBitmoji(bitmojiDramatic);
    setDialogue("Wait, really?! You can't leave me with a naked cake! 😭 Please?");
  };

  const handleYesClick = () => {
    setCurrentBitmoji(bitmojiHappy);
    setDialogue("Phew! Thank you so much! Let's go! 🎉");

    setTimeout(() => {
      if (onNext) onNext();
    }, 1200);
  };

  return (
    <div className="cake-intro-scene-container">
      {/* LEFT SIDE: Properly Oriented Cake */}
      <div className="cake-left-section">
        <div className="plain-cake-base">
          <div className="plain-layer layer-top"></div>
          <div className="plain-layer layer-bottom"></div>
        </div>
        <div className="cake-stand"></div>
      </div>

      {/* RIGHT SIDE: Bitmoji + Speech + Buttons Below */}
      <div className="host-right-section">
        <div className="speech-bubble-intro">
          <p>{dialogue}</p>
        </div>

        <img
          src={currentBitmoji}
          alt="Bitmoji Host"
          className={`bitmoji-intro-img ${hasClickedNo ? 'dramatic-bounce' : ''}`}
        />

        {/* Action Buttons Directly Below Bitmoji & Speech */}
        <div className="action-button-group">
          <button className="intro-btn yes-btn" onClick={handleYesClick}>
            YES! 💖
          </button>

          {!hasClickedNo ? (
            <button className="intro-btn no-btn" onClick={handleNoClick}>
              NO 😜
            </button>
          ) : (
            <button className="intro-btn yes-btn morph-btn" onClick={handleYesClick}>
              Okay, fine! YES! 💕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}