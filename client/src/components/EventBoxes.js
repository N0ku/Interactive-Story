import { useBox } from "@react-three/cannon"

export function BoxTrigger({ args, onCollide, position }) {
    const [ref] = useBox(() => ({ isTrigger: true, args, position, onCollide }))
    return (
        <mesh {...{ position, ref }}>
            <boxBufferGeometry args={args} />
            <meshStandardMaterial wireframe color="green" />
        </mesh>
    )
}

