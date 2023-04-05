import React from 'react';
import { Canvas} from 'react-three-fiber';
import { OrbitControls,Html,Loader } from "@react-three/drei";

import Forest from "../Forest"
import Test1 from "../Anime_starry_night"
import MotelObjAdvanced from "../MotelProjetAdvanced"
import InfiniteGround from "../InfiniteGround"
import Zombie from "../ZombieMaleArchetype"
import Andre from "../Andre"



function Motel() {
    const animationIndices = [0, 1];
    return (
        <div className="App">
        <div className="canvas-container">
        <Canvas>
        <MotelObjAdvanced/>
        <Test1/>
        <InfiniteGround position={[0,50,0]}/>
        <Forest position={[-70,-0.1,0]} scale={5.5}/>
        <Forest position={[-70,-0.1,-80]} scale={5.5}/>
        <Forest position={[-70,-0.1,80]} scale={5.5}/>
        <Forest position={[-70,-0.1,-80]} scale={5.5}/>
        <Forest position={[-31,-0.1,-65]} scale={5.5}/>
        <Forest position={[-31,-0.1,67]} scale={5.5}/>
        <Forest position={[-31,-0.1,-80]} scale={5.5}/>
        <Forest position={[-31,-0.1,-160]} scale={5.5}/>
        <Forest position={[-31,-0.1,-210]} scale={5.5}/>
        <Forest position={[-31,-0.1,-260]} scale={5.5}/>
        <Forest position={[65,-0.1,0]} scale={5.5}/>
        <Forest position={[65,-0.1,50]} scale={5.5}/>
        <Forest position={[65,-0.1,-40]} scale={5.5}/>
        <Forest position={[65,-0.1,-80]} scale={5.5}/>
        <Forest position={[65,-0.1,-160]} scale={5.5}/>
        <Forest position={[65,-0.1,-210]} scale={5.5}/>
        <Forest position={[65,-0.1,-210]} scale={5.5}/>
        <Zombie position={[10,1,0]}  />
        <Andre  position={[11,1,0]} animationIndex={4} />
        <OrbitControls
                enableDamping
                dampingFactor={0.1}
                rotateSpeed={0.5} // Speed Rotation
                minPolarAngle={Math.PI / 6} // Limit angle in down direction
                maxPolarAngle={Math.PI / 2}
              />
        <pointLight position={[10, 10, 0]} intensity={0.05} color={0x0040ff} castShadow  />
        {/* <pointLight position={[1, 3, -3]} intensity={0.03} color={0x80ff80 } /> */}
        <rectAreaLight
           color="#ffffff"
           intensity={2}
           position={[10.5, 1, 3.5]}
           width={2}
           height={10}
           rotation={[Math.PI/6, Math.PI/3, 0]}
           castShadow 
      />
      {/* <spotLight position={[10, 1, 0]} angle={0.3} penumbra={1} intensity={0.2} castShadow color={0xff0000} /> */}
     
      <mesh position={[13.5, 0.8, 5.3]}>
        <sphereBufferGeometry args={[0.10, 0.10, 0.10]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[14, 0.8, 4.5]}>
        <sphereBufferGeometry args={[0.10, 0.10, 0.10]} />
        <meshBasicMaterial color="red" />
      </mesh>
      
        <hemisphereLight
       skyColor="#02040a"
       groundColor="#000000"
       intensity={0.01}
       position={[0, 50, 0]}
      />
  
      

       
      </Canvas>
      <Loader />
        </div>
      </div>
    );
}


        //TODO Thomas - ADD THIS INTO MICHELLE  onClick={handleClick}


export default Motel;
