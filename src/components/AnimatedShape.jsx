import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Torus, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CyberCore = () => {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    // 1. Parallax effect: The entire security system tilts to face the mouse
    const targetX = (mouse.x * viewport.width) / 15;
    const targetY = (mouse.y * viewport.height) / 15;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);

    // 2. Dynamic Rotation: Rings spin like encryption tumblers. Speed increases drastically on hover (Breach / Processing mode)
    const speed = hovered ? 4 : 0.5;
    ring1Ref.current.rotation.x += 0.01 * speed;
    ring1Ref.current.rotation.y += 0.005 * speed;
    
    ring2Ref.current.rotation.y += 0.015 * speed;
    ring2Ref.current.rotation.z += 0.01 * speed;
    
    ring3Ref.current.rotation.x -= 0.01 * speed;
    ring3Ref.current.rotation.z -= 0.015 * speed;

    // 3. Core Pulsing: The central "data core" breathes.
    const pulse = hovered 
      ? 1.2 + Math.sin(state.clock.elapsedTime * 15) * 0.08  // Fast aggressive pulse
      : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;    // Slow steady breathing
    
    coreRef.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group 
        ref={groupRef} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        scale={0.9}
      >
        
        {/* Layer 1: Inner Authentication Ring */}
        <Torus ref={ring1Ref} args={[1.8, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color={hovered ? "#ff1ead" : "#22c1c3"} 
            emissive={hovered ? "#ff1ead" : "#22c1c3"} 
            emissiveIntensity={hovered ? 2 : 0.8} 
            wireframe 
          />
        </Torus>

        {/* Layer 2: Firewall Ring */}
        <Torus ref={ring2Ref} args={[2.3, 0.03, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
          <meshStandardMaterial 
            color={hovered ? "#22c1c3" : "#6070ff"} 
            emissive={hovered ? "#22c1c3" : "#6070ff"} 
            emissiveIntensity={hovered ? 1.5 : 0.5} 
            wireframe 
          />
        </Torus>

        {/* Layer 3: Outer Data Orbit */}
        <Torus ref={ring3Ref} args={[2.8, 0.06, 8, 60]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial 
            color={hovered ? "#6070ff" : "#172b4d"} 
            emissive={hovered ? "#6070ff" : "#172b4d"} 
            emissiveIntensity={hovered ? 2 : 0.5} 
            wireframe={!hovered} 
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>

        {/* The Core: Protected Data / App Logic */}
        <Icosahedron ref={coreRef} args={[1.1, 3]}>
          <MeshDistortMaterial 
            color={hovered ? "#0f172a" : "#4053fc"} 
            emissive={hovered ? "#ff1ead" : "#172b4d"}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            distort={hovered ? 0.8 : 0.3} 
            speed={hovered ? 6 : 2} 
            wireframe={hovered} 
            roughness={0.2}
            metalness={0.8}
          />
        </Icosahedron>
        
        {/* The Cyber Shield: Global Perimeter */}
        <Sphere args={[3.2, 32, 32]}>
          <meshPhysicalMaterial 
            color="#22c1c3"
            transmission={0.9}
            opacity={hovered ? 0.15 : 0.05}
            transparent
            roughness={0.1}
            metalness={0.2}
            wireframe
          />
        </Sphere>

      </group>
    </Float>
  );
};

export default CyberCore;
