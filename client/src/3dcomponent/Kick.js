/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 E:\Developpement\Model3D\kick.glb
*/

import React, { useRef,useMemo } from 'react'
import {LOD,SkinnedMesh} from 'three';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
import { useGLTF} from '@react-three/drei'

function createLODModel(nodes, materials, quality) {
  const modifier = new SimplifyModifier();
  const clonedNodes = nodes.mixamorigHips.clone();
  const skinnedMesh = clonedNodes.getObjectByName('Ch03', true);

  if (skinnedMesh) {
    const geometry = new THREE.BufferGeometry().fromGeometry(skinnedMesh.geometry);
    const simplifiedGeometry = modifier.modify(geometry, Math.floor(geometry.attributes.position.count * quality));
    skinnedMesh.geometry.dispose();
    skinnedMesh.geometry = simplifiedGeometry;
  }

  return clonedNodes;
}

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/kick.glb')

  const modelHeight=-1; // Substract the height of the model from the floor


  
  const high = useMemo(() => nodes.mixamorigHips,[nodes]);
  const medium = useMemo(()=> createLODModel(nodes, materials,0.5),[nodes, materials]);
  const low = useMemo(()=> createLODModel(nodes, materials,0.20),[nodes, materials]);

  const lod= (()=>{
    const lod = new THREE.LOD();
    lod.addLevel(high,0);
    lod.addLevel(medium,20);
    lod.addLevel(low,40);
    return lod;
  }, [high,medium,low]);

  return (
    <group position={[0, 0, 0]}>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={[0.01,0.01,0.01]}>
            <primitive object={lod} />
            {/* <primitive object={nodes.mixamorigHips} /> */}
            <skinnedMesh name="Ch03" geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/kick.glb')
