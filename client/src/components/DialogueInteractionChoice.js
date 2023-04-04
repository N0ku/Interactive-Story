import React, { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';

const TransparentButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-block',
        margin: '5px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        border: 'none',
        width: '600px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );
};

const OptionTextBox = ({ buttonTexts, onButtonClick, speed }) => {
  const [displayedTexts, setDisplayedTexts] = useState(buttonTexts.map(() => ''));

   useEffect(() => {
    const intervals = buttonTexts.map((_, i) => {
      let index = -1;

      return setInterval(() => {
        if (index < buttonTexts[i].length - 1) {
          index++;
          setDisplayedTexts((prevTexts) => {
            const newDisplayedTexts = prevTexts.slice();
            newDisplayedTexts[i] = prevTexts[i] + buttonTexts[i][index];
            return newDisplayedTexts;
          });
        } else {
          clearInterval(intervals[i]);
        }
      }, 1000 / speed);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [buttonTexts, speed]);

  return (
      <div
        style={{
          position: 'fixed',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderRadius: '10px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          textAlign: 'center',
        }}
      >
        {displayedTexts.map((text, index) => (
          <TransparentButton key={index} text={text} onClick={() => onButtonClick(index)} />
        ))}
      </div>
  );
};

export default OptionTextBox;
