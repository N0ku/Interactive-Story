import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AudioListener, PositionalAudio, AudioLoader } from 'three';

const PositionalAudioComponent = ({ url, distance = 1, position }) => {
  const audioRef = useRef();
  const { camera, scene } = useThree();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.setRefDistance(distance);
      audioRef.current.setDirectionalCone(180, 230, 0.1);
      audioRef.current.setDistanceModel('exponential');
      audioRef.current.setMaxDistance(10000);
      audioRef.current.setRolloffFactor(1);
      audioRef.current.setVolume(1);
      audioRef.current.play();
    }
  }, [audioRef, distance]);

  useFrame(() => {
    if (audioRef.current) {
      audioRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  const listener = useMemo(() => new AudioListener(), []);
  camera.add(listener);

  useEffect(() => {
    const audioLoader = new AudioLoader();
    audioLoader.load(url, (buffer) => {
      const audio = new PositionalAudio(listener);
      audio.setBuffer(buffer);
      audioRef.current = audio;
      scene.add(audio);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.dispose();
        scene.remove(audioRef.current);
      }
    };
  }, [url, listener, scene]);

  return null;
};

const Scene = ({ audioUrl, distance, position }) => {
  return (
    <group>
      <mesh>
        <boxBufferGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color={'orange'} opacity={0.1} transparent />
      </mesh>
      <PositionalAudioComponent url={audioUrl} distance={distance} position={position} />
    </group>
  );
};

const PositionedSound = ({ audioUrl, distance, position }) => {
  return (
    <Scene audioUrl={audioUrl} distance={distance} position={position} />
  );
};

export default PositionedSound;
