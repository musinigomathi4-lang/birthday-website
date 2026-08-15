import React from 'react';
import LetterModal from './LetterModal';
import './keepsakes.css';

export default function KeepsakesScene({ polaroidImg, activeKeepsake, onClose }) {
  return (
    <>
      {/* Birthday Letter Modal */}
      <LetterModal
        isOpen={activeKeepsake === 'letter'}
        onClose={onClose}
      />

      {/* Snapshot / Polaroid Modal */}
      {activeKeepsake === 'polaroid' && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="polaroid-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>&times;</button>
            <h2 className="modal-title">The Snapshot 📸</h2>
            {polaroidImg ? (
              <img src={polaroidImg} alt="Candlelight Memory" className="polaroid-img-preview" />
            ) : (
              <p className="no-img-text">No picture captured yet! 🎂</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}