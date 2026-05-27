'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Canvas3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particle field ────────────────────────────────────────────────────────
    const particleCount = 2500;
    const positions = new Float32Array(particleCount * 3);
    const colors    = new Float32Array(particleCount * 3);
    const sizes     = new Float32Array(particleCount);

    const colorOptions = [
      new THREE.Color('#00ff88'),
      new THREE.Color('#00ccff'),
      new THREE.Color('#004422'),
      new THREE.Color('#002211'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 3 + Math.random() * 5;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const col = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    pGeo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const pMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Wireframe torus knot ──────────────────────────────────────────────────
    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 20, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // ── Inner glowing sphere ──────────────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // ── Connecting lines (graph network) ─────────────────────────────────────
    const lineCount = 60;
    const linePts: THREE.Vector3[] = Array.from({ length: lineCount }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
      )
    );
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    for (let i = 0; i < lineCount; i++) {
      for (let j = i + 1; j < lineCount; j++) {
        if (linePts[i].distanceTo(linePts[j]) < 2.8) {
          linePositions.push(linePts[i].x, linePts[i].y, linePts[i].z);
          linePositions.push(linePts[j].x, linePts[j].y, linePts[j].z);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // ── Mouse parallax ────────────────────────────────────────────────────────
    let targetRotX = 0, targetRotY = 0;
    const onMouse = (e: MouseEvent) => {
      targetRotY = ((e.clientX / window.innerWidth)  - 0.5) * 0.4;
      targetRotX = ((e.clientY / window.innerHeight) - 0.5) * 0.2;
    };
    window.addEventListener('mousemove', onMouse);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ───────────────────────────────────────────────────────────────
    let raf: number;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      particles.rotation.y  = t * 0.04;
      particles.rotation.x  = t * 0.015;
      knot.rotation.x        = t * 0.18;
      knot.rotation.y        = t * 0.12;
      sphere.rotation.y      = -t * 0.25;
      sphere.rotation.z      = t * 0.1;

      // Smooth parallax
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.04;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.04;

      // Pulse opacity
      knotMat.opacity   = 0.05 + Math.sin(t * 0.8) * 0.03;
      sphereMat.opacity = 0.04 + Math.sin(t * 1.2) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // Fade in
    gsap.from(mount, { opacity: 0, duration: 2, ease: 'power2.out' });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />;
}