import { useBox } from "@react-three/cannon"
import { useRef } from "react"

export function BoxTrigger(props) {
    const [ref, api] = useBox(
        () => ({ isTrigger:true, args: [2, 2, 2], mass: 0, ...props,onCollide:() => {console.log("Box event");} }),
        useRef()
    )

    return (
        <mesh ref={ref} name="Box event" castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
            <boxGeometry args={[2, 2, 2]} />
            <meshNormalMaterial />
        </mesh>
    )
}