import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { ReactDOM, useEffect } from "react";
import React, { useState, Component, useRef} from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

export default function Camera(props){
    const { path } = props;
    const camera = useRef();
    const orbit = useRef();
    const [advance, setAdvance] = useState(true);
    const [lastPosition, setLastPosition] = useState(null)
  
    useFrame((state, delta) => {
        setLastPosition(path.getPointAt(1));
        if(advance){
            const time = state.clock.getElapsedTime();
            const position = path.getPointAt((time % path.getLength()) / path.getLength());
            console.log('x: ', position.x)
            console.log('y: ', position.y)
            console.log('z: ', Math.trunc(position.z))
            const tangent = path.getTangentAt((time % path.getLength()) / path.getLength());
            
            camera.current.position.set(position.x, position.y, position.z);
            camera.current.lookAt(new Vector3(position.x + tangent.x, position.y + tangent.y, position.z + tangent.z));
            if(lastPosition != null){
                if(lastPosition.z == Math.trunc(position.z)){
                    setAdvance(false)
                    orbit.current.target.set(lastPosition.x, 0, lastPosition.z -2 );
                    orbit.current.update();
                }
            }
           
        }
     
    });
   return (
   <>
   <PerspectiveCamera
    makeDefault
    ref={camera} {...props}
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