import React, { useState } from "react";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera";
import { Sky } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import RockyGround from "../../3dcomponent/Rocky_ground";
import Buildings from "../../3dcomponent/Game_ready_city_buildings";
import Wall from "../../3dcomponent/Wall";
function Intro() {
  const [lerping, setLerping] = useState(false);
  const [refObj, setRefObj] = useState(null);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(11);
  const [message, setMessage] = useState("");
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  const handleMessage = (messageFromChild) => {
    setMessage(messageFromChild);
    if (message != null) {
      setRefObj(message);
    }
  };

  return (
    <>
      <Camera
        lerping={lerping}
        setLerping={setLerping}
        refTargetObject={refObj}
      ></Camera>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} />

      {/* MAP ELEMENTS - START */}
      <group position={[0, -5, 0]}>
        <Apocalyptic />
      </group>
      <group scale={250} position={[100, 125, -100]}>
        <Buildings />
      </group>
      <Wall
        scale={7}
        rotation={[0, (-90 * Math.PI) / 180, 0]}
        position={[135, -20, -850]}
      />
      {/* MAP ELEMENTS - END */}

      {/* SPECIALS OBJECTS - START */}
      <BaseballBat
        scale={200}
        position={[619, 10, -800]}
        rotation={[
          (90 * Math.PI) / 180,
          (340 * Math.PI) / 180,
          (70 * Math.PI) / 180,
        ]}
      />
      {/* SPECIALS OBJECTS - END */}

      {/* MAIN CHARACTER */}
      <group scale={20}>
        <KickAnim
          animationIndex={currentAnimationIndex}
          onSend={handleMessage}
        />
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
    </>
  );
}

export default Intro;
