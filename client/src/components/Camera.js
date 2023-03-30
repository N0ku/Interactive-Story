import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { useState, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3, Quaternion } from "three";
import { useControls, button } from 'leva'
import cameras from './camera.json'


export default function Camera({ lerping, setLerping }) {
    const camera = useRef();
    const orbit = useRef();
    const [to, setTo] = useState(new Vector3(10, 10, 10));
    const [target, setTarget] = useState(new Vector3(0, 1, 0));
    const [ifFixed, setFixed] = useState(true);

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

    useFrame(({ camera }, delta) => {
        if (lerping && ifFixed) {
            camera.position.lerp(to, delta)
            orbit.current.target.lerp(target, delta)
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
                aspect={window.innerWidth / window.innerHeight}
                far={500}
                fov={50}
            />

            <OrbitControls
                ref={orbit}
                enableDamping
                dampingFactor={0.1}
                rotateSpeed={0.5} // Speed Rotation
                minPolarAngle={Math.PI / 6} // Limit angle in down direction
                maxPolarAngle={Math.PI / 2}

            // Limit angle in up direction
            />

        </>

    )
        ;

}