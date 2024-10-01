import { CameraControls, PerspectiveCamera, useGLTF, Html } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber"; 
import { usePlayersList } from "playroomkit";
import { Vector3 } from "three";
import { Animals } from "./Animals";
import MovingComponent from 'react-moving-text'; // Import MovingComponent
import '/src/lobby.css';

export const Lobby = ({ duration = 10 * 60 * 1000 }) => {
  const { scene } = useGLTF("models/1lobb.glb");
  const { gl } = useThree(); 
  const lightRef = useRef();
  const speed = (Math.PI / 2) / (duration / 12020.67);
  const controls = useRef();
  const viewport = useThree((state) => state.viewport);
  const cameraReference = useRef();

  const adjustCamera = () => {
    const distFactor = 10 / viewport.getCurrentViewport(cameraReference.current, new Vector3(0, 0, 0)).width;
    controls.current.setLookAt(4.2 * distFactor, 2 * distFactor, 7.5 * distFactor, 0, 0.15, 0, true);
  };

  useEffect(() => {
    const onResize = () => adjustCamera();
    adjustCamera();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const players = usePlayersList(true);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.y = 10 * Math.cos(state.clock.elapsedTime * speed);
      lightRef.current.position.x = 10 * Math.sin(state.clock.elapsedTime * speed);
      lightRef.current.target.position.set(0, 0, 0);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = gl.PCFSoftShadowMap;
  }, [gl]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Title Screen
  const showTitleScreen = true;
  const titleText = "Social+".split(""); // Split the text into individual letters

  return (
    <>
      <PerspectiveCamera ref={cameraReference} position={[0, 1, 7]} />
      <group>
        <CameraControls ref={controls} />
        <ambientLight intensity={0.5} />
        <directionalLight
          ref={lightRef}
          intensity={1}
          position={[10, 10, 10]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <primitive object={scene} />
        {players.map((player, index) => (
          <group key={player.id} position={[index * 2, 0, 0]}>
            <Animals />
          </group>
        ))}

        {/* Title Screen */}
        {showTitleScreen && (
  <Html fullscreen>
    <div className="centered-container">
      {/* Directly map titleText here */}
      {titleText.map((letter, index) => (
        <MovingComponent
          key={index}
          type="blur"
          duration="5200ms"
          delay={`${index * 100}ms`}
          direction="normal"
          timing="ease"
          iteration="infinite" // Use 'infinite' for looping
          fillMode="none"
          style={{ display: 'inline-block' }} // Ensure letters are inline
        >
          {letter}
        </MovingComponent>
      ))}
    </div>
  </Html>
)}
      </group>
    </>
  );
};

useGLTF.preload("models/1lobb.glb");
