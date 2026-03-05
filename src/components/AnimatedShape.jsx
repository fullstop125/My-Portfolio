import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const NetworkCluster = () => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Generate random points for our "network nodes"
  const nodes = useMemo(() => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ));
    }
    return points;
  }, []);

  // Create line segments connecting the nodes
  const lines = useMemo(() => {
    const segments = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Connect nodes if they are somewhat close to each other to create a web
        if (nodes[i].distanceTo(nodes[j]) < 3.5) {
          segments.push([nodes[i], nodes[j]]);
        }
      }
    }
    return segments;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth slow rotation of the entire network
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x += 0.001;

    // Pulse effect on hover
    const targetScale = hovered ? 1.1 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
  });

  return (
    <Float
      speed={1.5} 
      rotationIntensity={0.5} 
      floatIntensity={1}
    >
      <group 
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Render the lines connecting the nodes */}
        {lines.map((line, index) => (
          <Line
            key={`line-${index}`}
            points={line}
            color={hovered ? "#ff1ead" : "#6070ff"}
            lineWidth={hovered ? 2 : 1.5}
            transparent
            opacity={hovered ? 0.8 : 0.4}
          />
        ))}

        {/* Render the nodes */}
        {nodes.map((pos, index) => (
          <Sphere key={`node-${index}`} position={pos} args={[hovered ? 0.25 : 0.2, 16, 16]}>
            <meshStandardMaterial 
              color={index === 0 ? "#ff1ead" : "#6070ff"} // Make one node an "origin" color
              emissive={index === 0 ? "#ff1ead" : "#6070ff"}
              emissiveIntensity={hovered ? 1.5 : 0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        ))}

        {/* Center core */}
        <Sphere position={[0,0,0]} args={[hovered ? 0.6 : 0.5, 32, 32]}>
          <meshPhysicalMaterial 
            color="#22c1c3"
            transmission={0.9}
            opacity={1}
            metalness={0}
            roughness={0}
            ior={1.5}
            thickness={2}
          />
        </Sphere>
      </group>
    </Float>
  );
};

export default NetworkCluster;