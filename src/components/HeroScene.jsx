import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Svg } from "@react-three/drei";
import { ROSETTE_SVG } from "../lib/rosettePaths";

// Islamic arabesque rosette motif (provided reference design), rendered as
// real 3D geometry via the SVG stroke paths and slowly rotated — echoes
// "geometry and light in motion" without any occult-adjacent symbolism.
function RosetteMotif() {
  const groupRef = useRef(null);
  const scale = 0.02;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.8]}>
      <Svg
        src={ROSETTE_SVG}
        scale={scale}
        position={[-100 * scale, 100 * scale, 0]}
        strokeMaterial={{ opacity: 0.3 }}
      />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <RosetteMotif />
      <Sparkles count={70} scale={[6, 4, 3]} size={2.5} speed={0.2} color="#b8924d" opacity={0.55} />
    </Canvas>
  );
}
