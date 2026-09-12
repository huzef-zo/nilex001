/**
 * Scene3D — persistent R3F canvas for the Nilex hero.
 *
 * Implements the contract from 3D-SCROLL-ARCHITECTURE-AGENT-SPEC.md §3b (r3f track):
 *   - Single persistent <Canvas>.
 *   - Per-frame state in useRef (no useState for per-frame values).
 *   - All interpolation in useFrame via THREE.MathUtils.lerp / damp.
 *   - Mobile degradation: capped DPR, simpler scene, no post-processing.
 *   - Cleanup: geometries/materials disposed on unmount.
 *
 * The scene is a stylized Nilex "N" — three flowing ribbons that form
 * the diagonal stroke of the letter, suspended in a navy void. The
 * camera dollies toward the mark as the user scrolls past the hero,
 * and the ribbons rotate slowly with a scroll-driven tilt.
 */
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useNilex } from "@/store/navigation";

/* -------------------------------------------------------------------------- */
/* Ribbon geometry — a flat tube following a CatmullRom curve                 */
/* -------------------------------------------------------------------------- */

function makeRibbonGeometry(points: THREE.Vector3[], width = 0.4, segments = 200) {
  const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
  const tube = new THREE.TubeGeometry(curve, segments, 0.06, 12, false);
  // Add a flat ribbon strip alongside.
  const ribbonPoints: THREE.Vector3[] = [];
  const tangetFrames: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPointAt(t);
    const tan = curve.getTangentAt(t).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const side = new THREE.Vector3().crossVectors(tan, up).normalize().multiplyScalar(width);
    ribbonPoints.push(p.clone().add(side));
    tangetFrames.push(tan);
  }
  // Build a flat strip
  const positions: number[] = [];
  const uvs: number[] = [];
  for (let i = 0; i < segments; i++) {
    const a = ribbonPoints[i];
    const b = ribbonPoints[i + 1];
    const c = curve.getPointAt(i / segments);
    const d = curve.getPointAt((i + 1) / segments);
    positions.push(a.x, a.y, a.z, c.x, c.y, c.z, b.x, b.y, b.z);
    positions.push(b.x, b.y, b.z, c.x, c.y, c.z, d.x, d.y, d.z);
    uvs.push(0, i / segments, 0.5, i / segments, 1, i / segments);
    uvs.push(1, i / segments, 0.5, i / segments, 1, (i + 1) / segments);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  // Merge with tube for vertex count
  return { tube, ribbon: geom, curve };
}

/* -------------------------------------------------------------------------- */
/* Nilex "N" — three diagonal ribbons forming the N stroke                     */
/* -------------------------------------------------------------------------- */

function NilexMark() {
  const group = useRef<THREE.Group>(null);
  const ribbons = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);
  const { size } = useThree();

  // Build three "N" stroke curves. The Nilex mark reads as an N
  // with sweeping curved strokes — we approximate with three
  // CatmullRom ribbons at slight offsets.
  const geometries = useMemo(() => {
    const N = 3;
    const list: { tube: THREE.TubeGeometry; ribbon: THREE.BufferGeometry; curve: THREE.CatmullRomCurve3 }[] = [];
    for (let i = 0; i < N; i++) {
      const offset = (i - (N - 1) / 2) * 0.18;
      const points = [
        new THREE.Vector3(-1.2 + offset, 1.6, 0),
        new THREE.Vector3(-0.6 + offset, 0.8, 0.2),
        new THREE.Vector3(0.1 + offset, 0.0, -0.15),
        new THREE.Vector3(0.7 + offset, -0.8, 0.1),
        new THREE.Vector3(1.2 + offset, -1.6, 0),
      ];
      list.push(makeRibbonGeometry(points, 0.32 + i * 0.06, 220));
    }
    return list;
  }, []);

  // Materials
  const materials = useMemo(() => {
    const gold = new THREE.MeshStandardMaterial({
      color: "#d9be84",
      metalness: 0.85,
      roughness: 0.25,
      emissive: "#3a2c14",
      emissiveIntensity: 0.4,
    });
    const goldSoft = new THREE.MeshStandardMaterial({
      color: "#c8a961",
      metalness: 0.6,
      roughness: 0.4,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    return { gold, goldSoft };
  }, []);

  // Track scroll progress (only while hero is in view).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = document.getElementById("nilex-hero");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 at top of hero entering viewport from bottom,
      // 1 when hero has fully scrolled off the top.
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height + vh)));
      scrollRef.current = progress;
      // Drive rotation target based on progress.
      targetRotY.current = progress * Math.PI * 0.8;
      targetRotX.current = progress * 0.3;
    };
    const loop = () => {
      update();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Animate per-frame. Per spec §3b: all per-frame values in refs,
  // interpolation via damp (lerp-with-time).
  useFrame((_, delta) => {
    const t = performance.now() * 0.001;
    if (!group.current) return;

    // Idle slow rotation
    group.current.rotation.y += delta * 0.07;
    group.current.rotation.z = Math.sin(t * 0.3) * 0.05;

    // Scroll-driven tilt (lerp toward target).
    const lerpFactor = 1 - Math.pow(0.001, delta);
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetRotX.current,
      4,
      delta
    );

    // Camera-z tilt on the ribbons
    if (ribbons.current) {
      const scale = 1 - scrollRef.current * 0.4;
      ribbons.current.scale.setScalar(scale);
      ribbons.current.position.z = -scrollRef.current * 2;
      // Subtle wave
      ribbons.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.rotation.z = Math.sin(t * 0.4 + i) * 0.04;
      });
    }

    // Slightly oscillate emissive intensity for a "breathing" feel.
    // R3F materials are 3D objects — direct mutation is the intended pattern.
    // eslint-disable-next-line react-hooks/immutability
    materials.gold.emissiveIntensity = 0.3 + Math.sin(t * 0.6) * 0.1;
    void lerpFactor;
  });

  // Cleanup geometry / materials on unmount (spec §4 step 9).
  useEffect(() => {
    return () => {
      geometries.forEach((g) => {
        g.tube.dispose();
        g.ribbon.dispose();
      });
      materials.gold.dispose();
      materials.goldSoft.dispose();
    };
  }, []);

  // Scale the mark down on small screens for composition.
  const scale = size.width < 768 ? 0.62 : 1;

  return (
    <group ref={group} scale={scale}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={ribbons}>
          {geometries.map((g, i) => (
            <group key={i}>
              <mesh geometry={g.tube} material={i === 1 ? materials.gold : materials.goldSoft} />
              <mesh geometry={g.ribbon} material={materials.goldSoft} />
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Particles — a sparse starfield for depth                                   */
/* -------------------------------------------------------------------------- */

function Particles({ count = 240 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const m = new THREE.PointsMaterial({
      color: "#d9be84",
      size: 0.025,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: g, material: m };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.005;
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* -------------------------------------------------------------------------- */
/* Scene wrapper                                                               */
/* -------------------------------------------------------------------------- */

function Scene() {
  const { gl } = useThree();
  const isMobile = useNilex((s) => s.isMobile);

  useEffect(() => {
    // Spec §5: cap DPR on mobile.
    gl.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  }, [gl, isMobile]);

  // Idle camera drift toward a lerp target (spec: lerp, never snap).
  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, 0, 1.5, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 0, 1.5, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 5.5, 1.5, delta);
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.45} color="#6b8cff" />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#f4f1ea" />
      <pointLight position={[-3, -2, 3]} intensity={0.6} color="#c8a961" />
      <NilexMark />
      <Particles count={isMobile ? 120 : 280} />
      <Environment preset="night" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Canvas wrapper — persistent for the full session (spec §3a: must NOT       */
/* recreate the canvas per section). Mounted at the top level.                */
/* -------------------------------------------------------------------------- */

export default function Scene3D({ visible }: { visible: boolean }) {
  const isMobile = useNilex((s) => s.isMobile);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <Canvas
        className="pointer-events-none"
        camera={{ fov: 50, position: [0, 0, 5.5], near: 0.1, far: 100 }}
        // dpr as a [min, max] tuple — R3F handles capping against
        // window.devicePixelRatio automatically. No state needed.
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
