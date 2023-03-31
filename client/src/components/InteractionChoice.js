import React from 'react';
import '../InteractionChoices.css';
import { Html } from "@react-three/drei";

import combatImg from '../assets/combat.png';
import observerImg from '../assets/observer.png';
import interragirImg from '../assets/interragir.png';
import retourImg from '../assets/retour.png';



const InteractionChoices = () => {
  const handleClick = (value) => {
    console.log(value);
  };

  return (
    <div className="losange-container">
      <div className="corner top-left" onClick={() => handleClick('a')}>
        <img src={combatImg} alt="circle" className="circle-image" />
        <span>Combat</span>
      </div>
      <div className="corner top-right" onClick={() => handleClick('b')}>
        <img src={observerImg} alt="circle" className="circle-image" />
        <span>Observer</span>
      </div>
      <div className="corner bottom-left" onClick={() => handleClick('c')}>
        <img src={interragirImg} alt="circle" className="circle-image" />
        <span>Interragir</span>
      </div>
      <div className="corner bottom-right" onClick={() => handleClick('d')}>
        <img src={retourImg} alt="circle" className="circle-image" />
        <span>Retour</span>
      </div>
    </div>
  );
};

export default InteractionChoices;
