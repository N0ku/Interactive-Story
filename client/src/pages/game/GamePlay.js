import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera"
import { Sky,Loader } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";
import DialogueBox from "../../components/DialogueBoxV2";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import RockyGround from "../../3dcomponent/Rocky_ground";
import Buildings from "../../3dcomponent/Game_ready_city_buildings";
import Wall from "../../3dcomponent/Wall";
import InteractionChoices from "../../components/InteractionChoice";
import InfoBox from '../../components/InfoBox';
import OptionTextBox from "../../components/DialogueInteractionChoice";



//TODO 1 -Thomas - 2021-03-28 - Add LOD (Level Of Detail) - Display the appropriate level of detail based on the distance between the camera and the model to reduce the GPU workload.
//TODO 2 -Thomas - 2021-03-28 - Add Occlusion Frustum - Display the occlusion frustum based on the view camera versus the world, remove if camera don't see him.
//TODO 3 -Thomas - 2021-03-28 - Modify pixel ratio. Gain 10 fps when using low resolution.
//TODO 4 -Thomas - 2021-03-28 - Desactivate AntiAliasing. Hard graphic downgrade. gain 20/30 fps when using low resolution.

function GamePlay() {
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings
  const [refObj, setRefObj] = useState(null)
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(6);
  var posC = [{mode : 'followObject', pos : new THREE.Vector3(0, 2, 4), zoom: 2}, {mode : 'followObject',pos : new THREE.Vector3(0, 2, 0), zoom : 1},  {mode : 'followObjectAbsolu',pos : [0,2,-6], zoom : 1},{mode : 'fixeCamera', pos : new THREE.Vector3(160, 225, 70), zoom : 2},{mode : 'fixeCameraFollowObject', pos : new THREE.Vector3(160, 225, 70), zoom : 2}]
 
  const[increment, setIncrement] = useState(0)
  const [posCameraRelative, setPosCameraRelative] = useState(posC[increment].pos);
  const[zoom, setZoom] = useState(posC[increment].zoom)
  const[mode, setMode] = useState(posC[increment].mode)

  const [message, setMessage] = useState('');

  function handleClick() {
    
    if(increment < posC.length - 1){
      
        setIncrement(increment +1)
        console.log(increment)
        
    }else{
        setIncrement(0)
      

        console.log(increment)

    }


    setPosCameraRelative(posC[increment].pos)
    setZoom(posC[increment].zoom)
    setMode(posC[increment].mode)
   
    
    

    
  }

  const handleMessage = (messageFromChild) => {
    setMessage(messageFromChild);
   
    if(message != null){
        setRefObj(message); 
        

    }
  };


  // fog settings
  const fogColor = 0xffffff;
  const fogNear = 0; // Dist to start fog
  const fogFar = 2000; // Dist to end fog
  const [showElement, ShowElementAction] = useState(false);

  const handleClick = () => {
    ShowElementAction(!showElement);
    console.log(showElement);
  };

  const handleReturnClick = (value) => {
     ShowElementAction(value);
  };

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas
          style={{ width: "100%", height: "100%" }}
          onClick={handleClick}
        // onCreated={({ gl, scene }) => {
        //   scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
        //   gl.setClearColor(scene.fog.color);
        // }}
        >
          <axesHelper scale={[2, 2, 2]} position={[0, 0, 0]} />

         
          <Camera  refTargetObject={refObj} mode={mode} posRelative={posCameraRelative} zoom = {zoom}></Camera>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />

          {/* MAP ELEMENTS - START */}
          <group position={[0, -5, 0]}>
            <Apocalyptic />
          </group>
          <group scale={250} position={[100, 125, -100]}>
            <Buildings />
          </group>
          <Wall scale={7} rotation={[0, -90 * Math.PI / 180, 0]} position={[135, -20, -850]} />
          {/* MAP ELEMENTS - END */}

          {/* SPECIALS OBJECTS - START */}
          <BaseballBat scale={200} position={[619, 10, -800]} rotation={[90 * Math.PI / 180, 340 * Math.PI / 180, 70 * Math.PI / 180]} />
          {/* SPECIALS OBJECTS - END */}

          {/* MAIN CHARACTER */}
          <group scale={20}>
            <KickAnim animationIndex={currentAnimationIndex} onSend={handleMessage} onClick={handleClick} />
          </group>

          {/* ENVIRONNMENT - START */}
          <RockyGround scale={10} position={[-200, -20, -300]} />
          <RockyGround scale={10} position={[1200, -20, -300]} />
          <Sky
            distance={35000}
            sunPosition={[5, 1, 8]}
            inclination={0}
            azimuth={0.25}
          />
          {/* ENVIRONNMENT - END */}

        </Canvas>
           {/* HTML ELEMENT FOR INTERACTION - START */}
        {showElement && (
          <div className="losange-choices-container">
            <InteractionChoices onReturnClick={handleReturnClick} />
            
          </div>
          
        )}
        <OptionTextBox
              buttonTexts={['Banane sa mere', 'Bouton 2', 'Bouton 3', 'Bouton 4']}
              onButtonClick={(buttonIndex) => {
                console.log(`Le bouton ${buttonIndex + 1} a été cliqué`);
              }}
              speed={5}
            />
        <Loader/>
        <DialogueBox text="ParoleDescriptif" speed={10} />
        <InfoBox text="InfoBox" speed={10} />
          {/* HTML ELEMENT FOR INTERACTION - END */}
      </div>
    </div>
  );
}

export default GamePlay;
