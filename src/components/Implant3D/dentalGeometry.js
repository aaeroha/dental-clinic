import * as THREE from "three";

/**
 * Sets up balanced studio lighting for titanium, zirconia, and translucent bone.
 */
export function setupDentalLighting(scene) {
  const ambient = new THREE.AmbientLight(0xdce6ff, 0.85);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x1e2452, 0.75);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x88b8ff, 0.95);
  fillLight.position.set(-5, 2, 4);
  scene.add(fillLight);

  const rimMint = new THREE.DirectionalLight(0x5ef2b8, 1.15);
  rimMint.position.set(-3, -2, -4);
  scene.add(rimMint);

  const rimViolet = new THREE.PointLight(0x7c66f0, 1.4, 14);
  rimViolet.position.set(3.5, -1.5, 2.5);
  scene.add(rimViolet);
}

/**
 * Builds a high-detail titanium dental implant with tapered core, collar, and helical threads.
 */
export function createTitaniumImplant({
  coreColor = 0xcfd8ea,
  collarColor = 0x7c66f0,
  threadColor = 0xe4ecfa,
} = {}) {
  const group = new THREE.Group();

  const titaniumMat = new THREE.MeshPhysicalMaterial({
    color: coreColor,
    metalness: 0.86,
    roughness: 0.24,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
  });

  const threadMat = new THREE.MeshPhysicalMaterial({
    color: threadColor,
    metalness: 0.9,
    roughness: 0.18,
    clearcoat: 0.4,
  });

  const collarMat = new THREE.MeshPhysicalMaterial({
    color: collarColor,
    metalness: 0.72,
    roughness: 0.26,
    clearcoat: 0.5,
  });

  // Tapered implant body profile (y from -1.25 apex to +0.18 collar)
  const coreProfile = [
    new THREE.Vector2(0.0, -1.25),
    new THREE.Vector2(0.08, -1.23),
    new THREE.Vector2(0.145, -1.14),
    new THREE.Vector2(0.19, -0.75),
    new THREE.Vector2(0.24, -0.2),
    new THREE.Vector2(0.265, 0.05),
    new THREE.Vector2(0.285, 0.11),
    new THREE.Vector2(0.285, 0.19),
    new THREE.Vector2(0.23, 0.21),
    new THREE.Vector2(0.0, 0.21),
  ];
  const coreGeo = new THREE.LatheGeometry(coreProfile, 40);
  const coreMesh = new THREE.Mesh(coreGeo, titaniumMat);
  group.add(coreMesh);

  // Anodized prosthetic collar ring
  const collarGeo = new THREE.CylinderGeometry(0.292, 0.275, 0.095, 40);
  const collarMesh = new THREE.Mesh(collarGeo, collarMat);
  collarMesh.position.y = 0.155;
  group.add(collarMesh);

  // Helical spiral thread wrapping cleanly around the tapered body
  const turns = 6.2;
  const samples = 140;
  const points = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const angle = t * Math.PI * 2 * turns;
    const y = THREE.MathUtils.lerp(-1.12, 0.02, t);
    const baseRadius = THREE.MathUtils.lerp(0.148, 0.262, Math.pow(t, 0.88));
    // Fade thread radius smoothly at both ends
    const edgeFade = Math.sin(Math.min(1, t * 8) * (Math.PI / 2)) *
      Math.sin(Math.min(1, (1 - t) * 8) * (Math.PI / 2));
    const r = baseRadius + 0.036 * edgeFade;
    points.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
  }
  const helixCurve = new THREE.CatmullRomCurve3(points);
  const threadGeo = new THREE.TubeGeometry(helixCurve, 136, 0.031, 7, false);
  const threadMesh = new THREE.Mesh(threadGeo, threadMat);
  group.add(threadMesh);

  return group;
}

/**
 * Builds a precision prosthetic abutment (emergence collar + tapered post).
 */
export function createAbutment({ color = 0x5ef2b8 } = {}) {
  const profile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.21, 0.0),
    new THREE.Vector2(0.23, 0.05),
    new THREE.Vector2(0.29, 0.14),
    new THREE.Vector2(0.295, 0.2),
    new THREE.Vector2(0.215, 0.24),
    new THREE.Vector2(0.185, 0.48),
    new THREE.Vector2(0.14, 0.56),
    new THREE.Vector2(0.0, 0.56),
  ];
  const geo = new THREE.LatheGeometry(profile, 36);
  const mat = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.6,
    roughness: 0.22,
    clearcoat: 0.6,
  });
  return new THREE.Mesh(geo, mat);
}

/**
 * Builds an anatomical 3D molar/premolar crown with sculpted cusps and occlusal fossa.
 * Bottom sits cleanly at y = 0 to seat flush onto the abutment.
 */
export function createAnatomicalCrown({ wireframe = false } = {}) {
  const group = new THREE.Group();

  const radialSegs = 44;
  const heightSegs = 22;
  const geo = new THREE.CylinderGeometry(1, 1, 1, radialSegs, heightSegs, false);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i); // [-0.5, 0.5]
    const vz = pos.getZ(i);

    const t = vy + 0.5; // 0 at cervical neck -> 1 at occlusal top
    const r = Math.hypot(vx, vz);
    const angle = Math.atan2(vz, vx);

    // Rounded square tooth cross-section
    const squareness = 0.08 * Math.cos(4 * angle);
    // Slight mesio-distal vs bucco-lingual oval proportion
    const aspectX = 1.07;
    const aspectZ = 0.94;

    // Bulging emergence profile from neck (0.28) to mid-crown (0.56), tapering slightly at cusps (0.48)
    let profileRadius;
    if (t < 0.68) {
      const k = t / 0.68;
      profileRadius = 0.275 + 0.295 * Math.sin(k * (Math.PI / 2));
    } else {
      const k = (t - 0.68) / 0.32;
      profileRadius = 0.57 - 0.085 * k * k;
    }

    const scaleR = r > 0.0001 ? profileRadius * (1 + squareness * Math.sin(t * Math.PI)) : 0;
    const nx = Math.cos(angle) * scaleR * r * aspectX;
    const nz = Math.sin(angle) * scaleR * r * aspectZ;

    // Sculpt occlusal cusps & central groove on the upper surface
    let ny = t * 0.92;
    if (t > 0.88) {
      const radialNorm = Math.min(1, r);
      const cuspWave =
        0.095 * Math.pow(radialNorm, 1.3) * (0.55 + 0.45 * Math.cos(4 * angle + Math.PI / 4));
      const centralDip = -0.14 * Math.pow(1 - radialNorm, 1.6);
      ny += (cuspWave + centralDip) * ((t - 0.88) / 0.12);
    }

    pos.setXYZ(i, nx, ny, nz);
  }

  geo.computeVertexNormals();

  if (wireframe) {
    const holoMat = new THREE.MeshPhysicalMaterial({
      color: 0x167ffc,
      transparent: true,
      opacity: 0.24,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const holoMesh = new THREE.Mesh(geo, holoMat);
    group.add(holoMesh);

    const wireGeo = new THREE.WireframeGeometry(geo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.55,
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    group.add(wireLines);
    return group;
  }

  const ceramicMat = new THREE.MeshPhysicalMaterial({
    color: 0xf7f9ff,
    emissive: 0x10183a,
    emissiveIntensity: 0.14,
    roughness: 0.14,
    metalness: 0.03,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const mesh = new THREE.Mesh(geo, ceramicMat);
  group.add(mesh);

  // Subtle violet-pearl cervical rim accent for crisp silhouette separation
  const rimGeo = new THREE.TorusGeometry(0.285, 0.015, 12, 40);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x9b8aff,
    roughness: 0.3,
    metalness: 0.2,
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.01;
  group.add(rim);

  return group;
}

/**
 * Builds a translucent alveolar bone segment for surgical context.
 */
export function createJawBoneBed() {
  const group = new THREE.Group();

  const shape = new THREE.Shape();
  shape.moveTo(-0.85, -1.45);
  shape.quadraticCurveTo(-0.92, -0.35, -0.78, 0.05);
  shape.quadraticCurveTo(-0.62, 0.16, -0.34, 0.12);
  shape.lineTo(0.34, 0.12);
  shape.quadraticCurveTo(0.62, 0.16, 0.78, 0.05);
  shape.quadraticCurveTo(0.92, -0.35, 0.85, -1.45);
  shape.quadraticCurveTo(0, -1.62, -0.85, -1.45);

  const extrudeSettings = {
    depth: 0.82,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  };
  const boneGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  boneGeo.translate(0, 0, -0.41);

  const boneMat = new THREE.MeshPhysicalMaterial({
    color: 0x6b7cff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.3,
    metalness: 0.05,
    depthWrite: false,
  });
  const boneMesh = new THREE.Mesh(boneGeo, boneMat);
  group.add(boneMesh);

  const edges = new THREE.EdgesGeometry(boneGeo, 24);
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x8ea4ff,
    transparent: true,
    opacity: 0.32,
  });
  group.add(new THREE.LineSegments(edges, edgeMat));

  // Gum crest contour ring
  const gumGeo = new THREE.TorusGeometry(0.42, 0.016, 10, 42);
  const gumMat = new THREE.MeshBasicMaterial({
    color: 0x5ef2b8,
    transparent: true,
    opacity: 0.45,
  });
  const gumRing = new THREE.Mesh(gumGeo, gumMat);
  gumRing.rotation.x = Math.PI / 2;
  gumRing.position.y = 0.19;
  group.add(gumRing);

  return group;
}

/**
 * Builds a translucent surgical 3D guide template with a precision metal sleeve.
 */
export function createSurgicalGuide() {
  const group = new THREE.Group();

  const bridgeGeo = new THREE.BoxGeometry(1.55, 0.12, 0.64);
  const bridgeMat = new THREE.MeshPhysicalMaterial({
    color: 0x5ef2b8,
    transparent: true,
    opacity: 0.25,
    roughness: 0.15,
    metalness: 0.1,
  });
  const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
  group.add(bridge);

  const sleeveGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 32, 1, true);
  const sleeveMat = new THREE.MeshStandardMaterial({
    color: 0x5ef2b8,
    metalness: 0.7,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
  group.add(sleeve);

  const rimGeo = new THREE.TorusGeometry(0.36, 0.025, 10, 32);
  const rim = new THREE.Mesh(rimGeo, sleeveMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.13;
  group.add(rim);

  return group;
}

/**
 * Builds a natural two-rooted diagnostic tooth for Step 1 (CBCT Scan).
 */
export function createDiagnosticTooth() {
  const group = new THREE.Group();
  const crown = createAnatomicalCrown({ wireframe: false });
  crown.position.y = 0.15;
  group.add(crown);

  const rootMat = new THREE.MeshPhysicalMaterial({
    color: 0xdbe3ff,
    transparent: true,
    opacity: 0.78,
    roughness: 0.35,
  });

  const rootProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.14, 0.0),
    new THREE.Vector2(0.11, -0.55),
    new THREE.Vector2(0.04, -1.05),
    new THREE.Vector2(0.0, -1.14),
  ];
  const rootGeo = new THREE.LatheGeometry(rootProfile, 24);

  const leftRoot = new THREE.Mesh(rootGeo, rootMat);
  leftRoot.position.set(-0.14, 0.2, 0);
  leftRoot.rotation.z = -0.14;
  group.add(leftRoot);

  const rightRoot = new THREE.Mesh(rootGeo, rootMat);
  rightRoot.position.set(0.14, 0.2, 0);
  rightRoot.rotation.z = 0.14;
  group.add(rightRoot);

  return group;
}

/**
 * Safely disposes all geometries and materials inside an Object3D subtree.
 */
export function disposeObject3D(root) {
  if (!root) return;
  root.traverse((node) => {
    if (node.geometry) {
      node.geometry.dispose();
    }
    if (node.material) {
      if (Array.isArray(node.material)) {
        node.material.forEach((mat) => mat.dispose());
      } else {
        node.material.dispose();
      }
    }
  });
}
