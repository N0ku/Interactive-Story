/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 /Users/Lucy/Desktop/Interactive-Story/client/public/kick_anim.glb
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

function KickAnim({ animationIndex, props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/kick_anim.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    actions[names[animationIndex]].reset().fadeIn(0.25).play();
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Ch03" geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/kick_anim.glb')
export default KickAnim;