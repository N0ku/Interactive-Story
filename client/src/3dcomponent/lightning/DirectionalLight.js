import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const DirectionalLight = (props) => {
    const directionalLight = useRef();
    const helper = useRef();
  
    useFrame(() => {
      directionalLight.current.position.set(props.position.x, props.position.y, props.position.z);
      if (helper.current && helper.current.update) {
        helper.current.update();
      }
    });
  
    const helperSize = 5; // Taille du helper
  
    return (
      <group>
        <directionalLight
          ref={directionalLight}
          color={props.color}
          intensity={props.intensity}
          castShadow={props.castShadow}
          shadow-mapSize-width={props.shadowMapSize.width}
          shadow-mapSize-height={props.shadowMapSize.height}
          shadow-camera-far={props.shadowCamera.far}
          shadow-camera-near={props.shadowCamera.near}
        />
        {directionalLight.current && (
          <primitive
            object={
              helper.current ||
              new THREE.DirectionalLightHelper(directionalLight.current, helperSize)
            }
            ref={helper}
          />
        )}
        <ambientLight color={props.ambientColor} />
      </group>
    );
  };

DirectionalLight.defaultProps = {
  position: { x: 0, y: 0, z: 0 },
  color: 0xffffff,
  intensity: 1,
  castShadow: false,
  shadowMapSize: { width: 1024, height: 1024 },
  shadowCamera: { far: 5000, near: 0.1 },
  ambientColor: 0xffffff,
};

export default DirectionalLight;
