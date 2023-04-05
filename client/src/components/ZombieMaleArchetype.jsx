

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

 function Zombie(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/ZombieMaleArchetype.glb')
  const { actions, getAnimationByIndex } = useAnimations(animations, group);


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Body" geometry={nodes.Body.geometry} material={materials.body} skeleton={nodes.Body.skeleton} />
          <skinnedMesh name="Bottoms" geometry={nodes.Bottoms.geometry} material={materials.bottoms} skeleton={nodes.Bottoms.skeleton} />
          <skinnedMesh name="Eyelashes" geometry={nodes.Eyelashes.geometry} material={nodes.Eyelashes.material} skeleton={nodes.Eyelashes.skeleton} />
          <skinnedMesh name="Eyes" geometry={nodes.Eyes.geometry} material={materials.Eyes} skeleton={nodes.Eyes.skeleton} />
          <skinnedMesh name="Hair" geometry={nodes.Hair.geometry} material={materials.hair} skeleton={nodes.Hair.skeleton} />
          <skinnedMesh name="Tops" geometry={nodes.Tops.geometry} material={materials.bottoms} skeleton={nodes.Tops.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/ZombieMaleArchetype.glb')

export default Zombie;
