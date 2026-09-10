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

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    // 3. Ambient 3D Neural Particle Network
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const particleCount = 135;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    // Distribute particles across a wide, tall cylindrical column
    const spreadX = 42;
    const spreadY = 70;
    const spreadZ = 24;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spreadX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      velocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.006,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Subtle warm bronze/amber point material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x865130,
      size: 0.35,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particles);

    // 4. Dynamic Synaptic Connection Lines
    const maxConnections = 160;
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
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    particleGroup.add(lineMesh);

    // 5. Scroll Depth Parallax Tracking
    let scrollProgress = 0;
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        scrollProgress = window.scrollY / docHeight; // 0 (top) to 1 (bottom)
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 6. Interactive Mouse Motion
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mouseX * 0.25;
      targetRotX = -mouseY * 0.2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let currentCameraY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth scroll camera glide (travels down as user scrolls)
      const targetCameraY = (0.5 - scrollProgress) * 26;
      currentCameraY += (targetCameraY - currentCameraY) * 0.05;
      camera.position.y = currentCameraY;

      // Smooth mouse rotation response
      particleGroup.rotation.y += (targetRotY - particleGroup.rotation.y) * 0.035;
      particleGroup.rotation.x += (targetRotX - particleGroup.rotation.x) * 0.035;

      // Constant gentle ambient idle drift
      particleGroup.rotation.y += 0.0006;

      // Update particle positions
      const pos = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        // Boundaries bounce
        if (Math.abs(pos[i * 3]) > spreadX / 2) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > spreadY / 2) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > spreadZ / 2) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Connect nearest particles with lines
      let connectionIndex = 0;
      const connectionDistance = 5.2;

      for (let i = 0; i < particleCount && connectionIndex < maxConnections; i++) {
        for (let j = i + 1; j < particleCount && connectionIndex < maxConnections; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            const lineIdx = connectionIndex * 6;
            linePositions[lineIdx] = pos[i * 3];
            linePositions[lineIdx + 1] = pos[i * 3 + 1];
            linePositions[lineIdx + 2] = pos[i * 3 + 2];

            linePositions[lineIdx + 3] = pos[j * 3];
            linePositions[lineIdx + 4] = pos[j * 3 + 1];
            linePositions[lineIdx + 5] = pos[j * 3 + 2];

            const alpha = (1 - dist / connectionDistance) * 0.45;
            // Warm terracotta / amber tone
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

      // Clear inactive line slots
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
      window.removeEventListener("mousemove", handleMouseMove);
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
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden select-none -z-20 opacity-80"
      aria-hidden="true"
    />
  );
}
