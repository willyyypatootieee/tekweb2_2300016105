import { Clone, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useMemo } from "react";
import { MeshStandardMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from 'three';


export const ANIMALS_MODELS = [
    "Cat",
    "Raccoon",
    "German Shepard",
    "Sheep",
];

export const Animals = ({
    model = ANIMALS_MODELS[0],
    ...props
}) => {

    const group = useRef();
    const { scene, animations } = useGLTF(`/models/animals/${model}.glb`);
    const { actions } = useAnimations(animations, group);
    
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

    useEffect(() => {
        // Log available animations
        console.log(`Available animations for ${model}:`);
        animations.forEach((clip) => console.log(clip.name));

        // Play the idle animation as the default
        if (actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]) {
            actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]
                .reset()
                .setLoop(THREE.LoopRepeat)
                .fadeIn(0.5)
                .play();
        }

        // Modify the clone, not the original scene
        clone.traverse((child) => {
            if (child.isMesh) {
                // Enable shadows for each mesh
                child.castShadow = true;
                child.receiveShadow = true;

            // Preserve the original material's textures (if any) when creating the new material
            const originalMaterial = child.material;

            const newMaterial = new MeshStandardMaterial({
                color: originalMaterial.color,
                map: originalMaterial.map,                // Diffuse map (main texture)
                normalMap: originalMaterial.normalMap,    // Normal map (if any)
                roughnessMap: originalMaterial.roughnessMap, // Roughness map
                metalnessMap: originalMaterial.metalnessMap, // Metalness map
                roughness: originalMaterial.roughness,    // Preserve roughness
                metalness: originalMaterial.metalness,    // Preserve metalness
            });

            // Replace the original material with the new one
            child.material = newMaterial;
        }
    });

        return () => {
            // Cleanup: stop the idle animation when unmounting
            if (actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]) {
                actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"].fadeOut(0.5);
            }
        };
    }, [actions, clone, model]);

    // Group Character
    return (
        <group ref={group} {...props} rotation-y={degToRad(0)}>
            <primitive object={clone} />
        </group>
    );
};

ANIMALS_MODELS.forEach((model) => {
    useGLTF.preload(`/models/animals/${model}.glb`);
});
