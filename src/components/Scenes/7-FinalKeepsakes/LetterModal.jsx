import React from 'react';
import './keepsakes.css';

export default function LetterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="letter-card-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="letter-paper">
          <div className="letter-header">
            <h2>Happy Birthday !! 🥳✨</h2>
          </div>

          <div className="letter-body">
            <p>
              Here is where your deeply unique, heartfelt story letter lives
              inside this custom textured sheet layer.
            </p>

            <p>
              Enjoy every bit of your day today. You earned it!
            </p>

            <p className="letter-signature">
              <strong>Best Regards,</strong>
              <br />
              <strong>Me</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}