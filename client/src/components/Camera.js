import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { ReactDOM, useEffect } from "react";
import React, { useState, Component, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { useControls, button } from 'leva'
import annotations from './annotations.json'


export default function Camera({ lerping, setLerping, path }) {
    const camera = useRef();
    const orbit = useRef();
    const [advance, setAdvance] = useState(true);
    const [lastPosition, setLastPosition] = useState(null);
    const [to, setTo] = useState(new Vector3(10, 10, 10));
    const [target, setTarget] = useState(new Vector3(0, 1, 0));

    useControls('Camera', () => {
        console.log('creating buttons')

        // using reduce
        const _buttons = annotations.reduce(
            (acc, a) =>
                Object.assign(acc, {
                    [a.title]: button(() => {
                        setTo(a.position)
                        setTarget(a.lookAt)
                        setLerping(true)
                    })
                }),
            {}
        )
        return _buttons
    })

    useFrame(({ camera }, delta) => {
        if (lerping) {
            camera.position.lerp(to, delta)
            orbit.current.target.lerp(target, delta)
        }
    })

    /*     useFrame((state, delta) => {
            setLastPosition(path.getPointAt(1));
            if (advance) {
                const time = state.clock.getElapsedTime();
                const position = path.getPointAt((time % path.getLength()) / path.getLength());
                console.log('x: ', position.x)
                console.log('y: ', position.y)
                console.log('z: ', Math.trunc(position.z))
                const tangent = path.getTangentAt((time % path.getLength()) / path.getLength());
    
                camera.current.position.set(position.x, position.y, position.z);
                camera.current.lookAt(new Vector3(position.x + tangent.x, position.y + tangent.y, position.z + tangent.z));
                if (lastPosition != null) {
                    if (lastPosition.z == Math.trunc(position.z)) {
                        setAdvance(false)
                        orbit.current.target.set(lastPosition.x, 0, lastPosition.z - 2);
                        orbit.current.update();
                    }
                }
    
            }
    
        }); */
    return (
        <>
            <PerspectiveCamera
                makeDefault
                ref={camera} {...path}
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