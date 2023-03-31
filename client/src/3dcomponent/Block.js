/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 /Users/Lucy/Desktop/Interactive-Story/client/public/concrete_scan_no._3.glb
Author: 3Dystopia (https://sketchfab.com/Dystopia)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/concrete-scan-no-3-7cc00f75d1574d34b22b6327b41a92f0
Title: Concrete scan No. 3
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Block(props) {
  const { nodes, materials } = useGLTF('/concrete_scan_no._3.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials['concrete3_LowPoly.003']} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/concrete_scan_no._3.glb')
export default Block;