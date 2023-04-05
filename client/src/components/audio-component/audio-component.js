import React, { useRef, useEffect, useCallback } from 'react';
import { Canvas, extend, useThree ,useFrame} from 'react-three-fiber';
import { AudioListener, AudioLoader, PositionalAudio } from 'three';





// Étendre React Three Fiber pour utiliser PositionalAudio
extend({ PositionalAudio });

const PositionalAudioComponent = ({ url, distance = 1, position }) => {
  const sound = useRef();
  const { camera, scene } = useThree();
  const listener = new AudioListener();
  camera.add(listener);

  const playAudio = useCallback(() => {
    if (sound.current) {
      sound.current.context.resume();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', playAudio);
    window.addEventListener('touchstart', playAudio);

    return () => {
      window.removeEventListener('click', playAudio);
      window.removeEventListener('touchstart', playAudio);
    };
  }, [playAudio]);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio(url);
    const audioNode = audioContext.createMediaElementSource(audioElement);
    const pannerNode = new PannerNode(audioContext, {
      panningModel: 'HRTF',
      distanceModel: 'exponential',
      refDistance: distance,
      maxDistance: 10000,
      rolloffFactor: 1,
    });

    audioNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);
    audioElement.play();

    sound.current = pannerNode;

    return () => {
      audioElement.pause();
      audioNode.disconnect();
      pannerNode.disconnect();
    };
  }, [url, distance]);

  useFrame(() => {
    if (sound.current) {
      sound.current.setPosition(scene.position.x, scene.position.y, scene.position.z);
    }
  });

  return null;
};



// Créer un composant Scene pour configurer l'environnement 3D
const Scene = ({ audioUrl, distance, position }) => {
  return (
    <group>
      <mesh>
        <boxBufferGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color={'orange'} opacity={0.1} transparent />
        <PositionalAudioComponent url={audioUrl} distance={distance} position={position} />
      </mesh>
    </group>
  );
};

// Créer le composant App qui rend les composants Canvas et Scene
const PositionedSound = ({ audioUrl, distance, position }) => {
  return (
    <Scene audioUrl={audioUrl} distance={distance} position={position} />
  );
};

export default PositionedSound;
