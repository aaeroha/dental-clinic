import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FiPlus, FiMinus, FiRotateCcw } from "react-icons/fi";
import {
  createAbutment,
  createAnatomicalCrown,
  createDiagnosticTooth,
  createJawAnatomy,
  createSurgicalGuide,
  createTitaniumImplant,
  disposeObject3D,
  setupDentalLighting,
} from "./dentalGeometry";
import "./Implant3D.scss";

/**
 * Interactive 3D treatment stages simulator controlled by activeStep (0..3).
 * Shows real multi-layered jaw anatomy (ivory bone + pink gingiva) and lets users
 * rotate 360 deg and zoom via wheel / pinch / buttons on desktop, tablet & mobile.
 */
const TreatmentSteps3D = ({ activeStep }) => {
  const mountRef = useRef(null);
  const stepRef = useRef(activeStep);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    stepRef.current = activeStep;
  }, [activeStep]);

  const zoomCamera = (factor) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const offset = camera.position.clone().sub(controls.target);
    const nextDist = THREE.MathUtils.clamp(offset.length() * factor, 2.5, 6.8);
    offset.setLength(nextDist);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  };

  const resetCamera = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    camera.position.set(1.65, 1.15, 4.45);
    controls.target.set(0, -0.05, 0);
    controls.update();
  };

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
    camera.position.set(1.65, 1.15, 4.45);
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

    const stageGroup = new THREE.Group();
    stageGroup.position.y = 0.04;
    scene.add(stageGroup);

    // Distinct multi-layered jaw anatomy: beige bone below (y -1.5..0), coral-pink gingiva above (y 0..0.28)
    const jawAnatomy = createJawAnatomy();
    stageGroup.add(jawAnatomy);

    // --- Stage 0: 3D CBCT Diagnostics (Natural Tooth + Roots + Root Canals inside Bone & Gingiva) ---
    const step0Group = new THREE.Group();
    const diagTooth = createDiagnosticTooth();
    step0Group.add(diagTooth);

    const scanRingGeo = new THREE.RingGeometry(0.76, 0.84, 52);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const scanPlane = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanPlane.rotation.x = Math.PI / 2;
    step0Group.add(scanPlane);

    const scanDiscGeo = new THREE.CircleGeometry(0.76, 52);
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

    // --- Stage 1: 3D Digital Plan (Wireframe AI Crown + 90.0 deg Axis + Planned Implant Silhouette inside Bone) ---
    const step1Group = new THREE.Group();
    const holoCrown = createAnatomicalCrown({ wireframe: true });
    holoCrown.position.y = 0.34;
    step1Group.add(holoCrown);

    const axisGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.85, 16);
    const axisMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.92,
    });
    const axisLine = new THREE.Mesh(axisGeo, axisMat);
    axisLine.position.y = -0.1;
    step1Group.add(axisLine);

    const trajGeo = new THREE.CylinderGeometry(0.28, 0.14, 1.32, 24, 1, true);
    const trajWire = new THREE.WireframeGeometry(trajGeo);
    const trajMat = new THREE.LineBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.78,
    });
    const trajMesh = new THREE.LineSegments(trajWire, trajMat);
    trajMesh.position.y = -0.68;
    step1Group.add(trajMesh);

    const targetRingGeo = new THREE.TorusGeometry(0.46, 0.016, 10, 48);
    const targetRing = new THREE.Mesh(targetRingGeo, axisMat);
    targetRing.rotation.x = Math.PI / 2;
    targetRing.position.y = 0.28;
    step1Group.add(targetRing);
    stageGroup.add(step1Group);

    // --- Stage 2: Guided Implantation (3D Template over Gingiva + Titanium Implant threading into Bone) ---
    const step2Group = new THREE.Group();
    const surgicalGuide = createSurgicalGuide();
    step2Group.add(surgicalGuide);

    const drivingImplant = createTitaniumImplant();
    step2Group.add(drivingImplant);
    stageGroup.add(step2Group);

    // --- Stage 3: Crown Fixation (Seated Implant in Bone -> Abutment through Gingiva -> Zirconia Crown) ---
    const step3Group = new THREE.Group();
    const seatedImplant = createTitaniumImplant();
    seatedImplant.position.y = 0.0;
    step3Group.add(seatedImplant);

    const abutment = createAbutment();
    abutment.position.y = 0.0;
    step3Group.add(abutment);

    const finalCrown = createAnatomicalCrown({ wireframe: false });
    step3Group.add(finalCrown);
    stageGroup.add(step3Group);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.zoomSpeed = 0.85;
    controls.minDistance = 2.5;
    controls.maxDistance = 6.8;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.15;
    controls.target.set(0, -0.05, 0);
    controlsRef.current = controls;

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
        const sweepY = -0.15 + Math.sin(t * 1.75) * 1.15;
        scanPlane.position.y = sweepY;
        scanDisc.position.y = sweepY;
      } else if (s === 1) {
        holoCrown.position.y = 0.36 + Math.sin(t * 2) * 0.05;
        holoCrown.rotation.y = t * 0.4;
        targetRing.scale.setScalar(1 + Math.sin(t * 2.4) * 0.06);
      } else if (s === 2) {
        // Implant threads smoothly down through guide sleeve into bone bed (y = 0.0 crest)
        const cycle = (Math.sin(t * 1.35) + 1) * 0.5;
        drivingImplant.position.y = THREE.MathUtils.lerp(1.15, 0.0, cycle);
        drivingImplant.rotation.y = cycle * Math.PI * 4.0;
      } else if (s === 3) {
        // Crown descends cleanly onto abutment & seats flush at pink gingiva margin (y = 0.27)
        const seatCycle = Math.min(1, (Math.sin(t * 1.45 - 0.4) + 1) * 0.55);
        finalCrown.position.y = THREE.MathUtils.lerp(0.86, 0.27, seatCycle);
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
        aria-label="Интерактивная 3D-модель этапа лечения — покрутите и приблизьте"
      />
      <div className="steps-3d-legend" aria-hidden="true">
        <span className="legend-item">
          <span className="legend-dot legend-dot--gum" />
          Десна
        </span>
        <span className="legend-item">
          <span className="legend-dot legend-dot--bone" />
          Кость
        </span>
      </div>
      <div className="steps-3d-controls">
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
      <div className="steps-3d-hint">
        <span className="steps-3d-hint-dot" />
        <span>360° вращение · зум колёсиком</span>
      </div>
    </div>
  );
};

export default TreatmentSteps3D;
