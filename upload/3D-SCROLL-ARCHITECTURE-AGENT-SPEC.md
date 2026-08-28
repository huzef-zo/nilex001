# 3D Scroll Experience — Agent Implementation Directive

> **Audience:** AI coding agents (Claude Code, Cursor, Copilot Workspace, etc.)
> **Purpose:** This document is a binding implementation contract, not a suggestion. Every `MUST` / `MUST NOT` is a hard requirement. Any generated code that violates a `MUST` is non-compliant and must be revised before being presented as done.
> **Source material:** Synthesized from *"Architecting Award-Winning 3D Scroll Experiences: A Dual Implementation Guide with Vanilla Three.js and React Three Fiber."*

---

## 0. How to use this file

1. Read Section 1 to pick a track: `vanilla` or `r3f`.
2. Load the matching JSON config block for that track (Section 3) and treat its keys as required setup parameters — do not invent alternate values without a stated reason.
3. Work through Section 4 (build order) top to bottom. Do not skip the scroll-sync step — it is the single most common failure mode in this stack.
4. Before declaring the task complete, run every item in the Section 7 JSON checklist and report pass/fail for each.

---

## 1. Stack Decision

| If the project... | Track | Why |
|---|---|---|
| Is a React app, or the user asked for React/Next.js | `r3f` | Declarative scene graph, `useFrame` avoids manual render-loop bugs, easier DOM↔3D state sharing |
| Has no framework, or explicitly says "vanilla" / "no React" | `vanilla` | Full manual control, no React reconciler overhead, works outside any framework |
| Is unspecified | `r3f` | Default — safer for maintainability unless the user pushes back |

An agent **MUST NOT** mix the two tracks inside one component tree (e.g. manually calling `renderer.render()` inside an R3F `<Canvas>`). Pick one and stay inside it.

---

## 2. Required Dependency Stack

The agent **MUST** install and wire up all four layers below — omitting any one of them (especially Lenis or ScrollTrigger's scroller proxy) is the top cause of the "laggy DOM vs. smooth 3D" bug class described in Section 6.

```json
{
  "stack_layers": [
    {
      "layer": "render_engine",
      "package": "three",
      "role": "WebGL abstraction — scene graph, cameras, materials, geometries",
      "required": true
    },
    {
      "layer": "react_binding",
      "package": "@react-three/fiber",
      "role": "React renderer for Three.js scenes",
      "required_if_track": "r3f"
    },
    {
      "layer": "react_helpers",
      "package": "@react-three/drei",
      "role": "Prebuilt helpers: Environment, shaderMaterial, ScrollControls, Html",
      "required_if_track": "r3f"
    },
    {
      "layer": "animation_orchestration",
      "package": "gsap",
      "submodule": "gsap/ScrollTrigger",
      "role": "Binds animation timelines to scroll position; pin/scrub/snap",
      "required": true
    },
    {
      "layer": "smooth_scroll",
      "package": "lenis",
      "role": "Replaces native scroll with lerp-based smooth scroll; feeds ScrollTrigger a clean progress stream",
      "required": true
    },
    {
      "layer": "asset_format",
      "format": "glTF/.glb",
      "compression": ["draco", "ktx2_basis"],
      "role": "Compressed 3D asset delivery; mesh via Draco, textures via KTX2/Basis",
      "required": true
    },
    {
      "layer": "post_processing",
      "package": "postprocessing",
      "react_wrapper": "@react-three/postprocessing",
      "role": "Bloom, DOF, vignette, color grading",
      "required": false,
      "condition": "only if the design calls for cinematic effects; MUST be disabled on mobile per Section 5"
    },
    {
      "layer": "global_state",
      "package": "zustand",
      "role": "Cross-component 3D state without prop drilling",
      "required": false,
      "condition": "only if more than ~3 components need to share live scroll/scene state"
    }
  ]
}
```

---

## 3. Track Configuration

### 3a. `vanilla` track config

```json
{
  "track": "vanilla",
  "scene_setup": {
    "objects_required": ["THREE.Scene", "THREE.PerspectiveCamera", "THREE.WebGLRenderer"],
    "camera_defaults": { "fov": 75, "near": 0.1, "far": 1000 },
    "renderer_pixel_ratio": "Math.min(window.devicePixelRatio, 2)",
    "canvas_lifecycle": "single persistent canvas for the full session — MUST NOT be recreated on section change"
  },
  "render_loop": {
    "driver": "requestAnimationFrame",
    "must_call": "renderer.render(scene, camera)",
    "state_storage": "plain JS variables or a small module-level state object",
    "interpolation": "THREE.Vector3.lerp / THREE.Euler.lerp toward a target updated by the scroll listener"
  },
  "resize_handling": {
    "event": "window resize",
    "must_update": ["renderer.setSize", "camera.aspect", "camera.updateProjectionMatrix()"]
  }
}
```

### 3b. `r3f` track config

```json
{
  "track": "r3f",
  "scene_setup": {
    "root_component": "<Canvas>",
    "camera_prop_example": { "fov": 75, "position": [0, 0, 5] },
    "lighting_via": "@react-three/drei components, e.g. <ambientLight />, <Environment map={hdri} />"
  },
  "state_rules": {
    "per_frame_values": {
      "hook": "useRef",
      "reason": "mutating .current does not trigger a React re-render",
      "applies_to": ["camera position", "object transforms", "scroll progress"]
    },
    "discrete_ui_values": {
      "hook": "useState",
      "reason": "acceptable only for infrequent, meaningful state changes",
      "applies_to": ["visibility toggles", "material swaps", "menu open/close"]
    },
    "cross_component_state": {
      "hook": "zustand store",
      "condition": "when more than a few components need the same live value"
    }
  },
  "animation_hook": {
    "name": "useFrame",
    "signature": "(state, delta) => { ... }",
    "must_contain": "all per-frame interpolation logic (camera lerp, rotation, shader uniform updates)",
    "must_not_contain": "setState calls on values that change every frame"
  }
}
```

---

## 4. Build Order (do not reorder)

1. **Scaffold the persistent canvas.** Vanilla: instantiate Scene/Camera/Renderer once outside any per-route logic. R3F: mount a single top-level `<Canvas>`.
2. **Install and start Lenis first**, before touching ScrollTrigger. Lenis must own scroll before GSAP is told about it.
3. **Register the ScrollTrigger scroller proxy immediately after Lenis starts:**
   ```js
   ScrollTrigger.scrollerProxy(document.body, {
     scrollTop(value) {
       return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
     },
     getBoundingClientRect() {
       return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
     },
   });
   ```
   This step is **not optional**. Skipping it is the #1 cause of DOM-vs-3D desync (see Section 6, Pitfall 1).
4. **Sync Lenis's `requestAnimationFrame` loop with GSAP's ticker** so both run on the same clock:
   ```js
   gsap.ticker.add((time) => lenis.raf(time * 1000));
   gsap.ticker.lagSmoothing(0);
   ```
5. **Define GSAP timelines with `scrollTrigger: { scrub: true, trigger, start, end }`** for each scroll-driven section. Do not drive camera transforms directly off raw scroll events — always go through GSAP/ScrollTrigger or a stored progress ref.
6. **Interpolate, never snap.** Every camera/object transform update MUST use `lerp` (or equivalent) toward a target value inside the render loop / `useFrame`, not an immediate assignment.
7. **Load and compress assets** per the pipeline in Section 5 before wiring them into the scene.
8. **Add mobile degradation branches** (Section 5) before considering the build feature-complete.
9. **Add disposal/cleanup** for every geometry, material, and texture on unmount (R3F: `useEffect` cleanup; vanilla: explicit teardown function).

---

## 5. Asset Pipeline & Performance Requirements

```json
{
  "asset_pipeline": {
    "export_format": "glb",
    "geometry_compression": {
      "method": "draco",
      "tool": "gltf-transform",
      "target_reduction": "up to 90% mesh size",
      "preferred_mode": "pre-compress offline, not runtime decode"
    },
    "texture_compression": {
      "formats": ["KTX2", "Basis Universal"],
      "reason": "GPU-native decode, avoids CPU decompression cost"
    }
  },
  "desktop_defaults": {
    "device_pixel_ratio": "native (window.devicePixelRatio)",
    "post_processing": "enabled",
    "model_detail": "full polygon count or LOD-high",
    "textures": "full resolution compressed"
  },
  "mobile_degradation_rules": [
    {
      "rule": "cap_dpr",
      "value": "Math.min(window.devicePixelRatio, 2)",
      "always_apply": true
    },
    {
      "rule": "disable_post_processing",
      "condition": "screen width below breakpoint OR low-power device detected",
      "action": "do not mount EffectComposer / react-postprocessing tree"
    },
    {
      "rule": "level_of_detail",
      "action": "use THREE.LOD or swap to lower-poly model variants by distance/screen size",
      "note": "Three.js keeps all LOD levels resident in GPU memory — the win is reduced vertex processing, not memory"
    },
    {
      "rule": "fallback_to_static",
      "condition": "extremely low-powered device",
      "action": "replace the 3D canvas with a static image or video background"
    },
    {
      "rule": "draw_call_batching",
      "action": "use InstancedMesh for any repeated geometry (particles, foliage, grids)"
    }
  ]
}
```

---

## 6. Pitfalls the Agent MUST Actively Guard Against

1. **Scroll desync** — ScrollTrigger listening to native scroll while Lenis owns the real scroll. Fix: `ScrollTrigger.scrollerProxy()` wired to Lenis (Section 4, step 3). Never skip this when Lenis is present.
2. **Render-loop misuse in R3F** — calling `renderer.render()` manually, or putting per-frame logic in `useEffect`. Fix: all continuous updates go in `useFrame`; `useEffect` is for mount/dependency-triggered setup only.
3. **`useState` for per-frame values** — causes 60/sec re-renders. Fix: `useRef` for anything that changes every frame; interpolate inside `useFrame`.
4. **Unoptimized assets** — raw `.obj`/`.mtl` or uncompressed textures shipped to production. Fix: enforce the Section 5 pipeline before merging.
5. **Memory leaks** — geometries/materials/textures never disposed on unmount. Fix: explicit `.dispose()` calls in cleanup functions for every created resource.

---

## 7. Pre-Completion Checklist (agent must self-verify)

```json
{
  "verification_checklist": [
    { "id": "single_persistent_canvas", "must_be": true },
    { "id": "lenis_initialized_before_scrolltrigger", "must_be": true },
    { "id": "scrollerProxy_configured", "must_be": true },
    { "id": "gsap_ticker_synced_to_lenis_raf", "must_be": true },
    { "id": "all_scroll_animations_use_scrub_true", "must_be": true },
    { "id": "all_transform_updates_use_lerp_not_direct_assignment", "must_be": true },
    { "id": "per_frame_state_uses_useRef_not_useState", "must_be": true, "applies_to_track": "r3f" },
    { "id": "manual_render_calls_absent_in_r3f_tree", "must_be": true, "applies_to_track": "r3f" },
    { "id": "assets_are_glb_with_draco_and_ktx2", "must_be": true },
    { "id": "dpr_capped_at_2_on_mobile", "must_be": true },
    { "id": "post_processing_conditionally_disabled_on_mobile", "must_be": true },
    { "id": "resize_listener_updates_renderer_and_camera_aspect", "must_be": true },
    { "id": "dispose_called_on_unmount_for_geometries_materials_textures", "must_be": true }
  ]
}
```

Any `false` result on this list **MUST** be fixed before the task is reported as done — do not present partial compliance as complete.

---

## 8. Reference

Synthesized from: *Architecting Award-Winning 3D Scroll Experiences: A Dual Implementation Guide with Vanilla Three.js and React Three Fiber* (source PDF, Aug 2026 compilation). Core external docs for deeper lookup: threejs.org/docs, r3f.docs.pmnd.rs, gsap.com/docs/v3/Plugins/ScrollTrigger, github.com/darkroomengineering/lenis.
