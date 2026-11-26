import React, { useEffect, useRef, useState } from "react";
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
  tagPart,
} from "./dentalGeometry";
import "./Implant3D.scss";

const PART_INFO = {
  cbct: {
    label: "3D-скан КЛКТ",
    title: "Конусно-лучевой 3D-сканер (КЛКТ)",
    metric: "Точность 0,1 мм · 1 мин",
    color: "#5ef2b8",
    anchorLocal: new THREE.Vector3(0.65, 0.0, 0),
    desc: "Послойное 3D-сканирование показывает объём костной ткани, скрытые воспаления, расположение нервов и гайморовых пазух для полностью безопасного планирования.",
  },
  tooth: {
    label: "Родной зуб",
    title: "Естественный зуб и корни",
    metric: "Уязвим к кариесу",
    color: "#e6d3a7",
    anchorLocal: new THREE.Vector3(0, 0.68, 0),
    desc: "Живой зуб со временем подвержен кариесу, зубному камню, трещинам и заболеваниям дёсен. Если корень спасти нельзя — его надёжно замещает титановый имплантат.",
  },
  crown: {
    label: "Коронка",
    title: "Диоксид циркония / E.max",
    metric: "Срок службы 15+ лет",
    color: "#f8f6f0",
    anchorLocal: new THREE.Vector3(0, 0.78, 0),
    desc: "Эстетичная цельнокерамическая или циркониевая коронка точно повторяет цвет и прозрачность родных зубов, не окрашивается и выдерживает полную нагрузку.",
  },
  abutment: {
    label: "Абатмент",
    title: "Индивидуальный абатмент",
    metric: "Герметичное соединение",
    color: "#5ef2b8",
    anchorLocal: new THREE.Vector3(0, 0.34, 0),
    desc: "Точный переходник из титана или циркония с конусной посадкой надёжно соединяет имплантат с коронкой и формирует естественный контур десны.",
  },
  implant: {
    label: "Имплантат",
    title: "Биосовместимый титан Grade 4",
    metric: "Приживаемость 98%+",
    color: "#7c66f0",
    anchorLocal: new THREE.Vector3(0, -0.55, 0),
    desc: "Корневидный титановый имплантат с микрорезьбой у шейки сохраняет объём кости, срастается с тканями и рассчитан на десятилетия службы.",
  },
  gum: {
    label: "Десна",
    title: "Слизистая оболочка (десна)",
    metric: "Защитный контур",
    color: "#ee6c8c",
    anchorLocal: new THREE.Vector3(-0.62, 0.14, 0.25),
    desc: "Плотно обхватывает шейку коронки и абатмент, защищая кость от микрофлоры. Малоинвазивная методика сохраняет естественную эстетику десневого края.",
  },
  bone: {
    label: "Кость",
    title: "Костная ткань челюсти",
    metric: "Остеоинтеграция 2–6 мес.",
    color: "#f2d9aa",
    anchorLocal: new THREE.Vector3(-0.56, -0.78, 0.25),
    desc: "Живая кость плотно интегрируется с микропористой поверхностью имплантата, останавливает убыль ткани и работает как надёжный фундамент зуба.",
  },
  guide: {
    label: "3D-шаблон",
    title: "Хирургический 3D-шаблон",
    metric: "Точность до 0,1 мм",
    color: "#64f5d2",
    anchorLocal: new THREE.Vector3(0.55, 0.42, 0.15),
    desc: "Индивидуальная напечатанная на 3D-принтере каппа с металлической втулкой направляет имплантат строго по рассчитанной КЛКТ-оси без лишних разрезов.",
  },
};

const STEP_LEGEND_PARTS = {
  0: ["cbct", "tooth", "gum", "bone"],
  1: ["crown", "gum", "bone"],
  2: ["implant", "guide", "gum", "bone"],
  3: ["crown", "abutment", "implant", "gum", "bone"],
};

const DEFAULT_STEP_CAM = { x: 1.65, y: 1.1, z: 4.55 };
const MIN_STEP_DIST = 2.5;
const MAX_STEP_DIST = 6.8;

/**
 * Interactive 3D treatment stages simulator with vertical legend pills on the left,
 * vertical zoom slider on the right, raycast part detection, and SVG leader callouts.
 */
const TreatmentSteps3D = ({ activeStep }) => {
  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const stepRef = useRef(activeStep);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const stageGroupRef = useRef(null);

  const [hoveredFrom3D, setHoveredFrom3D] = useState(null);
  const [hoveredFromLegend, setHoveredFromLegend] = useState(null);
  const [calloutPos, setCalloutPos] = useState(null);
  const [zoomPct, setZoomPct] = useState(() =>
    Math.round(((MAX_STEP_DIST - DEFAULT_STEP_CAM.z) / (MAX_STEP_DIST - MIN_STEP_DIST)) * 100)
  );

  const activePartId = hoveredFromLegend || hoveredFrom3D;
  const activePartRef = useRef(null);

  useEffect(() => {
    activePartRef.current = activePartId;
  }, [activePartId]);

  useEffect(() => {
    stepRef.current = activeStep;
    setHoveredFrom3D(null);
    setHoveredFromLegend(null);
    setCalloutPos(null);
  }, [activeStep]);

  const applyZoomPct = (pct) => {
    const clamped = Math.max(0, Math.min(100, pct));
    setZoomPct(clamped);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const dist = MAX_STEP_DIST - (clamped / 100) * (MAX_STEP_DIST - MIN_STEP_DIST);
    const offset = camera.position.clone().sub(controls.target);
    offset.setLength(dist);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  };

  const resetCamera = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    camera.position.set(DEFAULT_STEP_CAM.x, DEFAULT_STEP_CAM.y, DEFAULT_STEP_CAM.z);
    controls.target.set(0, -0.05, 0);
    controls.update();
    setZoomPct(
      Math.round(((MAX_STEP_DIST - DEFAULT_STEP_CAM.z) / (MAX_STEP_DIST - MIN_STEP_DIST)) * 100)
    );
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
    camera.position.set(DEFAULT_STEP_CAM.x, DEFAULT_STEP_CAM.y, DEFAULT_STEP_CAM.z);
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
    stageGroupRef.current = stageGroup;
    scene.add(stageGroup);

    const { root: jawAnatomy } = createJawAnatomy();
    stageGroup.add(jawAnatomy);

    // --- Stage 0: CBCT Diagnostics (tooth + distinct moving CBCT scan ring) ---
    const step0Group = new THREE.Group();
    const diagTooth = createDiagnosticTooth();
    step0Group.add(diagTooth);

    const scanRingGroup = new THREE.Group();
    const scanPlane = new THREE.Mesh(
      new THREE.RingGeometry(0.76, 0.85, 52),
      new THREE.MeshBasicMaterial({
        color: 0x5ef2b8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
      })
    );
    scanPlane.rotation.x = Math.PI / 2;
    scanRingGroup.add(scanPlane);

    const scanDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.76, 52),
      new THREE.MeshBasicMaterial({
        color: 0x5ef2b8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      })
    );
    scanDisc.rotation.x = Math.PI / 2;
    scanRingGroup.add(scanDisc);
    tagPart(scanRingGroup, "cbct");
    step0Group.add(scanRingGroup);
    stageGroup.add(step0Group);

    // --- Stage 1: 3D Digital Plan ---
    const step1Group = new THREE.Group();
    const holoCrown = createAnatomicalCrown({ wireframe: true, partId: "crown" });
    holoCrown.position.y = 0.32;
    step1Group.add(holoCrown);

    const axisMat = new THREE.MeshBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.92,
    });
    const axisLine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 2.85, 16),
      axisMat
    );
    axisLine.position.y = -0.1;
    step1Group.add(axisLine);

    const trajMesh = new THREE.LineSegments(
      new THREE.WireframeGeometry(
        new THREE.CylinderGeometry(0.28, 0.14, 1.32, 24, 1, true)
      ),
      new THREE.LineBasicMaterial({
        color: 0x5ef2b8,
        transparent: true,
        opacity: 0.78,
      })
    );
    trajMesh.position.y = -0.68;
    tagPart(trajMesh, "implant");
    step1Group.add(trajMesh);

    const targetRing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.016, 10, 48), axisMat);
    targetRing.rotation.x = Math.PI / 2;
    targetRing.position.y = 0.25;
    step1Group.add(targetRing);
    stageGroup.add(step1Group);

    // --- Stage 2: Guided Implantation ---
    const step2Group = new THREE.Group();
    const surgicalGuide = createSurgicalGuide();
    step2Group.add(surgicalGuide);

    const drivingImplant = createTitaniumImplant();
    step2Group.add(drivingImplant);
    stageGroup.add(step2Group);

    // --- Stage 3: Crown Fixation ---
    const step3Group = new THREE.Group();
    const seatedImplant = createTitaniumImplant();
    seatedImplant.position.y = 0.0;
    step3Group.add(seatedImplant);

    const abutment = createAbutment();
    abutment.position.y = 0.0;
    step3Group.add(abutment);

    const finalCrown = createAnatomicalCrown({ wireframe: false, partId: "crown" });
    step3Group.add(finalCrown);
    stageGroup.add(step3Group);

    stageGroup.traverse((node) => {
      if (node.material && typeof node.material.emissiveIntensity === "number") {
        node.userData.baseEmissive = node.material.emissiveIntensity;
        node.userData.baseEmissiveColor = node.material.emissive
          ? node.material.emissive.getHex()
          : 0x000000;
      }
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.zoomSpeed = 0.85;
    controls.minDistance = MIN_STEP_DIST;
    controls.maxDistance = MAX_STEP_DIST;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.target.set(0, -0.05, 0);
    controlsRef.current = controls;

    const syncSlider = () => {
      const dist = camera.position.distanceTo(controls.target);
      const pct = Math.round(
        THREE.MathUtils.clamp((MAX_STEP_DIST - dist) / (MAX_STEP_DIST - MIN_STEP_DIST), 0, 1) *
          100
      );
      setZoomPct((prev) => (prev === pct ? prev : pct));
    };
    controls.addEventListener("change", syncSlider);

    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();

    const pickPartAt = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNDC, camera);

      const hits = raycaster.intersectObjects(
        [jawAnatomy, step0Group, step1Group, step2Group, step3Group],
        true
      );
      for (const hit of hits) {
        let cur = hit.object;
        let visible = true;
        let partId = null;
        while (cur) {
          if (cur.visible === false) {
            visible = false;
            break;
          }
          if (!partId && cur.userData?.partId) {
            partId = cur.userData.partId;
          }
          cur = cur.parent;
        }
        if (visible && partId && PART_INFO[partId]) {
          return partId;
        }
      }
      return null;
    };

    const onPointerMoveCanvas = (e) => {
      const hitId = pickPartAt(e.clientX, e.clientY);
      setHoveredFrom3D((prev) => (prev === hitId ? prev : hitId));
    };

    const onPointerLeaveCanvas = () => {
      setHoveredFrom3D(null);
    };

    renderer.domElement.addEventListener("pointermove", onPointerMoveCanvas, { passive: true });
    renderer.domElement.addEventListener("pointerleave", onPointerLeaveCanvas, { passive: true });

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

    const projVec = new THREE.Vector3();
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
        scanRingGroup.position.y = sweepY;
      } else if (s === 1) {
        holoCrown.position.y = 0.32 + Math.sin(t * 2) * 0.05;
        holoCrown.rotation.y = t * 0.4;
        targetRing.scale.setScalar(1 + Math.sin(t * 2.4) * 0.06);
      } else if (s === 2) {
        const cycle = (Math.sin(t * 1.35) + 1) * 0.5;
        drivingImplant.position.y = THREE.MathUtils.lerp(1.15, 0.0, cycle);
        drivingImplant.rotation.y = cycle * Math.PI * 4.0;
      } else if (s === 3) {
        const seatCycle = Math.min(1, (Math.sin(t * 1.45 - 0.4) + 1) * 0.55);
        finalCrown.position.y = THREE.MathUtils.lerp(0.84, 0.26, seatCycle);
      }

      const highlighted = activePartRef.current;
      controls.autoRotate = !highlighted;

      stageGroup.traverse((node) => {
        if (node.material && typeof node.material.emissiveIntensity === "number") {
          const isMatch = highlighted && node.userData.partId === highlighted;
          const targetEmissive = isMatch
            ? Math.max(0.58, (node.userData.baseEmissive || 0.15) + 0.44)
            : node.userData.baseEmissive ?? 0.2;
          node.material.emissiveIntensity +=
            (targetEmissive - node.material.emissiveIntensity) * 0.16;
          if (node.material.emissive && isMatch && node.userData.partId === "crown") {
            node.material.emissive.setHex(0x5ef2b8);
          } else if (node.material.emissive && typeof node.userData.baseEmissiveColor === "number") {
            node.material.emissive.setHex(node.userData.baseEmissiveColor);
          }
        }
      });

      controls.update();
      renderer.render(scene, camera);

      if (highlighted && PART_INFO[highlighted]) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        projVec.copy(PART_INFO[highlighted].anchorLocal);
        if (highlighted === "cbct" && s === 0) {
          projVec.y = scanRingGroup.position.y;
        } else if (highlighted === "implant" && s === 2) {
          projVec.y = drivingImplant.position.y - 0.4;
        } else if (highlighted === "crown" && s === 3) {
          projVec.y = finalCrown.position.y + 0.48;
        }
        projVec.add(stageGroup.position);
        projVec.project(camera);
        const sx = ((projVec.x + 1) / 2) * w;
        const sy = ((-projVec.y + 1) / 2) * h;
        setCalloutPos((prev) =>
          prev && Math.abs(prev.x - sx) < 1 && Math.abs(prev.y - sy) < 1
            ? prev
            : { x: Math.round(sx), y: Math.round(sy), w, h }
        );
      } else {
        setCalloutPos(null);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      controls.removeEventListener("change", syncSlider);
      renderer.domElement.removeEventListener("pointermove", onPointerMoveCanvas);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeaveCanvas);
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

  const legendKeys = STEP_LEGEND_PARTS[activeStep] || ["gum", "bone"];
  const activeInfo = activePartId ? PART_INFO[activePartId] : null;

  return (
    <div ref={wrapperRef} className="steps-3d-wrapper">
      <div
        ref={mountRef}
        className="implant-3d-canvas-wrap steps-3d-viewport"
        aria-label="Интерактивная 3D-модель этапа лечения — наведите на слой или покрутите"
      />

      {activeInfo && calloutPos && (
        <>
          <svg
            className="steps-callout-line"
            viewBox={`0 0 ${calloutPos.w} ${calloutPos.h}`}
            aria-hidden="true"
          >
            <polyline
              points={`${calloutPos.x},${calloutPos.y} ${Math.max(
                calloutPos.x + 28,
                calloutPos.w - 296
              )},${Math.max(88, Math.min(calloutPos.h - 110, calloutPos.y))} ${
                calloutPos.w - 284
              },112`}
              fill="none"
              stroke={activeInfo.color}
              strokeWidth="1.8"
              strokeDasharray="4 3"
              opacity="0.88"
            />
            <circle
              cx={calloutPos.x}
              cy={calloutPos.y}
              r="5"
              fill={activeInfo.color}
              stroke="#0f122a"
              strokeWidth="2"
            />
          </svg>

          <div
            className="steps-callout-card"
            style={{ "--part-color": activeInfo.color }}
          >
            <div className="callout-header">
              <span className="callout-dot" />
              <span className="callout-metric">{activeInfo.metric}</span>
            </div>
            <h4>{activeInfo.title}</h4>
            <p>{activeInfo.desc}</p>
          </div>
        </>
      )}

      {/* Left vertical interactive color crumbs */}
      <div className="steps-3d-legend-vertical">
        {legendKeys.map((key) => {
          const item = PART_INFO[key];
          const isHighlighted = activePartId === key;
          return (
            <button
              key={key}
              type="button"
              className={`legend-item ${isHighlighted ? "is-highlighted" : ""}`}
              style={{ "--part-color": item.color }}
              onMouseEnter={() => setHoveredFromLegend(key)}
              onMouseLeave={() => setHoveredFromLegend(null)}
              onClick={() =>
                setHoveredFromLegend((prev) => (prev === key ? null : key))
              }
            >
              <span className="legend-dot" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right vertical zoom slider (+ / slider / - / reset) */}
      <div className="zoom-slider-panel steps-3d-zoom">
        <button
          type="button"
          className="mini-3d-btn"
          onClick={() => applyZoomPct(zoomPct + 14)}
          aria-label="Приблизить 3D-модель"
          title="Приблизить"
        >
          <FiPlus />
        </button>
        <div className="zoom-range-track">
          <input
            type="range"
            min="0"
            max="100"
            value={zoomPct}
            onChange={(e) => applyZoomPct(Number(e.target.value))}
            aria-label="Масштаб 3D-модели"
            className="zoom-range-input"
          />
        </div>
        <button
          type="button"
          className="mini-3d-btn"
          onClick={() => applyZoomPct(zoomPct - 14)}
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
    </div>
  );
};

export default TreatmentSteps3D;
