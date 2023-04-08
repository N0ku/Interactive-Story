import { useRef } from "react"
import { usePlane } from "@react-three/cannon"

export function Plane(props) {
    const [ref] = usePlane(() => ({ type: "Static", mass: 0, ...props, }), useRef())
    return (
        <mesh ref={ref} receiveShadow name="ground">
            <planeGeometry />
            <meshStandardMaterial />
        </mesh>
    )
}