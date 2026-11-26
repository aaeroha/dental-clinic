import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  createAbutment,
  createAnatomicalCrown,
  createDiagnosticTooth,
  createJawBoneBed,
  createSurgicalGuide,
  createTitaniumImplant,
  disposeObject3D,
  setupDentalLighting,
} from "./dentalGeometry";
import "./Implant3D.scss";

/**
 * Interactive 3D treatment stages simulator controlled by activeStep (0..3).
 * Users can freely orbit/rotate the 3D scene on 360° with mouse or touch.
 */
const TreatmentSteps3D = ({ activeStep }) => {
  const mountRef = useRef(null);
  const stepRef = useRef(activeStep);

  useEffect(() => {
    stepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      60
    );
    camera.position.set(1.55, 1.05, 4.45);

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

    // Master stage pivot
    const stageGroup = new THREE.Group();
    stageGroup.position.y = 0.05;
    scene.add(stageGroup);

    // Shared translucent jaw bone segment across all stages
    const jawBone = createJawBoneBed();
    jawBone.position.y = -0.18;
    stageGroup.add(jawBone);

    // --- Stage 0: CBCT Diagnostic Tooth + Scanning Plane ---
    const step0Group = new THREE.Group();
    const diagTooth = createDiagnosticTooth();
    diagTooth.position.y = -0.15;
    step0Group.add(diagTooth);

    const scanRingGeo = new THREE.RingGeometry(0.68, 0.74, 48);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const scanPlane = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanPlane.rotation.x = Math.PI / 2;
    step0Group.add(scanPlane);

    const scanDiscGeo = new THREE.CircleGeometry(0.68, 48);
    const scanDiscMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });
    const scanDisc = new THREE.Mesh(scanDiscGeo, scanDiscMat);
    scanDisc.rotation.x = Math.PI / 2;
    step0Group.add(scanDisc);
    stageGroup.add(step0Group);

    // --- Stage 1: 3D AI Plan (Wireframe crown + 90.0° laser axis + target cylinder) ---
    const step1Group = new THREE.Group();
    const holoCrown = createAnatomicalCrown({ wireframe: true });
    holoCrown.position.y = 0.25;
    step1Group.add(holoCrown);

    const axisGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.75, 16);
    const axisMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.9,
    });
    const axisLine = new THREE.Mesh(axisGeo, axisMat);
    axisLine.position.y = -0.15;
    step1Group.add(axisLine);

    const trajGeo = new THREE.CylinderGeometry(0.27, 0.16, 1.32, 24, 1, true);
    const trajWire = new THREE.WireframeGeometry(trajGeo);
    const trajMat = new THREE.LineBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.75,
    });
    const trajMesh = new THREE.LineSegments(trajWire, trajMat);
    trajMesh.position.y = -0.78;
    step1Group.add(trajMesh);

    const targetRingGeo = new THREE.TorusGeometry(0.45, 0.016, 10, 48);
    const targetRing = new THREE.Mesh(targetRingGeo, axisMat);
    targetRing.rotation.x = Math.PI / 2;
    targetRing.position.y = 0.02;
    step1Group.add(targetRing);
    stageGroup.add(step1Group);

    // --- Stage 2: Guided Implantation (3D Guide + Screwing Titanium Implant) ---
    const step2Group = new THREE.Group();
    const surgicalGuide = createSurgicalGuide();
    surgicalGuide.position.y = 0.18;
    step2Group.add(surgicalGuide);

    const drivingImplant = createTitaniumImplant();
    step2Group.add(drivingImplant);
    stageGroup.add(step2Group);

    // --- Stage 3: Final Crown Fixation (Seated Implant + Abutment + Zirconia Crown) ---
    const step3Group = new THREE.Group();
    const seatedImplant = createTitaniumImplant();
    seatedImplant.position.y = -0.18;
    step3Group.add(seatedImplant);

    const abutment = createAbutment();
    abutment.position.y = 0.02;
    step3Group.add(abutment);

    const finalCrown = createAnatomicalCrown({ wireframe: false });
    step3Group.add(finalCrown);
    stageGroup.add(step3Group);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.target.set(0, -0.05, 0);

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
      const s = stepRef.current;

      step0Group.visible = s === 0;
      step1Group.visible = s === 1;
      step2Group.visible = s === 2;
      step3Group.visible = s === 3;

      if (s === 0) {
        const sweepY = Math.sin(t * 1.8) * 0.95;
        scanPlane.position.y = sweepY;
        scanDisc.position.y = sweepY;
      } else if (s === 1) {
        holoCrown.position.y = 0.28 + Math.sin(t * 2) * 0.05;
        holoCrown.rotation.y = t * 0.4;
        targetRing.scale.setScalar(1 + Math.sin(t * 2.5) * 0.06);
      } else if (s === 2) {
        // Implant smoothly threads up/down with synchronized rotation
        const cycle = (Math.sin(t * 1.4) + 1) * 0.5; // 0..1
        drivingImplant.position.y = THREE.MathUtils.lerp(0.62, -0.18, cycle);
        drivingImplant.rotation.y = cycle * Math.PI * 3.5;
      } else if (s === 3) {
        // Crown gently descends onto abutment and seats cleanly
        const seatCycle = Math.min(1, (Math.sin(t * 1.5 - 0.5) + 1) * 0.55);
        finalCrown.position.y = THREE.MathUtils.lerp(0.76, 0.34, seatCycle);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
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
    <div className="steps-3d-wrapper">
      <div
        ref={mountRef}
        className="implant-3d-canvas-wrap steps-3d-viewport"
        aria-label="Интерактивная 3D-модель этапа лечения — покрутите мышкой или пальцем"
      />
      <div className="steps-3d-hint">
        <span className="steps-3d-hint-dot" />
        <span>Покрутите 3D-модель на 360°</span>
      </div>
    </div>
  );
};

export default TreatmentSteps3D;
