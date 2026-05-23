"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type NotebookSceneProps = {
  className?: string;
};

const MODEL_PATH = "/images/3d/notebook.glb";
const TEAL = 0x14b8a6;
const WHITE = 0xffffff;
const BODY_COLOR = 0x5a7390;
const KEYBOARD_COLOR = 0x3f4f63;
const PRESENTATION_ANGLE = Math.PI / 5;
const MODEL_TARGET_SIZE = 3;
const DISPLAY_ZOOM = 1.575;
const CAMERA_PADDING = 1.85;

type ParticleOrbit = {
  radius: number;
  theta: number;
  phi: number;
  speed: number;
};

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (
      child instanceof THREE.Mesh ||
      child instanceof THREE.Points ||
      child instanceof THREE.Line ||
      child instanceof THREE.LineLoop
    ) {
      child.geometry.dispose();
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial && material.map) {
          material.map.dispose();
        }
        material.dispose();
      });
    }
  });
}

function getMeshBoundingBox(object: THREE.Object3D) {
  const box = new THREE.Box3();
  let hasMesh = false;

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const meshBox = new THREE.Box3().setFromObject(child);
    if (!hasMesh) {
      box.copy(meshBox);
      hasMesh = true;
    } else {
      box.union(meshBox);
    }
  });

  return hasMesh ? box : new THREE.Box3().setFromObject(object);
}

function createCodeScreenTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    const fallback = new THREE.DataTexture(new Uint8Array([15, 23, 42, 255]), 1, 1);
    fallback.colorSpace = THREE.SRGBColorSpace;
    fallback.needsUpdate = true;
    return fallback;
  }

  const bg = ctx.createLinearGradient(0, 0, 640, 400);
  bg.addColorStop(0, "#0c1222");
  bg.addColorStop(1, "#162033");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 640, 400);

  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, 640, 34);

  const dots = ["#ef4444", "#eab308", "#22c55e"];
  dots.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(18 + i * 18, 17, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#14b8a6";
  ctx.font = "600 13px monospace";
  ctx.fillText("portfolio.tsx", 72, 22);

  const lines: { text: string; color: string; x: number; y: number }[] = [
    { text: "const dev = {", color: "#94a3b8", x: 28, y: 68 },
    { text: '  name: "Mathias Pereira",', color: "#e2e8f0", x: 44, y: 96 },
    { text: '  role: "Frontend Developer",', color: "#5eead4", x: 44, y: 124 },
    { text: '  stack: ["React", "Next.js", "Node"],', color: "#93c5fd", x: 44, y: 152 },
    { text: "};", color: "#94a3b8", x: 28, y: 180 },
    { text: "", color: "#94a3b8", x: 28, y: 208 },
    { text: "export default function Home() {", color: "#c4b5fd", x: 28, y: 236 },
    { text: "  return <Build coolApps />;", color: "#fcd34d", x: 44, y: 264 },
    { text: "}", color: "#c4b5fd", x: 28, y: 292 },
  ];

  ctx.font = "14px monospace";
  lines.forEach((line) => {
    if (!line.text) return;
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, line.x, line.y);
  });

  ctx.strokeStyle = "rgba(20, 184, 166, 0.35)";
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 48, 616, 340);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function findScreenMesh(object: THREE.Object3D): THREE.Mesh | null {
  let namedScreen: THREE.Mesh | null = null;
  let texturedCandidate: THREE.Mesh | null = null;
  let texturedScore = -1;
  let thinCandidate: THREE.Mesh | null = null;
  let thinnestRatio = Infinity;

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const name = child.name.toLowerCase();
    if (
      name.includes("screen") ||
      name.includes("display") ||
      name.includes("monitor") ||
      name.includes("lcd") ||
      name.includes("desktop")
    ) {
      namedScreen = child;
      return;
    }

    const material = child.material;
    if (
      material instanceof THREE.MeshStandardMaterial ||
      material instanceof THREE.MeshPhysicalMaterial
    ) {
      if (material.map) {
        const size = new THREE.Box3().setFromObject(child).getSize(new THREE.Vector3());
        const score = size.x * size.y;
        if (score > texturedScore) {
          texturedScore = score;
          texturedCandidate = child;
        }
      }
    }

    const size = new THREE.Box3().setFromObject(child).getSize(new THREE.Vector3());
    const dims = [size.x, size.y, size.z].sort((a, b) => a - b);
    const ratio = dims[0] / (dims[2] || 1);
    if (ratio < thinnestRatio && dims[2] > dims[1] * 0.4) {
      thinnestRatio = ratio;
      thinCandidate = child;
    }
  });

  return namedScreen ?? texturedCandidate ?? thinCandidate;
}

function enhanceModelMaterials(object: THREE.Object3D, screenTexture: THREE.Texture) {
  const screenMeshId = findScreenMesh(object)?.uuid ?? null;

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const name = child.name.toLowerCase();
    const isScreen = screenMeshId !== null && child.uuid === screenMeshId;
    const isKeyboard =
      name.includes("keyboard") ||
      name.includes("key") ||
      name.includes("trackpad");

    const source = child.material;
    if (
      !(source instanceof THREE.MeshStandardMaterial) &&
      !(source instanceof THREE.MeshPhysicalMaterial)
    ) {
      return;
    }

    if (isScreen) {
      if (source.map) source.map.dispose();
      child.material = new THREE.MeshStandardMaterial({
        map: screenTexture,
        emissive: new THREE.Color(TEAL),
        emissiveMap: screenTexture,
        emissiveIntensity: 0.62,
        metalness: 0.05,
        roughness: 0.35,
      });
      return;
    }

    const material = source.clone();
    if (isKeyboard) {
      material.color.set(KEYBOARD_COLOR);
      material.emissive.set(0x1e2a38);
      material.emissiveIntensity = 0.18;
      material.metalness = 0.3;
      material.roughness = 0.65;
    } else {
      material.color.set(BODY_COLOR);
      material.emissive.set(0x2a3f55);
      material.emissiveIntensity = 0.22;
      material.metalness = 0.62;
      material.roughness = 0.38;
    }
    material.envMapIntensity = 1;
    child.material = material;
  });
}

function createRingBase(radius: number) {
  const group = new THREE.Group();

  const buildRing = (ringRadius: number, opacity: number) => {
    const points: THREE.Vector3[] = [];
    const segments = 72;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * ringRadius,
          0,
          Math.sin(angle) * ringRadius
        )
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: TEAL,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return new THREE.LineLoop(geometry, material);
  };

  group.add(buildRing(radius, 1));
  group.add(buildRing(radius * 1.06, 0.55));
  group.add(buildRing(radius * 1.12, 0.28));

  return group;
}

function prepareModel(object: THREE.Group, screenTexture: THREE.Texture) {
  object.traverse((child) => {
    if (child instanceof THREE.Light) {
      child.visible = false;
    }
  });

  enhanceModelMaterials(object, screenTexture);

  const spinGroup = new THREE.Group();
  spinGroup.add(object);
  spinGroup.rotation.y = PRESENTATION_ANGLE;

  const pivot = new THREE.Group();
  pivot.add(spinGroup);
  pivot.userData.spinGroup = spinGroup;

  spinGroup.updateMatrixWorld(true);

  const orientedBox = getMeshBoundingBox(spinGroup);
  const orientedSize = orientedBox.getSize(new THREE.Vector3());
  const ringRadius = Math.max(orientedSize.x, orientedSize.z) * 0.42;

  const ringBase = createRingBase(ringRadius);
  ringBase.position.y = orientedBox.min.y - 0.02;
  spinGroup.add(ringBase);

  const box = getMeshBoundingBox(pivot);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? MODEL_TARGET_SIZE / maxDim : 1;

  pivot.scale.setScalar(scale);
  pivot.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
  pivot.updateMatrixWorld(true);

  return pivot;
}

function createSphereParticles(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const orbits: ParticleOrbit[] = [];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const shell = 0.55 + Math.random() * 0.45;
    const r = radius * shell;
    const yScale = 0.55;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi) * yScale;
    const z = r * Math.sin(phi) * Math.sin(theta);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    orbits.push({
      radius: r,
      theta,
      phi,
      speed: 0.25 + Math.random() * 0.55,
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: TEAL,
    size: 0.038,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  points.userData.orbits = orbits;
  points.userData.yScale = 0.55;
  return points;
}

function frameCamera(
  camera: THREE.PerspectiveCamera,
  target: THREE.Object3D,
  fitOffset = CAMERA_PADDING / DISPLAY_ZOOM
) {
  const box = getMeshBoundingBox(target);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const heightDim = size.y;
  const framingDim = Math.max(maxDim, heightDim * 0.92);
  const fovRad = (camera.fov * Math.PI) / 180;
  const distance =
    framingDim > 0
      ? (framingDim * fitOffset) / (2 * Math.tan(fovRad / 2))
      : 5;

  camera.position.set(
    center.x + framingDim * 0.1,
    center.y + framingDim * 0.06,
    center.z + distance
  );
  camera.lookAt(center);
  camera.near = Math.max(0.01, distance / 200);
  camera.far = Math.max(100, distance * 20);
  camera.updateProjectionMatrix();

  return center;
}

export default function NotebookScene({ className = "" }: NotebookSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 500);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xe8f2fc, 0x1a2a3d, 0.85));
    scene.add(new THREE.AmbientLight(0xffffff, 0.48));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
    keyLight.position.set(6, 10, 7);
    scene.add(keyLight);

    const frontLight = new THREE.DirectionalLight(0xf0f9ff, 1.1);
    frontLight.position.set(0, 3, 8);
    scene.add(frontLight);

    const fillLight = new THREE.DirectionalLight(0x5eead4, 0.75);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    const tealLight = new THREE.PointLight(TEAL, 2.8, 28);
    tealLight.position.set(-2, 1.5, 4);
    scene.add(tealLight);

    const whiteLight = new THREE.PointLight(WHITE, 1.15, 20);
    whiteLight.position.set(2, 2, 3);
    scene.add(whiteLight);

    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.75);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xe8f0f8, 0.8);
    topLight.position.set(0, 16, 2);
    scene.add(topLight);

    let screenTexture: THREE.Texture | null = null;
    let particles: THREE.Points | null = null;
    let model: THREE.Group | null = null;
    let modelBaseY = 0;
    let lookAtTarget = new THREE.Vector3();
    let animationId = 0;
    let isVisible = !document.hidden;
    let autoRotationY = 0;
    let elapsed = 0;

    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        const texture = createCodeScreenTexture();
        screenTexture = texture;
        const pivot = prepareModel(gltf.scene, texture);
        lookAtTarget = frameCamera(camera, pivot);
        modelBaseY = pivot.position.y;
        model = pivot;

        const spinGroup = pivot.userData.spinGroup as THREE.Group;
        particles = createSphereParticles(90, 2.4);
        spinGroup.add(particles);

        scene.add(pivot);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error al cargar el modelo 3D:", error);
        setHasError(true);
        setIsLoading(false);
      }
    );

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      if (model) {
        lookAtTarget = frameCamera(camera, model);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      elapsed = time * 0.001;

      if (model) {
        const spinGroup = model.userData.spinGroup as THREE.Group;
        autoRotationY += reducedMotion ? 0.001 : 0.0025;
        spinGroup.rotation.y = PRESENTATION_ANGLE + autoRotationY;

        if (!reducedMotion) {
          model.position.y = modelBaseY + Math.sin(elapsed * 1.1) * 0.02;
        }

        camera.lookAt(lookAtTarget);
      }

      if (particles && !reducedMotion) {
        const positions = particles.geometry.attributes.position;
        const orbits = particles.userData.orbits as ParticleOrbit[];
        const yScale = particles.userData.yScale as number;

        for (let i = 0; i < orbits.length; i++) {
          const orbit = orbits[i];
          const theta = orbit.theta + elapsed * orbit.speed * 0.15;
          const phi = orbit.phi + Math.sin(elapsed * 0.6 + i) * 0.04;
          const r = orbit.radius;

          positions.setX(i, r * Math.sin(phi) * Math.cos(theta));
          positions.setZ(i, r * Math.sin(phi) * Math.sin(theta));
          positions.setY(
            i,
            r * Math.cos(phi) * yScale + Math.sin(elapsed * orbit.speed + i) * 0.04
          );
        }
        positions.needsUpdate = true;
      }

      tealLight.intensity = 2.8 + Math.sin(elapsed * 1.5) * 0.3;
      whiteLight.intensity = 1.15 + Math.cos(elapsed * 1.2) * 0.15;

      renderer.render(scene, camera);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (model) {
        scene.remove(model);
        disposeObject(model);
      }

      screenTexture?.dispose();

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Notebook 3D"
      className={`relative w-full h-full ${className}`}
    >
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse rounded-lg bg-teal-500/10"
        />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-center text-xs text-slate-400 px-2">
          No se pudo cargar el modelo 3D
        </div>
      )}
    </div>
  );
}
