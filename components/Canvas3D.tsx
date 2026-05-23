'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// @ts-expect-error maath doesn't have perfect TS definitions
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleSwarm(props: any) {
  const ref = useRef<THREE.Points>(null);
  
  // FIX: Multiply by 3 so every point gets an exact [x, y, z] coordinate!
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#00ffa3" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function Canvas3D() {
  return (
    <div className="w-full h-full absolute inset-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}