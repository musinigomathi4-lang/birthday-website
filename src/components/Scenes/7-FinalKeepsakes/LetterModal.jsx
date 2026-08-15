import React from 'react';
import './keepsakes.css';

export default function LetterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="letter-card-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="letter-paper">
          <div className="letter-header">
            <h2>Happy Birthday Laasyaa  !! 🥳✨</h2>
          </div>
          
          <div className="letter-body">
            <p>
              Cheers to another year of being sooo soo beautiful, pretty, gorgeous.. 💖
            </p>
            <p>
              Usually I'm not the type to write letters, but this time I felt like writing one plus u asked for long paras .. i didnt give u one bc i was waiting exactly waiting for this time.....Ugh why is this so difficult ToT !! I've been thinking about what to write for so long and now that I'm actually writing it, my brain has decided to stop working. TvT
            </p>
            <p>
              But honestly, I'm really glad I did.
            </p>
            <p>
              Our random moments, our stupid conversations, and your contagious laugh always make my day. I don't think I say it enough, but I genuinely love how comfortable everything feels with you. I can be completely random with you and never feel like I have to pretend or think too much about what I'm saying.
            </p>
            <p>
              There are so many tiny moments that probably didn't seem like a big deal at the time, but somehow those are the ones I remember the most. And I think that's what I like about us. We don't always need some huge memorable moment. Sometimes it's just us laughing at something ridiculously stupid or talking about the most random thing ever, and somehow that ends up being one of the best parts of my day.
            </p>
            <p>
              I hope you always stay the same person who can laugh way too loudly, make random moments memorable, and somehow make ordinary days feel a little better just by being there. And I hope this year brings you everything you've been hoping for -- lots of happiness, lots of reasons to smile, and obviously, even more reasons to laugh that ridiculous laugh of yours.
            </p>
            <p className="letter-highlight">
              Study hard akka so that we can live together, travel together in the future hehehe
            </p>
            <p className="letter-signature">
              Love you lotssssssss 💖💖💖💖<br />
              <span className="ps-note">(worth it ah? emo bro idk how to write letters ok)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}