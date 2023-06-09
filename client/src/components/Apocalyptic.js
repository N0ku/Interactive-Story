import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';


function Apocalyptic(props) {
  const { nodes, materials } = useGLTF("/apocalyptic_city.glb");
  return (
    <RigidBody type="fixed" colliders="trimesh" receiveShadow>
      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Object_2.geometry}
            material={materials["02___Default"]}
          />
          <mesh
            geometry={nodes.Object_3.geometry}
            material={materials["02___Defaultff"]}
          />
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials["02___Defaultffff"]}
          />
          <mesh
            geometry={nodes.Object_5.geometry}
            material={materials["02___Defaultffffff"]}
          />
          <mesh
            geometry={nodes.Object_6.geometry}
            material={materials["15___Defaultddd"]}
          />
          <mesh
            geometry={nodes.Object_7.geometry}
            material={materials["16___Default"]}
          />
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials["19___Defaultdffee"]}
          />
          <mesh
            geometry={nodes.Object_9.geometry}
            material={materials["19___Defaultdffeegg"]}
          />
          <mesh
            geometry={nodes.Object_10.geometry}
            material={materials["19___Defaultdffeegggg"]}
          />
          <mesh
            geometry={nodes.Object_11.geometry}
            material={materials.Material__1276}
          />
          <mesh
            geometry={nodes.Object_12.geometry}
            material={materials.Material__1277}
          />
          <mesh
            geometry={nodes.Object_13.geometry}
            material={materials.Material__1278}
          />
          <mesh
            geometry={nodes.Object_14.geometry}
            material={materials["01___Defaultgggggggg"]}
          />
          <mesh
            geometry={nodes.Object_15.geometry}
            material={materials["01___Defaultyyyy"]}
          />
          <mesh
            geometry={nodes.Object_16.geometry}
            material={materials["13___Default"]}
          />
          <mesh
            geometry={nodes.Object_17.geometry}
            material={materials["14___Default"]}
          />
          <mesh
            geometry={nodes.Object_18.geometry}
            material={materials["19___Default"]}
          />
          <mesh
            geometry={nodes.Object_19.geometry}
            material={materials["19___Defaultd"]}
          />
          <mesh
            geometry={nodes.Object_20.geometry}
            material={materials["19___Defaultdff"]}
          />
          <mesh
            geometry={nodes.Object_21.geometry}
            material={materials["19___Defaultdffeedd"]}
          />
          <mesh
            geometry={nodes.Object_22.geometry}
            material={materials["19___Defaultdffeegg"]}
          />
          <mesh
            geometry={nodes.Object_23.geometry}
            material={materials["19___Defaultdffeeggff"]}
          />
          <mesh
            geometry={nodes.Object_24.geometry}
            material={materials["19___Defaultdffeegggg"]}
          />
          <mesh
            geometry={nodes.Object_25.geometry}
            material={materials.vray_22___Defaultfff}
          />
          <mesh
            geometry={nodes.Object_26.geometry}
            material={materials.wire_225088199}
          />
          <mesh
            geometry={nodes.Object_27.geometry}
            material={materials.wire_225088199}
          />
          <mesh
            geometry={nodes.Object_28.geometry}
            material={materials.wire_228184153}
          />
        </group>
      </group>
    </RigidBody>
  );
}
useGLTF.preload('/apocalyptic_city.glb')
export default Apocalyptic;