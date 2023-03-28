import { Canvas } from 'react-three-fiber';
import AudioComp from '../../components/audio-component/audio-component';

function Audio() {
    return (
        <Canvas>
            <AudioComp camera={{ /* camera here */ }} />
        </Canvas>
    );
}
export default Audio;