import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FiPlus, FiMinus, FiRotateCcw } from "react-icons/fi";
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
 * Supports 360 deg drag rotation, mouse-wheel zoom inside the viewport,
 * cursor-follow tilt, and mobile-friendly +/- zoom controls.
 */
const BannerImplant3D = () => {
  const mountRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const zoomCamera = (factor) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const offset = camera.position.clone().sub(controls.target);
    const nextDist = THREE.MathUtils.clamp(offset.length() * factor, 2.3, 6.4);
    offset.setLength(nextDist);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  };

  const resetCamera = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    camera.position.set(0.55, 0.42, 4.15);
    controls.target.set(0, 0.06, 0);
    controls.update();
  };

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
    camera.position.set(0.55, 0.42, 4.15);
    cameraRef.current = camera;

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

    const assembly = new THREE.Group();
    assembly.position.y = -0.08;
    assembly.rotation.z = -0.12;
    scene.add(assembly);

    const implant = createTitaniumImplant();
    implant.position.y = 0.0;
    assembly.add(implant);

    const abutment = createAbutment();
    abutment.position.y = 0.0;
    assembly.add(abutment);

    const crown = createAnatomicalCrown({ wireframe: false });
    crown.position.y = 0.34;
    assembly.add(crown);

    const ringGeo = new THREE.TorusGeometry(0.76, 0.009, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.45,
    });
    const scanRing = new THREE.Mesh(ringGeo, ringMat);
    scanRing.rotation.x = Math.PI / 2.25;
    scanRing.position.y = 0.04;
    assembly.add(scanRing);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.zoomSpeed = 0.85;
    controls.minDistance = 2.3;
    controls.maxDistance = 6.4;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.target.set(0, 0.06, 0);
    controlsRef.current = controls;

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      pointerX = nx * 0.2;
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
      const lift = (Math.sin(t * 1.4) + 1) * 0.5;
      crown.position.y = 0.34 + lift * 0.14;
      abutment.position.y = 0.01 + lift * 0.04;
      scanRing.rotation.z = t * 0.45;
      scanRing.scale.setScalar(1 + Math.sin(t * 2) * 0.03);

      assembly.rotation.x += (pointerY - assembly.rotation.x) * 0.06;
      assembly.rotation.z += (-0.12 - pointerX * 0.6 - assembly.rotation.z) * 0.06;

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
      <div
        ref={mountRef}
        className="implant-3d-canvas-wrap banner-3d-viewport"
        aria-label="Интерактивная 3D-модель имплантата с коронкой — покрутите и приблизьте"
      />
      <div className="banner-3d-controls">
        <button
          type="button"
          className="mini-3d-btn"
          onClick={() => zoomCamera(0.82)}
          aria-label="Приблизить 3D-модель"
          title="Приблизить"
        >
          <FiPlus />
        </button>
        <button
          type="button"
          className="mini-3d-btn"
          onClick={() => zoomCamera(1.22)}
          aria-label="Отдалить 3D-модель"
          title="Отдалить"
        >
          <FiMinus />
        </button>
        <button
          type="button"
          className="mini-3d-btn"
          onClick={resetCamera}
          aria-label="Сбросить ракурс"
          title="Сбросить ракурс"
        >
          <FiRotateCcw />
        </button>
      </div>
      <div className="banner-3d-hint">360° · зум колёсиком</div>
    </div>
  );
};

export default BannerImplant3D;
