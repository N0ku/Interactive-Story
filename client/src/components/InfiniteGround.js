
import img from "../assets/road_damaged_0010_01.jpg";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { Plane } from "@react-three/drei";

function InfiniteGround() {
  const texture = useLoader(THREE.TextureLoader, img); // Don't use "UseTexture" here. Prefer "UseLoader" and setup the Three.Texture.
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3000, 3000);
  return (
    <Plane
      args={[10000, 10000]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0,-0.30, 0]}
    >
      <meshStandardMaterial map={texture} />
    </Plane>
  );
}

export default InfiniteGround;