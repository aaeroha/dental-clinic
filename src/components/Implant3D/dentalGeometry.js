import * as THREE from "three";

/**
 * Sets up balanced studio lighting for titanium, zirconia, pink gingiva, and bone.
 */
export function setupDentalLighting(scene) {
  const ambient = new THREE.AmbientLight(0xe4ecff, 0.95);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x22295c, 0.85);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.9);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x9bc4ff, 1.0);
  fillLight.position.set(-5, 2, 4);
  scene.add(fillLight);

  const rimMint = new THREE.DirectionalLight(0x5ef2b8, 1.05);
  rimMint.position.set(-3, -2, -4);
  scene.add(rimMint);

  const rimViolet = new THREE.PointLight(0x7c66f0, 1.25, 14);
  rimViolet.position.set(3.5, -1.5, 2.5);
  scene.add(rimViolet);
}

/**
 * Builds a high-detail titanium dental implant with tapered core, collar, and helical threads.
 * Top prosthetic platform rests cleanly at y = 0.
 */
export function createTitaniumImplant({
  coreColor = 0xcad4e6,
  collarColor = 0x7c66f0,
  threadColor = 0xeaf0fc,
} = {}) {
  const group = new THREE.Group();

  const titaniumMat = new THREE.MeshPhysicalMaterial({
    color: coreColor,
    metalness: 0.88,
    roughness: 0.22,
    clearcoat: 0.35,
    clearcoatRoughness: 0.18,
  });

  const threadMat = new THREE.MeshPhysicalMaterial({
    color: threadColor,
    metalness: 0.92,
    roughness: 0.16,
    clearcoat: 0.45,
  });

  const collarMat = new THREE.MeshPhysicalMaterial({
    color: collarColor,
    metalness: 0.72,
    roughness: 0.24,
    clearcoat: 0.55,
  });

  // Tapered implant core (y from -1.38 apex to 0.0 platform)
  const coreProfile = [
    new THREE.Vector2(0.0, -1.38),
    new THREE.Vector2(0.08, -1.36),
    new THREE.Vector2(0.14, -1.26),
    new THREE.Vector2(0.19, -0.85),
    new THREE.Vector2(0.24, -0.32),
    new THREE.Vector2(0.265, -0.09),
    new THREE.Vector2(0.285, -0.04),
    new THREE.Vector2(0.285, 0.0),
    new THREE.Vector2(0.22, 0.0),
    new THREE.Vector2(0.0, 0.0),
  ];
  const coreGeo = new THREE.LatheGeometry(coreProfile, 40);
  group.add(new THREE.Mesh(coreGeo, titaniumMat));

  // Anodized cortical collar band
  const collarGeo = new THREE.CylinderGeometry(0.292, 0.275, 0.09, 40);
  const collarMesh = new THREE.Mesh(collarGeo, collarMat);
  collarMesh.position.y = -0.045;
  group.add(collarMesh);

  // Helical spiral buttress thread
  const turns = 6.5;
  const samples = 150;
  const points = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const angle = t * Math.PI * 2 * turns;
    const y = THREE.MathUtils.lerp(-1.26, -0.14, t);
    const baseRadius = THREE.MathUtils.lerp(0.142, 0.26, Math.pow(t, 0.88));
    const edgeFade =
      Math.sin(Math.min(1, t * 8) * (Math.PI / 2)) *
      Math.sin(Math.min(1, (1 - t) * 8) * (Math.PI / 2));
    const r = baseRadius + 0.038 * edgeFade;
    points.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
  }
  const helixCurve = new THREE.CatmullRomCurve3(points);
  const threadGeo = new THREE.TubeGeometry(helixCurve, 144, 0.032, 8, false);
  group.add(new THREE.Mesh(threadGeo, threadMat));

  return group;
}

/**
 * Builds a precision prosthetic abutment (transmucosal emergence profile from y=0 to y=0.66).
 */
export function createAbutment({ color = 0x5ef2b8 } = {}) {
  const profile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.21, 0.0),
    new THREE.Vector2(0.23, 0.06),
    new THREE.Vector2(0.295, 0.22),
    new THREE.Vector2(0.305, 0.29),
    new THREE.Vector2(0.22, 0.33),
    new THREE.Vector2(0.185, 0.56),
    new THREE.Vector2(0.14, 0.66),
    new THREE.Vector2(0.0, 0.66),
  ];
  const geo = new THREE.LatheGeometry(profile, 36);
  const mat = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.62,
    roughness: 0.22,
    clearcoat: 0.6,
  });
  return new THREE.Mesh(geo, mat);
}

/**
 * Builds an anatomical 3D molar/premolar crown with sculpted cusps & central occlusal fossa.
 * Cervical base sits cleanly at y = 0.
 */
export function createAnatomicalCrown({
  wireframe = false,
  color = 0xf7f9ff,
} = {}) {
  const group = new THREE.Group();

  const radialSegs = 44;
  const heightSegs = 22;
  const geo = new THREE.CylinderGeometry(1, 1, 1, radialSegs, heightSegs, false);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);

    const t = vy + 0.5;
    const r = Math.hypot(vx, vz);
    const angle = Math.atan2(vz, vx);

    const squareness = 0.08 * Math.cos(4 * angle);
    const aspectX = 1.08;
    const aspectZ = 0.94;

    let profileRadius;
    if (t < 0.68) {
      const k = t / 0.68;
      profileRadius = 0.295 + 0.285 * Math.sin(k * (Math.PI / 2));
    } else {
      const k = (t - 0.68) / 0.32;
      profileRadius = 0.58 - 0.09 * k * k;
    }

    const scaleR =
      r > 0.0001
        ? profileRadius * (1 + squareness * Math.sin(t * Math.PI))
        : 0;
    const nx = Math.cos(angle) * scaleR * r * aspectX;
    const nz = Math.sin(angle) * scaleR * r * aspectZ;

    let ny = t * 0.94;
    if (t > 0.88) {
      const radialNorm = Math.min(1, r);
      const cuspWave =
        0.1 *
        Math.pow(radialNorm, 1.3) *
        (0.55 + 0.45 * Math.cos(4 * angle + Math.PI / 4));
      const centralDip = -0.145 * Math.pow(1 - radialNorm, 1.6);
      ny += (cuspWave + centralDip) * ((t - 0.88) / 0.12);
    }

    pos.setXYZ(i, nx, ny, nz);
  }

  geo.computeVertexNormals();

  if (wireframe) {
    const holoMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    group.add(new THREE.Mesh(geo, holoMat));

    const wireGeo = new THREE.WireframeGeometry(geo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x5ef2b8,
      transparent: true,
      opacity: 0.55,
    });
    group.add(new THREE.LineSegments(wireGeo, wireMat));
    return group;
  }

  const ceramicMat = new THREE.MeshPhysicalMaterial({
    color,
    emissive: 0x10183a,
    emissiveIntensity: 0.12,
    roughness: 0.14,
    metalness: 0.03,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  group.add(new THREE.Mesh(geo, ceramicMat));
  return group;
}

/**
 * Builds an anatomically distinct jaw segment:
 *  - Lower cortical + spongy alveolar bone block (ivory-beige, semi-translucent so roots/implants show through, y: -1.48 .. 0.0)
 *  - Upper soft gingival mucosa saddle (coral pink, glossy, sitting directly atop bone crest, y: 0.0 .. +0.26)
 */
export function createJawAnatomy() {
  const group = new THREE.Group();

  // 1. Alveolar Bone Block (y = -1.48 .. 0.0)
  const boneShape = new THREE.Shape();
  boneShape.moveTo(-0.92, -1.42);
  boneShape.quadraticCurveTo(-0.98, -0.42, -0.84, -0.02);
  boneShape.quadraticCurveTo(-0.6, 0.03, 0.0, 0.01);
  boneShape.quadraticCurveTo(0.6, 0.03, 0.84, -0.02);
  boneShape.quadraticCurveTo(0.98, -0.42, 0.92, -1.42);
  boneShape.quadraticCurveTo(0, -1.58, -0.92, -1.42);

  const boneGeo = new THREE.ExtrudeGeometry(boneShape, {
    depth: 0.88,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.07,
    bevelThickness: 0.07,
  });
  boneGeo.translate(0, 0, -0.44);

  const boneMat = new THREE.MeshPhysicalMaterial({
    color: 0xebd7b2,
    emissive: 0x3d2e18,
    emissiveIntensity: 0.18,
    transparent: true,
    opacity: 0.42,
    roughness: 0.6,
    metalness: 0.02,
    depthWrite: false,
  });
  group.add(new THREE.Mesh(boneGeo, boneMat));

  // Crisp cortical bone outline
  const boneEdges = new THREE.EdgesGeometry(boneGeo, 28);
  const boneEdgeMat = new THREE.LineBasicMaterial({
    color: 0xf7e7c8,
    transparent: true,
    opacity: 0.42,
  });
  group.add(new THREE.LineSegments(boneEdges, boneEdgeMat));

  // Subtle internal trabecular bone lattice grid for clear medical readout
  const trabGeo = new THREE.BoxGeometry(1.42, 1.05, 0.56, 5, 4, 2);
  const trabWire = new THREE.WireframeGeometry(trabGeo);
  const trabMat = new THREE.LineBasicMaterial({
    color: 0xe6cfa8,
    transparent: true,
    opacity: 0.12,
  });
  const trabMesh = new THREE.LineSegments(trabWire, trabMat);
  trabMesh.position.y = -0.74;
  group.add(trabMesh);

  // 2. Coral-Pink Gingiva / Mucosa Layer (y = 0.0 .. +0.28) sitting snugly on top of the bone crest
  const gumShape = new THREE.Shape();
  gumShape.moveTo(-0.88, -0.06);
  gumShape.quadraticCurveTo(-0.92, 0.18, -0.74, 0.27);
  gumShape.lineTo(-0.34, 0.27);
  gumShape.quadraticCurveTo(-0.22, 0.22, 0.0, 0.22);
  gumShape.quadraticCurveTo(0.22, 0.22, 0.34, 0.27);
  gumShape.lineTo(0.74, 0.27);
  gumShape.quadraticCurveTo(0.92, 0.18, 0.88, -0.06);
  gumShape.quadraticCurveTo(0.55, 0.02, 0.0, 0.0);
  gumShape.quadraticCurveTo(-0.55, 0.02, -0.88, -0.06);

  const gumGeo = new THREE.ExtrudeGeometry(gumShape, {
    depth: 0.94,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.06,
  });
  gumGeo.translate(0, 0, -0.47);

  const gumMat = new THREE.MeshPhysicalMaterial({
    color: 0xe86c8a,
    emissive: 0x420c1a,
    emissiveIntensity: 0.24,
    transparent: true,
    opacity: 0.72,
    roughness: 0.25,
    metalness: 0.02,
    clearcoat: 0.75,
    clearcoatRoughness: 0.18,
    depthWrite: false,
  });
  group.add(new THREE.Mesh(gumGeo, gumMat));

  // Soft gingival collar cuff around center emergence zone (y = 0.28)
  const cuffGeo = new THREE.TorusGeometry(0.32, 0.032, 12, 42);
  const cuffMat = new THREE.MeshPhysicalMaterial({
    color: 0xf285a0,
    roughness: 0.25,
    clearcoat: 0.7,
  });
  const cuff = new THREE.Mesh(cuffGeo, cuffMat);
  cuff.rotation.x = Math.PI / 2;
  cuff.position.y = 0.27;
  group.add(cuff);

  return group;
}

/**
 * Builds a translucent surgical 3D-printed CAD/CAM guide template seated over the gingiva,
 * with a machined titanium/mint cylindrical sleeve guiding the implant at 90.0 deg.
 */
export function createSurgicalGuide() {
  const group = new THREE.Group();

  const archShape = new THREE.Shape();
  archShape.moveTo(-0.88, 0.22);
  archShape.quadraticCurveTo(-0.88, 0.44, -0.68, 0.48);
  archShape.lineTo(0.68, 0.48);
  archShape.quadraticCurveTo(0.88, 0.44, 0.88, 0.22);
  archShape.lineTo(0.76, 0.22);
  archShape.quadraticCurveTo(0.74, 0.34, 0.56, 0.35);
  archShape.lineTo(-0.56, 0.35);
  archShape.quadraticCurveTo(-0.74, 0.34, -0.76, 0.22);
  archShape.closePath();

  const resinGeo = new THREE.ExtrudeGeometry(archShape, {
    depth: 0.86,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  resinGeo.translate(0, 0, -0.43);

  const resinMat = new THREE.MeshPhysicalMaterial({
    color: 0x64f5d2,
    transparent: true,
    opacity: 0.28,
    roughness: 0.14,
    metalness: 0.05,
    clearcoat: 0.9,
    depthWrite: false,
  });
  group.add(new THREE.Mesh(resinGeo, resinMat));

  // Precision guide sleeve
  const sleeveGeo = new THREE.CylinderGeometry(0.37, 0.37, 0.32, 36, 1, true);
  const sleeveMat = new THREE.MeshStandardMaterial({
    color: 0x5ef2b8,
    metalness: 0.78,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
  sleeve.position.y = 0.42;
  group.add(sleeve);

  const rimGeo = new THREE.TorusGeometry(0.37, 0.026, 10, 36);
  const rim = new THREE.Mesh(rimGeo, sleeveMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.58;
  group.add(rim);

  return group;
}

/**
 * Builds a natural two-rooted diagnostic tooth with visible internal root canals
 * for realistic Stage 1 CBCT 3D tomography.
 */
export function createDiagnosticTooth() {
  const group = new THREE.Group();

  const crown = createAnatomicalCrown({
    wireframe: false,
    color: 0xf4efe2,
  });
  crown.position.y = 0.24;
  group.add(crown);

  const rootMat = new THREE.MeshPhysicalMaterial({
    color: 0xefe3c8,
    transparent: true,
    opacity: 0.78,
    roughness: 0.36,
    depthWrite: false,
  });

  const canalMat = new THREE.MeshBasicMaterial({
    color: 0xff5c8a,
    transparent: true,
    opacity: 0.95,
  });

  const rootProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.155, 0.0),
    new THREE.Vector2(0.12, -0.58),
    new THREE.Vector2(0.045, -1.08),
    new THREE.Vector2(0.0, -1.16),
  ];
  const rootGeo = new THREE.LatheGeometry(rootProfile, 26);

  [-1, 1].forEach((dir) => {
    const rootPivot = new THREE.Group();
    rootPivot.position.set(dir * 0.14, 0.28, 0);
    rootPivot.rotation.z = dir * 0.15;

    rootPivot.add(new THREE.Mesh(rootGeo, rootMat));

    const canalGeo = new THREE.CylinderGeometry(0.022, 0.008, 1.04, 12);
    const canal = new THREE.Mesh(canalGeo, canalMat);
    canal.position.y = -0.54;
    rootPivot.add(canal);

    group.add(rootPivot);
  });

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
