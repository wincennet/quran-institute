import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { REACHED_COUNTRIES } from "../lib/constants";

export default function GlobalReachGlobe({ autoRotate }) {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState(320);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 320;
      setSize(Math.min(width, 460));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.pointOfView({ lat: 25, lng: 30, altitude: 2.1 }, 0);
    const controls = globe.controls();
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
  }, [autoRotate]);

  const globeMaterial = new THREE.MeshPhongMaterial({
    color: "#4e4136",
    shininess: 6,
  });

  return (
    <div ref={containerRef} className="flex justify-center">
      <Globe
        ref={globeRef}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor="#b8924d"
        atmosphereAltitude={0.2}
        pointsData={REACHED_COUNTRIES}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.02}
        pointRadius={0.4}
        pointColor={() => "#e8dcc6"}
        pointLabel={(d) => d.name}
      />
    </div>
  );
}
