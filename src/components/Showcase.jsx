import { Clone, useAnimations, useGLTF } from "@react-three/drei"; 
import { useRef, useMemo, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import { SkeletonUtils } from "three-stdlib";

export const Pixel7 = ({ scale = [1, 1, 1], ...props }) => { // Accept scale prop
    const group = useRef();
    const { scene, animations } = useGLTF('/models/google.glb');
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { actions } = useAnimations(animations, group);

    // Enable shadows for each mesh in the clone
    clone.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const originalMaterial = child.material;

            const newMaterial = new MeshStandardMaterial({
                color: originalMaterial.color,
                map: originalMaterial.map,
                normalMap: originalMaterial.normalMap,
                roughnessMap: originalMaterial.roughnessMap,
                metalnessMap: originalMaterial.metalnessMap,
                roughness: originalMaterial.roughness,
                metalness: originalMaterial.metalness,
            });

            child.material = newMaterial;
        }
    });


    useEffect(() => {
        if (animations) {
            actions?.Idle?.play(); // Play the Idle animation
        }
    }, [animations, actions]);

    return (
        <group ref={group} {...props}>
            <primitive object={clone} castShadow receiveShadow />
        </group>
    );
};

// Preload the Pixel 7 model
useGLTF.preload('/models/google.glb');
