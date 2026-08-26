import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { feature } from "topojson-client";
import landTopo from "world-atlas/land-110m.json";
import { REACHED_COUNTRIES } from "../lib/constants";

const LAND_FEATURES = feature(landTopo, landTopo.objects.land).features;

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

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#f2ead9",
        shininess: 12,
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
        atmosphereColor="#9c7a3c"
        atmosphereAltitude={0.14}
        polygonsData={LAND_FEATURES}
        polygonCapColor={() => "#6b5642"}
        polygonSideColor={() => "rgba(107, 86, 66, 0.6)"}
        polygonStrokeColor={() => "#e8c98a"}
        polygonAltitude={0.004}
        pointsData={REACHED_COUNTRIES}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.015}
        pointRadius={0.55}
        pointColor={() => "#e8c98a"}
        pointLabel={(d) => d.name}
        ringsData={REACHED_COUNTRIES}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t) => `rgba(184, 146, 77, ${1 - t})`}
        ringMaxRadius={2.2}
        ringPropagationSpeed={1.4}
        ringRepeatPeriod={2600}
      />
    </div>
  );
}
