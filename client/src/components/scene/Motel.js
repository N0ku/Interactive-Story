import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from "@react-three/drei";

function Motel() {
    return (
        <div className="App">
        <div className="canvas-container">
        <Canvas>
        <OrbitControls
                enableDamping
                dampingFactor={0.1}
                rotateSpeed={0.5} // Speed Rotation
                minPolarAngle={Math.PI / 6} // Limit angle in down direction
                maxPolarAngle={Math.PI / 2}
              />
        <ambientLight />
        <pointLight position={[5, 5, 5]} />
        <mesh>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='hotpink' />
        </mesh>
      </Canvas>
        </div>
      </div>
    );
}

export default Motel;
