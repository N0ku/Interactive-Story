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
    const prevPosition = useRef([0, 0, 0]);

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
    const onAxeMove = (position) =>{
        var dir= ''
      const x = Math.round(position.x * 100) / 100 ;
      console.log(position)
      const y = Math.round(position.y * 100) / 100;
      
      const z = Math.round(position.z * 100) / 100;
      console.log('x', x)
      console.log('y',y)
        console.log('z', z)
        console.log(prevPosition.current[0])
      // Check if the model is moving along the X-axis or Z-axis
      if (x != prevPosition.current[0]) {
        
        console.log('Model is moving along the X-axis');
        if (x > prevPosition.current[2]) {
          
          dir = 'droite'
        } else if (x < prevPosition.current[2]) {
          dir = 'gauche'
  
        } else {
  dir = 'none'
        }
      } else if (z != prevPosition.current[2]) {
        console.log('Model is moving along the Z-axis');
        if (z > prevPosition.current[2]) {
  dir = 'devant'
        } else if (z < prevPosition.current[2]) {
          dir = 'derriere'
        } else {
  dir = 'none'      }    }
  
  console.log(dir)
      // Update the previous position of the model
      prevPosition.current = [x, y, z];
      return dir;
    }
  

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
        var a = 1

        switch(modeCamera){
            case 'followObjectAbsolu':
                if(targetObject == null){
                    setTargetObject(refTargetObject)
                    return
                }
                
                    
               
              
                if ( ifFixed && refTargetObject.current.position != undefined) {

                    var thirdPersonPosition = posRelative
                    

                    let position = new THREE.Vector3(0,0,0);
                    position.setFromMatrixPosition(refTargetObject.current.matrixWorld)
                    
                    let quaternion = new THREE.Quaternion(0,0,0,0)
                    quaternion.setFromRotationMatrix(refTargetObject.current.matrixWorld)
        
                    var dir = onAxeMove(position)
                   var  mirPos = thirdPersonPosition
                    if(dir == 'devant'){
                        thirdPersonPosition.x = posRelative.x
                        thirdPersonPosition.z = posRelative.z
                            a = 1
                    }else if(dir =='derriere'){
                        thirdPersonPosition.x = posRelative.x
                        thirdPersonPosition.z = posRelative.z
                            a = -1
                    }else if(dir == 'gauche'){
                        thirdPersonPosition.x = mirPos.z
                        thirdPersonPosition.z = mirPos.x
                        a = -1
                    }else{
                        thirdPersonPosition.x = mirPos.z
                        thirdPersonPosition.z = mirPos.x
                        a = 1
                    }
                    let wDir =new THREE.Vector3(0,0,-1)
                    wDir.applyQuaternion(quaternion)
                    wDir.normalize()
                    let cameraPos = position.clone().add(
                        wDir.clone().multiplyScalar(-1).add(
                            new THREE.Vector3((refTargetObject.current.parent.scale.x * thirdPersonPosition.x) *a,refTargetObject.current.parent.scale.y * thirdPersonPosition.y, (refTargetObject.current.parent.scale.z * thirdPersonPosition.z) * a)
                        )
                    ) 
                    wDir.add(new Vector3(0, 0.2, 0));
                    camera.position.copy(cameraPos)
                    camera.lookAt(new THREE.Vector3(position.x, position.y + (refTargetObject.current.parent.scale.y / 2), position.z))
                
                }
                break;
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
                    wDir.applyQuaternion(quaternion)
                    wDir.normalize()
                    let cameraPos = position.clone().add(
                        wDir.clone().multiplyScalar(-1).add(
                            new THREE.Vector3(a*(refTargetObject.current.parent.scale.x * thirdPersonPosition.x),refTargetObject.current.parent.scale.y * thirdPersonPosition.y, (refTargetObject.current.parent.scale.z * thirdPersonPosition.z))
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
                rotation={[Math.PI / 2, 0, 2]}
            >
                
            </PerspectiveCamera>

            


        </>

    )
;

}