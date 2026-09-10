"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Global3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    // 2. Ultra-optimized WebGL Renderer (Capped at 1.5x DPR for silky 60-120fps)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Ambient 3D Neural Particle Network
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // Balanced particle count: rich visuals with minimal GPU/CPU load
    const particleCount = 90;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const spreadX = 42;
    const spreadY = 70;
    const spreadZ = 24;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spreadX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      velocities.push({
        x: (Math.random() - 0.5) * 0.007,
        y: (Math.random() - 0.5) * 0.007,
        z: (Math.random() - 0.5) * 0.005,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x865130,
      size: 0.35,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particles);

    // 4. Synaptic Connection Lines
    const maxConnections = 100;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    particleGroup.add(lineMesh);

    // 5. Zero-Reflow Scroll Progress Cache (Never forces layout reflow in scroll loop!)
    let scrollProgress = 0;
    let cachedDocHeight = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const updateDocHeight = () => {
      cachedDocHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    const handleScroll = () => {
      scrollProgress = window.scrollY / cachedDocHeight;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 6. Interactive Mouse Motion (Only for fine pointer devices)
    let targetRotX = 0;
    let targetRotY = 0;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mouseX * 0.22;
      targetRotX = -mouseY * 0.18;
    };

    if (isFinePointer) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // 7. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateDocHeight();
    };
    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let currentCameraY = 0;
    const connectionDistSq = 5.2 * 5.2; // 27.04 (Squared distance comparison avoids costly Math.sqrt)

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause completely if tab is in background to save 100% resources
      if (document.hidden) return;

      // Smooth camera glide
      const targetCameraY = (0.5 - scrollProgress) * 24;
      currentCameraY += (targetCameraY - currentCameraY) * 0.05;
      camera.position.y = currentCameraY;

      // Mouse response + ambient drift
      particleGroup.rotation.y += (targetRotY - particleGroup.rotation.y) * 0.035;
      particleGroup.rotation.x += (targetRotX - particleGroup.rotation.x) * 0.035;
      particleGroup.rotation.y += 0.0006;

      // Update particle positions
      const pos = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        if (Math.abs(pos[i * 3]) > spreadX / 2) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > spreadY / 2) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > spreadZ / 2) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Fast connection line computation using squared distance
      let connectionIndex = 0;

      for (let i = 0; i < particleCount && connectionIndex < maxConnections; i++) {
        const i3 = i * 3;
        const px = pos[i3];
        const py = pos[i3 + 1];
        const pz = pos[i3 + 2];

        for (let j = i + 1; j < particleCount && connectionIndex < maxConnections; j++) {
          const j3 = j * 3;
          const dx = px - pos[j3];
          const dy = py - pos[j3 + 1];
          const dz = pz - pos[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionDistSq) {
            const lineIdx = connectionIndex * 6;
            linePositions[lineIdx] = px;
            linePositions[lineIdx + 1] = py;
            linePositions[lineIdx + 2] = pz;

            linePositions[lineIdx + 3] = pos[j3];
            linePositions[lineIdx + 4] = pos[j3 + 1];
            linePositions[lineIdx + 5] = pos[j3 + 2];

            const alpha = (1 - Math.sqrt(distSq) / 5.2) * 0.45;
            lineColors[lineIdx] = 0.52 * alpha;
            lineColors[lineIdx + 1] = 0.32 * alpha;
            lineColors[lineIdx + 2] = 0.19 * alpha;
            lineColors[lineIdx + 3] = 0.52 * alpha;
            lineColors[lineIdx + 4] = 0.32 * alpha;
            lineColors[lineIdx + 5] = 0.19 * alpha;

            connectionIndex++;
          }
        }
      }

      for (let k = connectionIndex * 6; k < maxConnections * 6; k++) {
        linePositions[k] = 0;
        lineColors[k] = 0;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      if (isFinePointer) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden select-none -z-20 opacity-75"
      aria-hidden="true"
    />
  );
}
