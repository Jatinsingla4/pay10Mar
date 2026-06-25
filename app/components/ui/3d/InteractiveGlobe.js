"use client";

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Helper function to convert Latitude and Longitude to a 3D Vector on the sphere
const latLongToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const GlobeMesh = () => {
  const meshRef = useRef();
  
  // Load the Earth mask (White = Oceans, Black = Land)
  const alphaMap = useTexture('/images/earth-specular.jpg');

  useFrame(() => {
    if (!meshRef.current) return;
    // Slow continuous auto-rotation
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={meshRef}>
      {/* Inner Sphere: Solid Orange Land */}
      <Sphere args={[2.38, 64, 64]}>
        <meshStandardMaterial color="#ff7a33" roughness={0.8} />
      </Sphere>

      {/* Outer Sphere: Light Grey Oceans with transparent land cutouts */}
      <Sphere args={[2.4, 64, 64]}>
        <meshStandardMaterial
          color="#dbe0e3" // Light grey for oceans
          alphaMap={alphaMap}
          transparent={true}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>

      {/* Dubai Pinpoint (Lat: 25.2048, Lon: 55.2708) */}
      <group position={latLongToVector3(25.2048, 55.2708, 2.42)}>
        {/* Core Dot */}
        <mesh>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
        {/* Glowing Halo */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ff0000" transparent={true} opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
};

export default function InteractiveGlobe() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'auto', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Suspense fallback={null}>
          <GlobeMesh />
        </Suspense>
        {/* OrbitControls allows dragging the globe 360 degrees on click */}
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
