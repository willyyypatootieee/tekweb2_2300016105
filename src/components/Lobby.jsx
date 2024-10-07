import { CameraControls, PerspectiveCamera, useGLTF, Html } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber"; 
import { usePlayersList } from "playroomkit";
import { Vector3 } from "three";
import { Pixel7 } from "./Showcase";
import MovingComponent from 'react-moving-text';
import gsap from 'gsap';
import '/src/lobby.css';

export const Lobby = () => {
    const { scene } = useGLTF("models/lobby2.glb");
    const { gl } = useThree(); 
    const lightRef = useRef();
    const controls = useRef();
    const viewport = useThree((state) => state.viewport);
    const cameraReference = useRef();
    
    const hasAnimated = useRef(false); // This keeps track if the animation has run

    const animateCamera = (distFactor) => {
        const start = { x: 290.2, y: 299, z: 199.5 };
        const end = { x: 4.2, y: 4, z: 19.5 };

        // Animate camera movement with gsap
        gsap.to(start, {
            x: end.x,
            y: end.y,
            z: end.z,
            duration: 3,
            ease: "power2.inOut",
            onUpdate: () => {
                controls.current.setLookAt(
                    start.x * distFactor,
                    start.y * distFactor,
                    start.z * distFactor,
                    0,
                    0.2,
                    0,
                    true
                );
            },
            onComplete: () => {
                hasAnimated.current = true; // Mark animation as complete
            }
        });
    };

    const setCameraFinalPosition = (distFactor) => {
        controls.current.setLookAt(4.2 * distFactor, 4 * distFactor, 19.5 * distFactor, 0, 0.2, 0, true);
    };
// jancok ga selesai" ini camera bangsat ngent
    useEffect(() => {
        const distFactor = 10 / viewport.getCurrentViewport(cameraReference.current, new Vector3(0, 0, 0)).width;
        console.log("Distance Factor", distFactor);

        if (!hasAnimated.current) {
  
            controls.current.setLookAt(50.2 * distFactor, 19 * distFactor, 49.5 * distFactor, 0, 0.2, 0, true);
            animateCamera(distFactor);
        } else {
            setCameraFinalPosition(distFactor);
        }

        const onResize = () => {
            if (hasAnimated.current) {
                setCameraFinalPosition(distFactor); 
            }
        };
        
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [viewport]);

    const players = usePlayersList(true);

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

    const showTitleScreen = true;
    const titleText = "Google Store".split("");

    const modelScale = [1, 1, 1]; // Set your desired global scale here

    return (
        <>
            <PerspectiveCamera ref={cameraReference} position={[0, 1, 4]} />
            <group>
                <CameraControls ref={controls} />
                <ambientLight intensity={1} />
                <directionalLight
                    ref={lightRef}
                    intensity={2}
                    position={[50, 50, 50]}
                    castShadow
                    shadow-mapSize-width={4096}
                    shadow-mapSize-height={4096}
                    shadow-camera-near={0.5}
                    shadow-camera-far={40}
                />
                <primitive object={scene} />
                {players.map((player, index) => (
                    <group key={player.id} position={[index * 5, 0, 0]}>
                        <Pixel7 scale={modelScale} />
                    </group>
                ))}
                {showTitleScreen && (
                    <Html fullscreen>
                        <div className="centered-container">
                            {titleText.map((letter, index) => (
                                <MovingComponent
                                    key={index}
                                    type="blur"
                                    duration="5200ms"
                                    delay={`${index * 100}ms`}
                                    direction="normal"
                                    timing="ease"
                                    iteration="infinite"
                                    fillMode="none"
                                    style={{ display: 'inline-block' }}
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

useGLTF.preload("models/lobby2.glb");
