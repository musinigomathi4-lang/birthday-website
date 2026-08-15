import React, { useState } from 'react';

// Bitmoji Expressions
import bitmojiYum from '../../../assets/bitmoji-yum.png';
import bitmojiLove from '../../../assets/bitmoji-love.png';
import bitmojiSunglasses from '../../../assets/bitmoji-sunglasses.png';
import bitmojiExcited from '../../../assets/bitmoji-excited.png';

import './CakeDecor.css';

export default function CakeDecorScene({ onNext }) {
  // Base State Setup
  const [flavor, setFlavor] = useState('vanilla'); 
  const [frosting, setFrosting] = useState('none'); 
  const [dripType, setDripType] = useState('none');  
  const [hasStrawberries, setHasStrawberries] = useState(false); 
  const [hasCherries, setHasCherries] = useState(false);     
  const [hasSprinkles, setHasSprinkles] = useState(false);   
  const [hasCandles, setHasCandles] = useState(false);     

  // Dynamic Host Reactions
  const [currentBitmoji, setCurrentBitmoji] = useState(bitmojiYum);
  const [commentary, setCommentary] = useState("Let's decorate your cake! Pick a flavor to start 🍰");

  // Selection Handlers
  const handleFlavorChange = (newFlavor) => {
    setFlavor(newFlavor);
    if (newFlavor === 'chocolate') {
      setCommentary("Mmm, chocolate sponge! Classic choice 🍫");
      setCurrentBitmoji(bitmojiYum);
    } else if (newFlavor === 'vanilla') {
      setCommentary("Ooh, light fluffy vanilla! Yum! 🍦");
      setCurrentBitmoji(bitmojiLove);
    } else if (newFlavor === 'velvet') {
      setCommentary("Red Velvet?! Okay, fancy! ❤️");
      setCurrentBitmoji(bitmojiSunglasses);
    }
  };

  const handleFrostingChange = (newFrosting) => {
    setFrosting(newFrosting);
    if (newFrosting === 'strawberry') {
      setCommentary("Pretty pink strawberry frosting! 💕");
      setCurrentBitmoji(bitmojiLove);
    } else if (newFrosting === 'cream') {
      setCommentary("Whipped cream smooth frosting! 🤍");
      setCurrentBitmoji(bitmojiYum);
    } else if (newFrosting === 'matcha') {
      setCommentary("Matcha green tea vibe? Very cool! 🍵");
      setCurrentBitmoji(bitmojiSunglasses);
    }
  };

  const handleDripChange = (newDrip) => {
    setDripType(newDrip);
    if (newDrip === 'chocolate') {
      setCommentary("Double chocolate drip overload! 🤤");
      setCurrentBitmoji(bitmojiYum);
    } else if (newDrip === 'caramel') {
      setCommentary("Rich golden caramel drips! ✨");
      setCurrentBitmoji(bitmojiLove);
    } else if (newDrip === 'none') {
      setCommentary("Keeping it sleek without drips! 👍");
      setCurrentBitmoji(bitmojiSunglasses);
    }
  };

  // Topping Handlers
  const toggleStrawberries = () => {
    const nextState = !hasStrawberries;
    setHasStrawberries(nextState);
    if (nextState) {
      setCommentary("Strawberries make everything better! 🍓");
      setCurrentBitmoji(bitmojiLove);
    } else {
      setCommentary("Took off the strawberries! What next? 🤔");
      setCurrentBitmoji(bitmojiYum);
    }
  };

  const toggleCherries = () => {
    const nextState = !hasCherries;
    setHasCherries(nextState);
    if (nextState) {
      setCommentary("Cherry on top? Perfect! 🍒");
      setCurrentBitmoji(bitmojiYum);
    } else {
      setCommentary("No cherries? Got it! 👌");
      setCurrentBitmoji(bitmojiSunglasses);
    }
  };

  const toggleSprinkles = () => {
    const nextState = !hasSprinkles;
    setHasSprinkles(nextState);
    if (nextState) {
      setCommentary("Rainbow sprinkles! Woohoo! ✨");
      setCurrentBitmoji(bitmojiExcited);
    } else {
      setCommentary("Sprinkles removed! Keepin' it simple! ✨");
      setCurrentBitmoji(bitmojiYum);
    }
  };

  const toggleCandles = () => {
    const nextState = !hasCandles;
    setHasCandles(nextState);
    if (nextState) {
      setCommentary("Unlit candles added! Ready for the big moment! 🕯️");
      setCurrentBitmoji(bitmojiExcited);
    } else {
      setCommentary("Candles off for now! 🕯️");
      setCurrentBitmoji(bitmojiYum);
    }
  };

  // SUBMIT HANDLER: Pass cake config back up to App.jsx!
  const handleProceed = () => {
    const finalCakeConfig = {
      flavor,
      frosting,
      dripType,
      hasStrawberries,
      hasCherries,
      hasSprinkles,
      hasCandles
    };
    
    if (onNext) {
      onNext(finalCakeConfig);
    }
  };

  return (
    <div className="decor-scene-wrapper">
      <div className="bg-decor-orb orb-1"></div>
      <div className="bg-decor-orb orb-2"></div>

      {/* LEFT STAGE: Visual Cake Renderer */}
      <div className="decor-left-stage">
        <div className="cake-display-container">
          <div className={`cake-structure flavor-${flavor} frosting-${frosting}`}>
            
            {/* Unlit Candles */}
            {hasCandles && (
              <div className="cake-candles-row">
                <div className="custom-unlit-candle"><div className="candle-wick"></div></div>
                <div className="custom-unlit-candle"><div className="candle-wick"></div></div>
                <div className="custom-unlit-candle"><div className="candle-wick"></div></div>
              </div>
            )}

            {/* Fruits Layer */}
            <div className="cake-fruits-row">
              {hasStrawberries && <span className="fruit-pop">🍓</span>}
              {hasCherries && <span className="fruit-pop">🍒</span>}
              {hasStrawberries && <span className="fruit-pop">🍓</span>}
            </div>

            {/* Top Tier */}
            <div className="cake-tier tier-top">
              <div className="frosting-top-lip"></div>
              {hasSprinkles && (
                <div className="real-sprinkles-container">
                  <span className="sprinkle sp-pink" style={{ top: '25%', left: '15%', transform: 'rotate(15deg)' }}></span>
                  <span className="sprinkle sp-blue" style={{ top: '45%', left: '30%', transform: 'rotate(-40deg)' }}></span>
                  <span className="sprinkle sp-yellow" style={{ top: '20%', left: '50%', transform: 'rotate(70deg)' }}></span>
                  <span className="sprinkle sp-green" style={{ top: '60%', left: '65%', transform: 'rotate(-10deg)' }}></span>
                  <span className="sprinkle sp-purple" style={{ top: '30%', left: '80%', transform: 'rotate(45deg)' }}></span>
                  <span className="sprinkle sp-white" style={{ top: '65%', left: '20%', transform: 'rotate(-60deg)' }}></span>
                  <span className="sprinkle sp-pink" style={{ top: '50%', left: '48%', transform: 'rotate(25deg)' }}></span>
                </div>
              )}
              {dripType !== 'none' && (
                <div className={`drip-svg-wrap drip-${dripType}`}>
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="drip-svg">
                    <path d="M0,0 L100,0 L100,8 Q90,25 80,10 Q70,28 60,8 Q50,22 40,10 Q30,26 20,8 Q10,20 0,6 Z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom Tier */}
            <div className="cake-tier tier-bottom">
              <div className="frosting-top-lip"></div>
              {hasSprinkles && (
                <div className="real-sprinkles-container">
                  <span className="sprinkle sp-yellow" style={{ top: '20%', left: '10%', transform: 'rotate(-25deg)' }}></span>
                  <span className="sprinkle sp-purple" style={{ top: '40%', left: '25%', transform: 'rotate(50deg)' }}></span>
                  <span className="sprinkle sp-pink" style={{ top: '30%', left: '42%', transform: 'rotate(-15deg)' }}></span>
                  <span className="sprinkle sp-blue" style={{ top: '65%', left: '55%', transform: 'rotate(80deg)' }}></span>
                  <span className="sprinkle sp-green" style={{ top: '25%', left: '72%', transform: 'rotate(-35deg)' }}></span>
                  <span className="sprinkle sp-white" style={{ top: '55%', left: '85%', transform: 'rotate(20deg)' }}></span>
                  <span className="sprinkle sp-pink" style={{ top: '70%', left: '30%', transform: 'rotate(40deg)' }}></span>
                  <span className="sprinkle sp-yellow" style={{ top: '35%', left: '60%', transform: 'rotate(-60deg)' }}></span>
                </div>
              )}
              {dripType !== 'none' && (
                <div className={`drip-svg-wrap drip-${dripType}`}>
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="drip-svg">
                    <path d="M0,0 L100,0 L100,8 Q92,26 82,10 Q72,28 62,8 Q52,24 42,10 Q32,28 22,8 Q12,22 0,6 Z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Cake Stand */}
            <div className="cake-stand-top"></div>
            <div className="cake-stand-stem"></div>
            <div className="cake-stand-base"></div>
          </div>
        </div>
      </div>

      {/* RIGHT STAGE: Controls */}
      <div className="decor-right-stage">
        <div className="controls-card-full">
          <h2 className="controls-title">Customize Cake 🍰</h2>

          {/* SECTION 1: BASE FLAVOR */}
          <div className="decor-section">
            <span className="section-label">BASE FLAVOR</span>
            <div className="options-row">
              <button
                className={`btn-choice ${flavor === 'chocolate' ? 'selected' : ''}`}
                onClick={() => handleFlavorChange('chocolate')}
              >
                🍫 Choco
              </button>
              <button
                className={`btn-choice ${flavor === 'vanilla' ? 'selected' : ''}`}
                onClick={() => handleFlavorChange('vanilla')}
              >
                🍦 Vanilla
              </button>
              <button
                className={`btn-choice ${flavor === 'velvet' ? 'selected' : ''}`}
                onClick={() => handleFlavorChange('velvet')}
              >
                ❤️ Velvet
              </button>
            </div>
          </div>

          {/* SECTION 2: FROSTING COLOR */}
          <div className="decor-section">
            <span className="section-label">FROSTING COLOR</span>
            <div className="options-row">
              <button
                className={`btn-choice ${frosting === 'strawberry' ? 'selected' : ''}`}
                onClick={() => handleFrostingChange('strawberry')}
              >
                💖 Pink
              </button>
              <button
                className={`btn-choice ${frosting === 'cream' ? 'selected' : ''}`}
                onClick={() => handleFrostingChange('cream')}
              >
                🤍 Cream
              </button>
              <button
                className={`btn-choice ${frosting === 'matcha' ? 'selected' : ''}`}
                onClick={() => handleFrostingChange('matcha')}
              >
                🍵 Matcha
              </button>
            </div>
          </div>

          {/* SECTION 3: DRIP EFFECT */}
          <div className="decor-section">
            <span className="section-label">DRIP EFFECT</span>
            <div className="options-row">
              <button
                className={`btn-choice ${dripType === 'chocolate' ? 'selected' : ''}`}
                onClick={() => handleDripChange('chocolate')}
              >
                💧 Choco Drip
              </button>
              <button
                className={`btn-choice ${dripType === 'caramel' ? 'selected' : ''}`}
                onClick={() => handleDripChange('caramel')}
              >
                🍯 Caramel
              </button>
              <button
                className={`btn-choice ${dripType === 'none' ? 'selected' : ''}`}
                onClick={() => handleDripChange('none')}
              >
                🚫 None
              </button>
            </div>
          </div>

          {/* SECTION 4: EXTRAS & TOPPINGS */}
          <div className="decor-section">
            <span className="section-label">EXTRAS & TOPPINGS</span>
            <div className="options-row">
              <button
                className={`btn-choice ${hasStrawberries ? 'selected' : ''}`}
                onClick={toggleStrawberries}
              >
                🍓 Strawberries
              </button>
              <button
                className={`btn-choice ${hasCherries ? 'selected' : ''}`}
                onClick={toggleCherries}
              >
                🍒 Cherries
              </button>
              <button
                className={`btn-choice ${hasSprinkles ? 'selected' : ''}`}
                onClick={toggleSprinkles}
              >
                ✨ Sprinkles
              </button>
              <button
                className={`btn-choice ${hasCandles ? 'selected' : ''}`}
                onClick={toggleCandles}
              >
                🕯️ Candles
              </button>
            </div>
          </div>

          <button className="proceed-btn" onClick={handleProceed}>
            Doneee 🎉
          </button>
        </div>
      </div>

      {/* BOTTOM LEFT: Bitmoji Reactions */}
      <div className="bitmoji-host-anchor">
        <div className="host-speech-bubble" key={commentary}>
          <p>{commentary}</p>
        </div>
        <img src={currentBitmoji} alt="Bitmoji Reaction" className="host-bitmoji-img" />
      </div>
    </div>
  );
}