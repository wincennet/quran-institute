import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef } from "react";

// Kufic-inspired geometric motif: an octahedron wireframe, echoing the
// squared/architectural letterforms of the institute's logo, rotating slowly.
function GeometricMotif() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} scale={2.6}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#b8924d" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <GeometricMotif />
      <Sparkles count={60} scale={[6, 4, 3]} size={2.5} speed={0.25} color="#b8924d" opacity={0.6} />
    </Canvas>
  );
}
