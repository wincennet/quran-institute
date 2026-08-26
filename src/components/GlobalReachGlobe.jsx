import { useEffect, useMemo, useRef, useState } from "react";
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

    const scene = globe.scene();
    const key = new THREE.DirectionalLight(0xf2ead9, 1.4);
    key.position.set(-2, 1.5, 2);
    const fill = new THREE.AmbientLight(0xb8924d, 0.55);
    scene.add(key);
    scene.add(fill);

    return () => {
      scene.remove(key);
      scene.remove(fill);
    };
  }, [autoRotate]);

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#5c4a34",
        specular: new THREE.Color("#e8c98a"),
        shininess: 18,
      }),
    []
  );

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
        atmosphereAltitude={0.22}
        showGraticules
        pointsData={REACHED_COUNTRIES}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.015}
        pointRadius={0.5}
        pointColor={() => "#f5deab"}
        pointLabel={(d) => d.name}
        ringsData={REACHED_COUNTRIES}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t) => `rgba(245, 222, 171, ${1 - t})`}
        ringMaxRadius={2.2}
        ringPropagationSpeed={1.4}
        ringRepeatPeriod={2600}
      />
    </div>
  );
}
