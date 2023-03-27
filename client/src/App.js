import './App.css';
import React from 'react';
import {Canvas} from "react-three-fiber";
import Kick from './Kick.js';


export default function App() {
  return (
    <div className="App">
      <Canvas>
        <directionalLight intensity={0.5}/>
        <ambientLight intensity={0.5}/>
        <Kick/>
      </Canvas>
     
    </div>
  );
}

