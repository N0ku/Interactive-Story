import { useRef, useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import {ParticleConstructor} from "./ParticlesSystems";

export default function SmokeParticles({ numParticles, color, position }) {
    const particleConstructor = new ParticleConstructor(position, numParticles, color);
  
    const meshRef = useRef();
    const [positions, setPositions] = useState(null);
  
    useEffect(() => {
      const positionsArray = new Float32Array(numParticles * 3);
  
      particleConstructor.aleatoryCoordonates.forEach((coord, i) => {
        positionsArray[i * 3] = coord.x;
        positionsArray[i * 3 + 1] = coord.y;
        positionsArray[i * 3 + 2] = coord.z;
      });
  
      setPositions(positionsArray);
    }, [numParticles, particleConstructor]);
  
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
      }
    });

    return (
        <points ref={meshRef}>
          {positions && (
            <bufferGeometry>
              <bufferAttribute
                attachObject={["attributes", "position"]}
                array={positions}
                itemSize={3}
              />
              <bufferAttribute
                attachObject={["attributes", "color"]}
                array={new Float32Array(numParticles * 3).fill(1)}
                itemSize={3}
              />
            </bufferGeometry>
          )}
          <pointsMaterial
            size={1}
            blending={THREE.AdditiveBlending}
            transparent={true}
          />
        </points>
    );
}