import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const InfoBox = ({ text, speed, }) => {
  const infoBoxRef = useRef();
  const [infoBoxdisplayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = -1; // -1 For take first caracter
    const interval = setInterval(() => {
      if (index < text.length-1) { // -1 for counter open interval
        index++;
        setDisplayedText((prevText) => prevText + text[index]);
      } else {
        clearInterval(interval);
      }
    }, 1000/ speed); // 1000/speed = 1 second

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
      <div
        style={{
        position: 'fixed', 
        top: '10px', 
        left: '10px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        width: '200px',
        wordWrap: 'break-word', 
        textAlign: 'justify', 
        }}>{infoBoxdisplayedText}
      </div>
  );
};

export default InfoBox;