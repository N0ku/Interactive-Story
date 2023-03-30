import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

export default function Rain({ particleCount }) {
  const particleRef = useRef();

  // Create particles
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.9) * 1000;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  // Define material
  const particleMaterial = new THREE.PointsMaterial({
    color: "#89CFF0",
    size: 0.5,
    sizeAttenuation: true,
    map: new TextureLoader().load("/water.jpg"),
    opacity: 0.7,
    transparent: true,
  });

  // Animate particles
  useFrame(() => {
    const particlePositions =
      particleRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;
      particlePositions[index + 1] -= 0.6; // Move particles down
      if (particlePositions[index + 1] < -20) {
        particlePositions[index + 1] = (Math.random() - 0.9) * 1000; // Move particles back up
      }
    }
    particleRef.current.geometry.attributes.position.needsUpdate = true; // Force Three.js to update particle positions
  });

  return (
    <points
      ref={particleRef}
      geometry={particleGeometry}
      material={particleMaterial}
    />
  );
}
