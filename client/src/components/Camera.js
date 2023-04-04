import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { useState, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Vector3, Quaternion, AxesHelper } from "three";
import { useControls, button } from 'leva'
import cameras from './camera.json'
import * as THREE from "three";



export default function Camera({ refTargetObject, mode, posRelative, zoom,refObjectRotation }) {
    const camera = useRef();
    const orbit = useRef();
    const [to, setTo] = useState(new Vector3(10, 10, 10));
    const [target, setTarget] = useState();
    const [ifFixed, setFixed] = useState(true);
    const [targetObject, setTargetObject] = useState(null)
    const [positionObj, setPositionObj] = useState([0, 4, -15])
    const prevPosition = useRef([0, 0, 0]);

    var scene = useThree()

    const onAxeMove = (position) =>{
        var y = position; 
        var dir = '';
        if (y > -0.75 && y <= 0.75) {
          dir = 'devant';
        } else if (y > 0.75 && y <= 1.75) {
          dir = 'gauche';
        } else if ((y > 1.75 && y <= 4) || y <= -2.75) {
          dir = 'derriere';
        }else if (y > -2.75 && y<= -0.75) {
            dir = 'droite';
        }else{
            dir = 'devant';
        }
      return dir;
    }

    
  
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
                if ( ifFixed && refTargetObject.current.position != undefined && refObjectRotation != null) {
                    var thirdPersonPosition = [];
                    console.log(posRelative)
                    thirdPersonPosition.concat(posRelative)
                    
                    var posY = refObjectRotation[1]
                    console.log(posY)
                    

                    let position = new THREE.Vector3(0,0,0);
                    position.setFromMatrixPosition(refTargetObject.current.matrixWorld)
                    
                    let quaternion = new THREE.Quaternion(0,0,0,0)
                    quaternion.setFromRotationMatrix(refTargetObject.current.matrixWorld)
        
                    var dir = onAxeMove(posY)
                    if(dir == 'devant'){
                        thirdPersonPosition[0] = posRelative.x
                        thirdPersonPosition[1] = posRelative.y
                        thirdPersonPosition[2] = posRelative.z
                        a = 1
                    }else if(dir =='derriere'){
                        thirdPersonPosition[0] = posRelative.x
                        thirdPersonPosition[1] = posRelative.y
                        thirdPersonPosition[2] = posRelative.z
                        a = -1
                    }else if(dir == 'gauche'){
                        thirdPersonPosition[0] = posRelative.z
                        thirdPersonPosition[1] = posRelative.y
                        thirdPersonPosition[2] = posRelative.x
                        a = 1
                    }else if(dir == 'droite'){
                        thirdPersonPosition[0] = posRelative.z
                        thirdPersonPosition[1] = posRelative.y
                        thirdPersonPosition[2] = posRelative.x
                        a = -1
                    }
                    console.log(thirdPersonPosition)
                    let wDir =new THREE.Vector3(0,0,0)
                    wDir.applyQuaternion(quaternion)
                    wDir.normalize()
                    let cameraPos = position.clone().add(
                        wDir.clone().multiplyScalar(-1).add(
                            new THREE.Vector3((refTargetObject.current.parent.scale.x * thirdPersonPosition[0]) *a,refTargetObject.current.parent.scale.y * thirdPersonPosition[1], (refTargetObject.current.parent.scale.z * thirdPersonPosition[2]) * a)
                        )
                    ) 
                    wDir.add(new Vector3(0, 0.2, 0));
                    camera.position.copy(cameraPos)
                    console.log(position)
                    console.log(camera.position)
                    camera.lookAt(new THREE.Vector3(position.x, position.y + (refTargetObject.current.parent.scale.y /2) , position.z))
                
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
                fov={50}
                far={5000}
                zoom={zoom}     
            > 
            </PerspectiveCamera>
        </>
    );}
