import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  createAbutment,
  createAnatomicalCrown,
  createTitaniumImplant,
  disposeObject3D,
  setupDentalLighting,
} from "./dentalGeometry";
import "./Implant3D.scss";

/**
 * Interactive 3D Implant + Abutment + Crown showcase for the Hero Banner.
 * Reacts gently to cursor movement and supports direct 360° drag rotation.
 */
const BannerImplant3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      50
    );
    camera.position.set(0.55, 0.45, 4.35);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    setupDentalLighting(scene);

    // Master assembly group positioned centrally
    const assembly = new THREE.Group();
    assembly.position.y = -0.1;
    assembly.rotation.z = -0.14;
    scene.add(assembly);

    const implant = createTitaniumImplant();
    implant.position.y = -0.2;
    assembly.add(implant);

    const abutment = createAbutment();
    abutment.position.y = 0.02;
    assembly.add(abutment);

    const crown = createAnatomicalCrown({ wireframe: false });
    crown.position.y = 0.44;
    assembly.add(crown);

    // Subtle precision orbital ring around the implant neck
    const ringGeo = new THREE.TorusGeometry(0.76, 0.008, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.45,
    });
    const scanRing = new THREE.Mesh(ringGeo, ringMat);
    scanRing.rotation.x = Math.PI / 2.25;
    scanRing.position.y = 0.05;
    assembly.add(scanRing);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controls.target.set(0, 0.05, 0);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      pointerX = nx * 0.22;
      pointerY = ny * 0.14;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let isVisible = true;
    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", handleResize, { passive: true });

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      // Gentle exploded-view hover showing surgical implant -> abutment -> zirconia crown
      const lift = (Math.sin(t * 1.45) + 1) * 0.5;
      crown.position.y = 0.4 + lift * 0.14;
      abutment.position.y = 0.01 + lift * 0.04;
      scanRing.rotation.z = t * 0.45;
      scanRing.scale.setScalar(1 + Math.sin(t * 2) * 0.03);

      // Subtle mouse-follow tilt layered cleanly on the assembly
      assembly.rotation.x += (pointerY - assembly.rotation.x) * 0.06;
      assembly.rotation.z += (-0.14 - pointerX * 0.65 - assembly.rotation.z) * 0.06;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (observer) observer.disconnect();
      controls.dispose();
      disposeObject3D(scene);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="banner-3d-card">
      <div className="banner-3d-badge">
        <span className="banner-3d-dot" />
        <span>3D-макет · Имплант</span>
      </div>
      <div
        ref={mountRef}
        className="implant-3d-canvas-wrap banner-3d-viewport"
        aria-label="Интерактивная 3D-модель зубного имплантата с коронкой — покрутите мышкой"
      />
      <div className="banner-3d-hint">Покрутите 360°</div>
    </div>
  );
};

export default BannerImplant3D;
