"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;


    const scene = new THREE.Scene();

   
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000 
    );
    camera.position.z = 5;

    
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;

    scene.add(cube);

  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
    directionalLight.position.set(5, 5, 7); 
    directionalLight.castShadow = true; 
    scene.add(directionalLight);

  
    const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(lightHelper);

   
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

    // Cleanup
    return () => {
      renderer.dispose();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
