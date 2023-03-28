import './App.css';
import React, {useState} from 'react';
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Plane} from "@react-three/drei";
import { InView } from 'react-intersection-observer';
import img from './wall.jpg';
import * as THREE from 'three';
import Kick from './3dcomponent/Kick.js';

// const CameraInfoContext = React.createContext();

function InfiniteGround() {
  const texture = useLoader(THREE.TextureLoader, img);  // Don't use "UseTexture" here. Prefer "UseLoader" and setup the Three.Texture.
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1000, 1000);
  return (
    <Plane args={[1000, 1000]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <meshStandardMaterial map={texture} />
    </Plane>
  );
}



//TODO 1 -Thomas - 2021-03-28 - Add LOD (Level Of Detail) - Display the appropriate level of detail based on the distance between the camera and the model to reduce the GPU workload.
//TODO 2 -Thomas - 2021-03-28 - Add Occlusion Frustum - Display the occlusion frustum based on the view camera versus the world, remove if camera don't see him.
//TODO 3 -Thomas - 2021-03-28 - Modify pixel ratio. Gain 10 fps when using low resolution.
//TODO 4 -Thomas - 2021-03-28 - Desactivate AntiAliasing. Hard graphic downgrade. gain 20/30 fps when using low resolution.

function TryOcclusion({ inView }) {
  if (!inView) return null;

  return (
    <mesh position={[0, 1, 0]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}


// function CameraInfoUpdater({ setCameraPosition, setCameraRotation }) {
//   useFrame((state) => {
//     const { camera } = state;
//     setCameraPosition({
//       x: camera.position.x,
//       y: camera.position.y,
//       z: camera.position.z,
//     });
//     setCameraRotation({
//       x: camera.rotation.x,
//       y: camera.rotation.y,
//       z: camera.rotation.z,
//     });
//   });

//   return null;
// }

// function CameraInfo() {
//   const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
//   const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0, z: 0 });

//   return (
//     <CameraInfoContext.Provider value={{ setCameraPosition, setCameraRotation }}>
//       <div className="camera-info">
//         Position: X: {cameraPosition.x.toFixed(2)} Y: {cameraPosition.y.toFixed(2)} Z: {cameraPosition.z.toFixed(2)}
//         <br />
//         Rotation: X: {cameraRotation.x.toFixed(2)} Y: {cameraRotation.y.toFixed(2)} Z: {cameraRotation.z.toFixed(2)}
//       </div>
//     </CameraInfoContext.Provider>
//   );
// }
export default function App() {
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  const fogColor = 0xffffff;
  const fogNear = 5; // Dist to start fog
  const fogFar = 25; // Dist to end fog


  return (
    <div className="App">
        {/* <CameraInfo /> */}
      <div className="canvas-container">
      {/* <div className="visibility-status">
        {inView ? 'Le cube est visible' : 'Le cube est caché'}
      </div> */}
        <Canvas antialias={false}
         style={{ width: '100%', height: '100%' }}
         onCreated={({ gl, scene }) => {
           scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
           gl.setClearColor(scene.fog.color);
         }}
        >
          <PerspectiveCamera makeDefault aspect={window.innerWidth / window.innerHeight} far={500}  position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <InfiniteGround />
          {/* <InView as="div" threshold={0} onChange={(inView)}>
          {({ inView, }) => <TryOcclusion inView={inView}/>}
          </InView> */}
          <Kick />
          <OrbitControls 
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={0.5} // Speed Rotation
            minPolarAngle={Math.PI / 6} // Limit angle in down direction
            maxPolarAngle={Math.PI / 2} // Limit angle in up direction
          />
          {/* <CameraInfoContext.Consumer>
            {({ setCameraPosition, setCameraRotation }) => (
              <CameraInfoUpdater
                setCameraPosition={setCameraPosition}
                setCameraRotation={setCameraRotation}
              />
            )}
          </CameraInfoContext.Consumer> */}
        </Canvas>
      </div>
    </div>
  );
}