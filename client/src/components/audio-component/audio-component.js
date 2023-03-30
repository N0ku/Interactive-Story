import { useFrame } from 'react-three-fiber';
import { PositionalAudio, Vector3, Raycaster } from 'three';
import { useState, useEffect, useRef } from 'react';

function AudioComp({ target, currentCamera }) {
    const [audioSource, setAudioSource] = useState(null);
    const audioRef = useRef(null);
    const raycaster = new Raycaster();
    const { camera } = currentCamera;

    useEffect(() => {
        const loadAudio = async () => {
            const audioContext = new AudioContext();
            const response = await fetch('./../../assets/audios/zombie-attack-6419.mp3');
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const source = new PositionalAudio(audioContext);
            source.setBuffer(audioBuffer);
            source.setRefDistance(10);
            setAudioSource(source);
        };
        loadAudio();
    }, []);

    useFrame(() => {
        if (audioSource && audioRef.current) {
            raycaster.setFromCamera(new Vector3(0, 0, 0), camera);
            const intersects = raycaster.intersectObject(target, true);

            if (intersects.length > 0) {
                // Set audio position and direction based on target mesh position and camera direction
                audioSource.setDirection(camera.getWorldDirection(new Vector3()));
                audioSource.setPosition(target.position.x, target.position.y, target.position.z);
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    });

    return (
        <>
            {audioSource && (
                <group>
                    <mesh ref={target} />
                    <primitive object={audioSource} ref={audioRef} />
                </group>
            )}
        </>
    );
}

export default AudioComp;
