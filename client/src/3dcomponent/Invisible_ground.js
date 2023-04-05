/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 /Users/Lucy/Desktop/Interactive-Story/client/public/rocky_ground.glb
Author: André Bray (https://sketchfab.com/masterbray)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/rocky-ground-2de202dfe8014b6cac6ea23ebbbb55ad
Title: Rocky Ground
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'


function InvisibleGround(props) {
  const { nodes, materials } = useGLTF('/rocky_ground.glb')
  return (
    <RigidBody type="fixed" colliders="trimesh" receiveShadow>
    <group {...props} dispose={null}>
      <group position={[0.65, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Plane001__0.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_1.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_2.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_3.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_4.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_5.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_6.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_7.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_8.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_9.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_10.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_11.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_12.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_13.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_14.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_15.geometry} material={materials['Scene_-_Root']} />
        <mesh geometry={nodes.Plane001__0_16.geometry} material={materials['Scene_-_Root']} />
      </group>
      </group>
      </RigidBody>
  )
}

useGLTF.preload('/rocky_ground.glb')
export default InvisibleGround;