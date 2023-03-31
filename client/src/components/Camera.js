import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { useState, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Vector3, Quaternion } from "three";
import * as THREE from "three";



export default function Camera({ lerping, setLerping, refTargetObject }) {
    const camera = useRef();
    const orbit = useRef();
    const [to, setTo] = useState(new Vector3(10, 10, 10));
    const [target, setTarget] = useState();
    const [ifFixed, setFixed] = useState(true);
    const [targetObject, setTargetObject] = useState(null)
    const [positionObj, setPositionObj] = useState([0, 4, -15])


    var scene = useThree()
    let rotationDuration = 4; // adjust this to control the duration of rotation in seconds
    let rotationTimer = 0;
    let rotationSpeed = (2 * Math.PI) / rotationDuration;
    useFrame(({ camera }, delta) => {
        if (targetObject == null) {
            setTargetObject(refTargetObject)
            return
        }
        if (ifFixed && refTargetObject.current.position !== undefined) {
            /*             var posTarget = new THREE.Vector3(refTargetObject.current.position.x, refTargetObject.current.position.y + 15, refTargetObject.current.position.z);
             */           /*  var posObj = new THREE.Vector3(refTargetObject.current.position.x, refTargetObject.current.position.y + 15, refTargetObject.current.position.z -7  )
                  var posCamera = camera.position
                  console.log(camera.position)
                  const direction = new THREE.Vector3().subVectors(posTarget, posCamera);
              
                  const distance = direction.length();
                  const speed = 1;
                  const unitDirection = direction.normalize();
                  const movement = unitDirection.multiplyScalar(distance * speed * delta);
                  console.log(posObj)
                  console.log(posTarget) */
            /* setPositionObj([posObj.x, posObj.y, posObj.z])
            //camera.position.copy(posObj);
            camera.lookAt(posTarget); */


            const thirdPersonPosition = { x: 1, y: 2, z: -2 }
            const thirdPersonTarget = { x: 1, y: 2, z: 2 }

            const firstPersonPosition = { x: 1, y: 1, z: 1 }
            const firstPersonTaget = { x: 1, y: 1, z: 1 }








            let position = new THREE.Vector3(0, 0, 0);
            position.setFromMatrixPosition(refTargetObject.current.matrixWorld)

            let quaternion = new THREE.Quaternion(0, 0, 0, 0)
            quaternion.setFromRotationMatrix(refTargetObject.current.matrixWorld)

            let wDir = new THREE.Vector3(0, 0, -1)
            wDir.applyQuaternion(quaternion)
            wDir.normalize()
            let cameraPos = position.clone().add(
                wDir.clone().multiplyScalar(-1).add(
                    new THREE.Vector3(0, 40, -40)
                )
            )
            camera.position.copy(cameraPos)
            camera.lookAt(new THREE.Vector3(position.x, position.y + 20, position.z))
            /*   camera.position.copy(refTargetObject.current.position);  */
            // Adjust the camera offset to frame the target nicely

            /* camera.lookAt(pos);  */
            //camera.position.lerp(posTarget, delta)
            //camera.position.add(new THREE.Vector3(0, 3, -10));
            //camera.lookAt(refTargetObject.current.position)
            //orbit.current.target.lerp(refTargetObject.current.position, delta)
        }
        //add for follow camera
        else if (!ifFixed) {
            const angle = Math.PI * 2 * (rotationTimer / rotationDuration);
            const newPosition = new Vector3().copy(target);
            const q = new Quaternion();
            q.setFromAxisAngle(new Vector3(0, 1, 0), angle);
            newPosition.sub(camera.position);
            newPosition.applyQuaternion(q);
            newPosition.add(target);
            camera.position.copy(newPosition);
            orbit.current.target.copy(target);
            orbit.current.setAzimuthalAngle(rotationTimer);
            rotationTimer += delta * rotationSpeed;
            if (rotationTimer >= rotationDuration) {
                rotationTimer -= rotationDuration;
            }
        }
    })

    return (
        <>
            <PerspectiveCamera
                makeDefault
                ref={camera}
                position={positionObj}
                aspect={scene.innerWidth / scene.innerHeight}
                fov={70}
                far={500}

            />




        </>

    )
        ;

}