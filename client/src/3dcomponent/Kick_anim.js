import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useCursor, OrbitControls, calcPosFromAngles } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "react-three-fiber";
import { useControls } from "../components/Controls";
import { useBox } from "@react-three/cannon"


const directionnalOffset = ({ forward, backward, left, right }) => {
  var directionnalOffset = 0;

  if (forward) {
    if (left) {
      directionnalOffset = Math.PI / 4
    } else if (right) {
      directionnalOffset = -Math.PI / 4
    }
  }
  else if (backward) {
    if (left) {
      directionnalOffset = Math.PI / 4 + Math.PI / 2
    } else if (right) {
      directionnalOffset = -Math.PI / 4 - Math.PI / 2
    } else {
      directionnalOffset = Math.PI
    }
  } else if (left) {
    directionnalOffset = Math.PI / 2
  } else if (right) {
    directionnalOffset = - Math.PI / 2
  }

  return directionnalOffset;
}

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

function Kick(props) {
  const group = useRef();
  const hitbox = useRef();
  const { nodes, materials, animations } = useGLTF("/kick_anim3.glb");
  const { actions, names } = useAnimations(animations, group)
  const [boxHelper, setBoxHelper] = useState(null);
  const [hovered, hoverAction] = useState(false);
  const modelHeight = -1; // Substract the height of the model from the floor
  const { forward, backward, left, right, shift } = useControls();
  
  const currentAnimation = useRef();
  const controlRef = useRef();
  const camera = useThree((state) => state.camera)
  
  

  const updateCameraTarget = (moveX, moveZ) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;
    
    cameraTarget.x = group.current.position.x;
    cameraTarget.y = group.current.position.y + 2;
    cameraTarget.z = group.current.position.z;
    
    if (controlRef.current) controlRef.current.target = cameraTarget;
  }
  
  function PlayerBox({ args, onCollide }) {
    const [ref] = useBox(() => ({ isTrigger: true, args, onCollide }))
    
    return (
      <group ref={ref}>
        <mesh>
          <boxBufferGeometry args={args} />
          <meshStandardMaterial wireframe color="green" />
        </mesh>
      </group>
    )
  }
  /*   actions[names[props.animationIndex]].reset().fadeIn(0.25).play(); */
  useEffect(() => {
    let action;
    if (forward || backward || left || right) {
      action = "kick_walkInPlace"
      if (shift) {
        action = "kick_runInPlace"
      }
    }
    else {
      action = "kick_idle"
    }
    // the ? verify if the object is undefined or null
    if (currentAnimation.current !== action) {
      const nextAnimation = actions[action];
      const current = actions[currentAnimation.current];
      current?.fadeOut(0.2);
      nextAnimation?.reset().fadeIn(0.2).play();
      currentAnimation.current = action
    }
  }, [forward, backward, left, right, shift, actions]);

  useCursor(hovered);



  const [positionObj, setPositionObj] = useState([0, -0.01, -2])
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.01, -2),
    new THREE.Vector3(0, -0.01, 2),

    new THREE.Vector3(4, -0.01, 5),

    new THREE.Vector3(7, -0.01, 11)


  ]);

  useFrame((state, delta) => {
    if (currentAnimation.current === "kick_runInPlace" || currentAnimation.current === "kick_walkInPlace") {
      let angleYCamera = Math.atan2(
        camera.position.x - group.current.position.x,
        camera.position.z - group.current.position.z
      )
      let newDirectionOffset = directionnalOffset({
        forward,
        backward,
        left,
        right
      });

      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCamera + newDirectionOffset
      );
      group.current.quaternion.rotateTowards(rotateQuarternion, 0.2)

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      const velocity = currentAnimation.current === "kick_runInPlace" ? 5 : 2; // if the player run, velocity to 10 else 5
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      group.current.position.x += moveX;
      group.current.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
/*       console.log(hitbox.current);
      hitbox.current.position.copy(group.current.position); */
    }
  });

  return (
    <>
      <OrbitControls ref={controlRef} />
      <group ref={group}>
        <group {...props} dispose={null}>
          <group name="Scene">
            <group name="Armature" rotation={[Math.PI / 2, 0, 180 * Math.PI / 180 ]} scale={0.01}>
              <primitive object={nodes.mixamorigHips} />
              <skinnedMesh
                name="Ch03"
                geometry={nodes.Ch03.geometry}
                material={materials.Ch03_Body}
                skeleton={nodes.Ch03.skeleton} />
            </group>
          </group>
        </group>
      </group>
      <PlayerBox args={[2, 3, 1]} ref={hitbox} />
    </>
  );
}
export default Kick;

useGLTF.preload("/kick_anim3.glb");