import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { useState, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Vector3, Quaternion, AxesHelper } from "three";
import { useControls, button } from 'leva'
import cameras from './camera.json'
import * as THREE from "three";



export default function Camera({ refTargetObject, mode, posRelative, zoom }) {
    const camera = useRef();
    const orbit = useRef();
    const [to, setTo] = useState(new Vector3(10, 10, 10));
    const [target, setTarget] = useState();
    const [ifFixed, setFixed] = useState(true);
    const [targetObject, setTargetObject] = useState(null)
    const [positionObj, setPositionObj] = useState([0, 4, -15])
    

    var scene = useThree()

    useControls('Camera', () => {
        console.log('creating buttons')
        
        // using reduce
        const _buttons = cameras.reduce(
            (acc, a) =>
                Object.assign(acc, {
                    [a.title]: button(() => {
                        setTo(a.position)
                        setTarget(a.lookAt)
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
        var modeCamera;
        if(mode == undefined){
            return
        }else{
            modeCamera = mode
        }


        switch(modeCamera){
            case 'followObject':
                if(targetObject == null){
                    setTargetObject(refTargetObject)
                    return
                }
                    
               
              
                if ( ifFixed && refTargetObject.current.position != undefined) {
                    const thirdPersonPosition = posRelative
                   

                    let position = new THREE.Vector3(0,0,0);
                    position.setFromMatrixPosition(refTargetObject.current.matrixWorld)
        
                    let quaternion = new THREE.Quaternion(0,0,0,0)
                    quaternion.setFromRotationMatrix(refTargetObject.current.matrixWorld)
        
                    let wDir =new THREE.Vector3(0,0,-1)
                    
                    wDir.normalize()
                    let cameraPos = position.clone().add(
                        wDir.clone().multiplyScalar(-1).add(
                            new THREE.Vector3(refTargetObject.current.parent.scale.x * thirdPersonPosition.x,refTargetObject.current.parent.scale.y * thirdPersonPosition.y,refTargetObject.current.parent.scale.z * thirdPersonPosition.z)
                        )
                    ) 
                    wDir.add(new Vector3(0, 0.2, 0));
                    camera.position.copy(cameraPos)
                    camera.lookAt(new THREE.Vector3(position.x, position.y + (refTargetObject.current.parent.scale.y / 2), position.z))
                
                }
                break;
            case 'fixeCamera':
                let positionFixe = new THREE.Vector3(0,0,0);
                
                

                camera.position.copy(posRelative)
                camera.lookAt(new THREE.Vector3(positionFixe.x, positionFixe.y, positionFixe.z))

                break;

            case 'fixeCameraFollowObject':
                    let positionFixed = new THREE.Vector3(0,0,0);
                    if(refTargetObject != null){
                        positionFixed.setFromMatrixPosition(refTargetObject.current.matrixWorld)
                    }else{
                        positionFixed.set(new THREE.Vector3(0,0,0))
                    }
    
                    camera.position.copy(posRelative)
                    camera.lookAt(new THREE.Vector3(positionFixed.x, positionFixed.y, positionFixed.z))
    
                    break;



        }

        
       })

    return (
        <>
            <PerspectiveCamera
                makeDefault
                ref={camera}
                aspect={scene.innerWidth /scene.innerHeight}
                fov={60}
                far={800}
                zoom={zoom}
                
            >
                
            </PerspectiveCamera>

            


        </>

    )
;

}