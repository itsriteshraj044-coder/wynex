import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Orb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.5, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.4, 0.05);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1.35, 96, 96]}>
        <MeshDistortMaterial
          distort={0.42}
          speed={1.6}
          roughness={0.05}
          metalness={0.6}
          color="#6366f1"
          emissive="#8b5cf6"
          emissiveIntensity={0.25}
        />
      </Sphere>
    </Float>
  );
}

function GlassRing({ radius, tilt, ...props }: { radius: number; tilt: number } & ThreeElements['mesh']) {
  return (
    <mesh rotation={[tilt, 0, 0]} {...props}>
      <torusGeometry args={[radius, 0.012, 16, 128]} />
      <meshStandardMaterial color="#38bdf8" emissive="#06b6d4" emissiveIntensity={0.6} transparent opacity={0.7} />
    </mesh>
  );
}

function Particles({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#8b5cf6" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Lightweight interactive 3D hero: distorted iridescent orb, orbit rings and particles. */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={2} color="#06b6d4" />
        <pointLight position={[3, 3, 2]} intensity={1.6} color="#8b5cf6" />
        <Orb />
        <GlassRing radius={2} tilt={1.2} />
        <GlassRing radius={2.4} tilt={-0.6} />
        <Particles />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
