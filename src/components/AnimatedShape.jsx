import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Base rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;
    
    // Smoothly interpolate scale on hover
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float
      speed={2.5} 
      rotationIntensity={1.5} 
      floatIntensity={2}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={1}
      >
        <icosahedronGeometry args={[2, 4]} />
        <MeshDistortMaterial
          color={hovered ? "#4053fc" : "#6070ff"}
          envMapIntensity={1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          metalness={0.2}
          roughness={0.1}
          distort={0.4}
          speed={2}
          wireframe={hovered}
        />
      </mesh>
    </Float>
  );
};

export default AnimatedShape;
