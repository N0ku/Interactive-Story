import { useFrame } from 'react-three-fiber';
import { PositionalAudio, Vector3 } from 'three';
import { useState, useEffect } from 'react';

function AudioComp(camera) {
    const [audioSource, setAudioSource] = useState(null);
    const [currentCamera, setCurrentCamera] = useState(camera);

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
    });

    useFrame(({ camera }) => {
        if (audioSource && camera === currentCamera) {
            audioSource.setDirection(camera.getWorldDirection(new Vector3()));
            audioSource.setPosition(camera.position.x, camera.position.y, camera.position.z);
        }
    }, [currentCamera]);

    // ...rest of the component code
};
export default AudioComp;
