import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { useState, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3, Quaternion } from "three";
import { useControls, button } from 'leva'
import cameras from './camera.json'
import * as THREE from "three";



export default function Camera({ lerping, setLerping, refTargetObject }) {
    const camera = useRef();
    const orbit = useRef();
    const [to, setTo] = useState(new Vector3(10, 10, 10));
    const [target, setTarget] = useState(new Vector3(0, 1, 0));
    const [ifFixed, setFixed] = useState(true);
    const [targetObject, setTargetObject] = useState(null)

    useControls('Camera', () => {
        console.log('creating buttons')
        
        // using reduce
        const _buttons = cameras.reduce(
            (acc, a) =>
                Object.assign(acc, {
                    [a.title]: button(() => {
                        setTo(a.position)
                        setTarget(a.lookAt)
                        setLerping(true)
                        setFixed(a.fixed)
                    })
                }),
            {}
        )
        return _buttons
    })

    let rotationDuration = 4; // adjust this to control the duration of rotation in seconds
    let rotationTimer = 0;
    let rotationSpeed = (2 * Math.PI) / rotationDuration;

    useFrame(({camera},delta )=> {
        if(targetObject == null){
            setTargetObject(refTargetObject)
            return
        }
      
        console.log(refTargetObject)
       console.log(targetObject)
        if ( ifFixed && refTargetObject.current.position != undefined) {
         var posTarget =  new THREE.Vector3(refTargetObject.current.position.x, refTargetObject.current.position.y + 9, refTargetObject.current.position.z - 35 );
         var posCamera = camera.position
        const direction = new THREE.Vector3().subVectors(
            posTarget,
            posCamera
          );

    const distance = direction.length();
    const speed = 45;
      const unitDirection = direction.normalize();
      const movement = unitDirection.multiplyScalar(distance * speed * delta);
      camera.position.add(movement);
      camera.lookAt(posTarget); 

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
                far={500}
                fov={100}
               
            />


        </>

    )
        ;

}