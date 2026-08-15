import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

import bitmojiExcited from '../../../assets/bitmoji-excited.png';
import bitmojiLove from '../../../assets/bitmoji-love.png';
import partyBg from '../../../assets/party-bg.png';

import '../4-CakeDecor/CakeDecor.css';
import './Candlelight.css';

export default function CandlelightScene({ onNext, cakeConfig = {} }) {
  const {
    flavor = 'vanilla',
    frosting = 'strawberry',
    dripType = 'none',
    hasStrawberries = false,
    hasCherries = false,
    hasSprinkles = false
  } = cakeConfig;

  const [candlesLit, setCandlesLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [isWalkingOff, setIsWalkingOff] = useState(false);
  const [speechText, setSpeechText] = useState("Make a wish and blow out the candles! 🕯️✨");

  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const stageRef = useRef(null);

  const triggerBlowSequence = async () => {
    if (!candlesLit) return;

    setCandlesLit(false);
    setShowSmoke(true);
    setSpeechText("WOOO! HAPPY BIRTHDAY!! 🎉🥳");

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    setTimeout(() => {
      setShowSmoke(false);
      setShowBanner(true);
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.5 }
      });
    }, 1000);

    setTimeout(async () => {
      setCameraFlash(true);
      setTimeout(() => setCameraFlash(false), 300);

      let snapshotData = null;
      if (stageRef.current) {
        try {
          const canvas = await html2canvas(stageRef.current, { backgroundColor: null });
          snapshotData = canvas.toDataURL('image/png');
        } catch (err) {
          console.log("Snapshot error:", err);
        }
      }

      setSpeechText("Wait... I left your gift behind! Let me go grab it! 🏃‍♂️💨");

      setTimeout(() => {
        setIsWalkingOff(true);
      }, 1200);

      setTimeout(() => {
        onNext(snapshotData);
      }, 2500);

    }, 2800);
  };

  useEffect(() => {
    let analyser;
    let animationFrameId;

    const initAutoMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = audioCtx;
        analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaStreamSource(stream);

        analyser.fftSize = 256;
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          let average = sum / bufferLength;

          if (average > 50) {
            triggerBlowSequence();
          } else {
            animationFrameId = requestAnimationFrame(detectBlow);
          }
        };

        detectBlow();
      } catch (err) {
        console.log("Mic fallback active");
      }
    };

    initAutoMic();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className={`cinematic-wrapper ${candlesLit ? 'dark-mode' : 'colorful-party-mode'}`}>
      
      {cameraFlash && <div className="camera-flash-overlay"></div>}

      <div 
        className="party-bg-layer" 
        style={{ backgroundImage: `url(${partyBg})` }}
      />

      {showBanner && (
        <div className="party-banner-text animate-drop">
          ✨ HAPPY BIRTHDAY ✨
        </div>
      )}

      <div className="cinematic-header">
        <h1 className="main-title">
          {candlesLit ? "Close your eyes & blow..." : "PARTY TIME!! 🥳🎉"}
        </h1>
      </div>

      <div className="stage-area" ref={stageRef}>
        <div className="flames-container" onClick={triggerBlowSequence}>
          <div className="candle-flames-row">
            {[1, 2, 3].map((id) => (
              <div key={id} className="flame-item">
                {candlesLit && (
                  <div className="flame-glow-wrap">
                    <span className="halo-glow"></span>
                    <span className="fire-emoji">🔥</span>
                  </div>
                )}
                {showSmoke && <div className="smoke-puff">💨</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="cake-reveal-container">
          <div className={`cake-structure flavor-${flavor} frosting-${frosting}`}>
            <div className="cake-fruits-row">
              {hasStrawberries && <span className="fruit-pop">🍓</span>}
              {hasCherries && <span className="fruit-pop">🍒</span>}
              {hasStrawberries && <span className="fruit-pop">🍓</span>}
            </div>

            <div className="cake-tier tier-top">
              <div className="frosting-top-lip"></div>
              {hasSprinkles && (
                <div className="real-sprinkles-container">
                  <span className="sprinkle sp-pink" style={{ top: '25%', left: '15%', transform: 'rotate(15deg)' }}></span>
                  <span className="sprinkle sp-blue" style={{ top: '45%', left: '30%', transform: 'rotate(-40deg)' }}></span>
                  <span className="sprinkle sp-yellow" style={{ top: '20%', left: '50%', transform: 'rotate(70deg)' }}></span>
                  <span className="sprinkle sp-green" style={{ top: '60%', left: '65%', transform: 'rotate(-10deg)' }}></span>
                  <span className="sprinkle sp-purple" style={{ top: '30%', left: '80%', transform: 'rotate(45deg)' }}></span>
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

            <div className="cake-tier tier-bottom">
              <div className="frosting-top-lip"></div>
              {hasSprinkles && (
                <div className="real-sprinkles-container">
                  <span className="sprinkle sp-yellow" style={{ top: '20%', left: '10%', transform: 'rotate(-25deg)' }}></span>
                  <span className="sprinkle sp-purple" style={{ top: '40%', left: '25%', transform: 'rotate(50deg)' }}></span>
                  <span className="sprinkle sp-pink" style={{ top: '30%', left: '42%', transform: 'rotate(-15deg)' }}></span>
                  <span className="sprinkle sp-blue" style={{ top: '65%', left: '55%', transform: 'rotate(80deg)' }}></span>
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

            <div className="cake-stand-top"></div>
            <div className="cake-stand-stem"></div>
            <div className="cake-stand-base"></div>
          </div>
        </div>
      </div>

      <div className={`bitmoji-host-anchor ${isWalkingOff ? 'walk-off' : ''}`}>
        <div className="host-speech-bubble" key={speechText}>
          <p>{speechText}</p>
        </div>
        <img 
          src={candlesLit ? bitmojiExcited : bitmojiLove} 
          alt="Bitmoji Host" 
          className="host-bitmoji-img" 
        />
      </div>

    </div>
  );
}