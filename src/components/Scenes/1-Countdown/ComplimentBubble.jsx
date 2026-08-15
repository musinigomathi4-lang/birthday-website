import React, { useState } from 'react';

export default function ComplimentBubble({ bubble, onPop }) {
  const [isPopped, setIsPopped] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isPopped) {
      setIsPopped(true);
      if (onPop) onPop(bubble.id);
    }
  };

  return (
    <div
      className={`floating-bubble-node ${bubble.animClass}`}
      style={{
        left: bubble.left,
        animationDelay: bubble.delay,
      }}
      onClick={handleClick}
    >
      {!isPopped ? (
        <div className="soap-bubble-circle">
          <img src={bubble.photo} alt="Memory" className="bubble-img" />
          <div className="bubble-shine"></div>
        </div>
      ) : (
        <div className="revealed-pop-card">
          <img src={bubble.photo} alt="Memory" className="card-img" />
          <span className="card-text">{bubble.text}</span>
        </div>
      )}
    </div>
  );
}