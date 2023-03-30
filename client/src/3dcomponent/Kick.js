import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, useCursor } from '@react-three/drei';
import * as THREE from 'three';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/kick.glb');
  const [boxHelper, setBoxHelper] = useState(null);

  const modelHeight = -1;
  const [hovered, hoverAction] = useState(false);
  const [clicked, clickAction] = useState(false);
  const [showElement, showElementAction] = useState(false);

  const handleClick = (e) => {
    console.log('Click'); 
    e.stopPropagation(); // stops the event from bubbling up
    props.onClick(); // Send to parent element have click event, for example, 
    // when the user clicks on the button, the parent element will call this function 
    // (Allows you to modify the interior of the children and the child elements of the parents)
  };

  useCursor(hovered);

  useEffect(() => {
    if (group.current) {
      
      const box = new THREE.Box3().setFromObject(nodes.Ch03); // Calcal the hard box of model based on skeleton. 
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

    
      const hitbox = new THREE.Mesh( // Create the hitbox
        new THREE.BoxBufferGeometry(size.x, size.y, size.z),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitbox.position.copy(center);
      hitbox.position.y -= (modelHeight-modelHeight); // Shit counter Shit... Center the hitbox in the middle of the model..
      setBoxHelper(new THREE.BoxHelper(hitbox, 0xff0000)); // Color red because i like red...
    }
  }, [group,modelHeight,nodes.Ch03]);

  return (
    <group position={[5, 0, 0]}>
      <group
        ref={group}
        {...props}
        dispose={null}
      >
        {boxHelper && (
          <primitive
            object={boxHelper}
            onClick={handleClick}
            onPointerOver={() => hoverAction(true)}
            onPointerOut={() => hoverAction(false)}
          />
        )}
        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh
              name="Ch03"
              geometry={nodes.Ch03.geometry}
              material={materials.Ch03_Body}
              skeleton={nodes.Ch03.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/kick.glb');
