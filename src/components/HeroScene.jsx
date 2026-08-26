import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function HeroScene({ width, height }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width, height }}
      resize={{ scroll: false }}
    >
      <Sparkles count={70} scale={[6, 4, 3]} size={2.5} speed={0.2} color="#b8924d" opacity={0.55} />
    </Canvas>
  );
}
