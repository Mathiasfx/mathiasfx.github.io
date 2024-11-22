"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Escena
    const scene = new THREE.Scene();

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75, // Ángulo de visión
      window.innerWidth / window.innerHeight, // Relación de aspecto
      0.1, // Distancia mínima
      1000 // Distancia máxima
    );
    camera.position.z = 5;

    // Renderizador
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Cubo
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;

    scene.add(cube);

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color blanco, intensidad 0.5
    scene.add(ambientLight);

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color blanco, intensidad 1
    directionalLight.position.set(5, 5, 7); // Posición de la luz
    directionalLight.castShadow = true; // Activar sombras
    scene.add(directionalLight);

    // Helper para visualizar la posición de la luz direccional
    const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(lightHelper);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Opcional, sombras suaves

    // Cleanup
    return () => {
      renderer.dispose();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
