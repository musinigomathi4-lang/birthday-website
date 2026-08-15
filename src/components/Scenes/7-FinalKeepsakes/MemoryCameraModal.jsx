import React from 'react';

export default function MemoryCameraModal({ onClose }) {
  // Replace these placeholders with your actual photos in src/assets/
  const sampleMemories = [
    { id: 1, title: 'Good Times', emoji: '🌟' },
    { id: 2, title: 'Adventures', emoji: '✈️' },
    { id: 3, title: 'Laughs', emoji: '😂' },
    { id: 4, title: 'Unforgettable', emoji: '💖' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content camera-modal-wrap" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <h2>Memory Vault 📷</h2>
        <div className="gallery-grid">
          {sampleMemories.map((mem) => (
            <div key={mem.id} className="gallery-item">
              <span className="gallery-emoji">{mem.emoji}</span>
              <p>{mem.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}