import React, { useState } from 'react';

import CountdownScene from './components/Scenes/1-Countdown/CountdownScene';
import CakeIntroScene from './components/Scenes/3-CakeIntro/CakeIntroScene';
import CakeDecorScene from './components/Scenes/4-CakeDecor/CakeDecorScene';
import CandlelightScene from './components/Scenes/5-Candlelight/CandlelightScene';
import GiftScene from './components/Scenes/6-TheGift/GiftScene';
import KeepsakesScene from './components/Scenes/7-FinalKeepsakes/KeepsakesScene';

import './App.css';

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [activeKeepsake, setActiveKeepsake] = useState(null);

  const [cakeConfig, setCakeConfig] = useState({
    flavor: 'vanilla',
    frosting: 'pink',
    dripType: 'choco',
    hasStrawberries: false,
    hasCherries: false,
    hasSprinkles: false,
    hasCandles: true,
  });

  const [polaroidImg, setPolaroidImg] = useState(null);

  const goToScene = (sceneNum) => setCurrentScene(sceneNum);

  return (
    <div className="app-container">
      {currentScene === 1 && (
        <CountdownScene onComplete={() => goToScene(3)} />
      )}

      {currentScene === 3 && (
        <CakeIntroScene onNext={() => goToScene(4)} />
      )}

      {currentScene === 4 && (
        <CakeDecorScene
          initialConfig={cakeConfig}
          onNext={(finalConfig) => {
            if (finalConfig) setCakeConfig(finalConfig);
            goToScene(5);
          }}
        />
      )}

      {currentScene === 5 && (
        <CandlelightScene
          cakeConfig={cakeConfig}
          onNext={(snapshotData) => {
            if (snapshotData) setPolaroidImg(snapshotData);
            goToScene(6);
          }}
        />
      )}

      {currentScene === 6 && (
        <GiftScene 
          onOpenKeepsakes={(keepsakeType) => {
            setActiveKeepsake(keepsakeType);
          }} 
        />
      )}

      <KeepsakesScene
        polaroidImg={polaroidImg}
        activeKeepsake={activeKeepsake}
        onClose={() => setActiveKeepsake(null)}
      />
    </div>
  );
}