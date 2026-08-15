import React from 'react';

export default function PolaroidModal({ polaroidImg, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content polaroid-modal-wrap" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <div className="polaroid-frame">
          {polaroidImg ? (
            <img src={polaroidImg} alt="Candlelight Snapshot" className="polaroid-photo" />
          ) : (
            <div className="polaroid-placeholder">🎂 Snapshot Captured!</div>
          )}
          <div className="polaroid-caption">Best Wish Made Today! ✨</div>
        </div>
      </div>
    </div>
  );
}