import * as THREE from "three";

/**
 * Sets up balanced studio lighting for titanium, zirconia, pink gingiva, and bone.
 */
export function setupDentalLighting(scene) {
  const ambient = new THREE.AmbientLight(0xebefff, 1.0);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x262d5e, 0.9);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.9);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xa3c9ff, 0.95);
  fillLight.position.set(-5, 2, 4);
  scene.add(fillLight);

  const rimMint = new THREE.DirectionalLight(0x5ef2b8, 0.85);
  rimMint.position.set(-3, -2, -4);
  scene.add(rimMint);

  const rimViolet = new THREE.PointLight(0x7c66f0, 1.1, 14);
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

  const coreProfile = [
    new THREE.Vector2(0.0, -1.36),
    new THREE.Vector2(0.08, -1.34),
    new THREE.Vector2(0.14, -1.24),
    new THREE.Vector2(0.19, -0.84),
    new THREE.Vector2(0.24, -0.32),
    new THREE.Vector2(0.265, -0.09),
    new THREE.Vector2(0.285, -0.04),
    new THREE.Vector2(0.285, 0.0),
    new THREE.Vector2(0.22, 0.0),
    new THREE.Vector2(0.0, 0.0),
  ];
  const coreMesh = new THREE.Mesh(new THREE.LatheGeometry(coreProfile, 40), titaniumMat);
  coreMesh.renderOrder = 1;
  group.add(coreMesh);

  const collarMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.292, 0.275, 0.09, 40),
    collarMat
  );
  collarMesh.position.y = -0.045;
  collarMesh.renderOrder = 1;
  group.add(collarMesh);

  const turns = 6.5;
  const samples = 150;
  const points = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const angle = t * Math.PI * 2 * turns;
    const y = THREE.MathUtils.lerp(-1.24, -0.14, t);
    const baseRadius = THREE.MathUtils.lerp(0.142, 0.26, Math.pow(t, 0.88));
    const edgeFade =
      Math.sin(Math.min(1, t * 8) * (Math.PI / 2)) *
      Math.sin(Math.min(1, (1 - t) * 8) * (Math.PI / 2));
    const r = baseRadius + 0.038 * edgeFade;
    points.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
  }
  const threadMesh = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 144, 0.032, 8, false),
    threadMat
  );
  threadMesh.renderOrder = 1;
  group.add(threadMesh);

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
    new THREE.Vector2(0.295, 0.2),
    new THREE.Vector2(0.305, 0.27),
    new THREE.Vector2(0.22, 0.31),
    new THREE.Vector2(0.185, 0.56),
    new THREE.Vector2(0.14, 0.66),
    new THREE.Vector2(0.0, 0.66),
  ];
  const mesh = new THREE.Mesh(
    new THREE.LatheGeometry(profile, 36),
    new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.62,
      roughness: 0.22,
      clearcoat: 0.6,
    })
  );
  mesh.renderOrder = 1;
  return mesh;
}

/**
 * Builds a realistic anatomical molar/premolar crown with sculpted cusps & central fossa.
 * Cervical base sits cleanly at y = 0.
 */
export function createAnatomicalCrown({
  wireframe = false,
  color = 0xf7f9ff,
} = {}) {
  const group = new THREE.Group();

  const radialSegs = 48;
  const heightSegs = 24;
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
    if (t < 0.66) {
      const k = t / 0.66;
      profileRadius = 0.3 + 0.275 * Math.sin(k * (Math.PI / 2));
    } else {
      const k = (t - 0.66) / 0.34;
      profileRadius = 0.575 - 0.085 * k * k;
    }

    const scaleR =
      r > 0.0001
        ? profileRadius * (1 + squareness * Math.sin(t * Math.PI))
        : 0;
    const nx = Math.cos(angle) * scaleR * r * aspectX;
    const nz = Math.sin(angle) * scaleR * r * aspectZ;

    let ny = t * 0.94;
    if (t > 0.87) {
      const radialNorm = Math.min(1, r);
      const cuspWave =
        0.095 *
        Math.pow(radialNorm, 1.35) *
        (0.55 + 0.45 * Math.cos(4 * angle + Math.PI / 4));
      const centralDip = -0.14 * Math.pow(1 - radialNorm, 1.65);
      ny += (cuspWave + centralDip) * ((t - 0.87) / 0.13);
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
      depthWrite: false,
    });
    const holoMesh = new THREE.Mesh(geo, holoMat);
    holoMesh.renderOrder = 3;
    group.add(holoMesh);

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

  const mesh = new THREE.Mesh(geo, ceramicMat);
  mesh.renderOrder = 1;
  group.add(mesh);
  return group;
}

/**
 * Builds an anatomically clear jaw segment with ordered render passes to prevent transparency artifacts:
 *  - Alveolar Bone Block (warm ivory-beige, renderOrder 2, no interior wireframe clutter)
 *  - Soft Gingival Mucosa Saddle (warm coral pink sitting atop bone crest, renderOrder 3)
 */
export function createJawAnatomy() {
  const group = new THREE.Group();

  // 1. Warm Ivory-Beige Alveolar Bone (y = -1.48 .. -0.02)
  const boneShape = new THREE.Shape();
  boneShape.moveTo(-0.88, -1.42);
  boneShape.quadraticCurveTo(-0.96, -0.45, -0.84, -0.02);
  boneShape.quadraticCurveTo(-0.45, 0.03, 0.0, 0.02);
  boneShape.quadraticCurveTo(0.45, 0.03, 0.84, -0.02);
  boneShape.quadraticCurveTo(0.96, -0.45, 0.88, -1.42);
  boneShape.quadraticCurveTo(0, -1.56, -0.88, -1.42);

  const boneGeo = new THREE.ExtrudeGeometry(boneShape, {
    depth: 0.84,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.07,
    bevelThickness: 0.07,
  });
  boneGeo.translate(0, 0, -0.42);

  const boneMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2d9aa,
    emissive: 0x5c421e,
    emissiveIntensity: 0.42,
    transparent: true,
    opacity: 0.56,
    roughness: 0.58,
    metalness: 0.02,
    depthWrite: false,
  });
  const boneMesh = new THREE.Mesh(boneGeo, boneMat);
  boneMesh.renderOrder = 2;
  group.add(boneMesh);

  // Clean subtle bone silhouette outline (outer cortical contour only)
  const boneEdges = new THREE.EdgesGeometry(boneGeo, 35);
  const boneEdgeMat = new THREE.LineBasicMaterial({
    color: 0xffe8be,
    transparent: true,
    opacity: 0.42,
  });
  const boneEdgeLines = new THREE.LineSegments(boneEdges, boneEdgeMat);
  boneEdgeLines.renderOrder = 2;
  group.add(boneEdgeLines);

  // 2. Coral-Pink Gingiva Saddle sitting cleanly over the bone crest (y = -0.02 .. +0.23)
  const gumShape = new THREE.Shape();
  gumShape.moveTo(-0.92, -0.04);
  gumShape.quadraticCurveTo(-0.92, 0.16, -0.72, 0.22);
  gumShape.lineTo(-0.34, 0.22);
  gumShape.quadraticCurveTo(-0.18, 0.18, 0.0, 0.18);
  gumShape.quadraticCurveTo(0.18, 0.18, 0.34, 0.22);
  gumShape.lineTo(0.72, 0.22);
  gumShape.quadraticCurveTo(0.92, 0.16, 0.92, -0.04);
  gumShape.quadraticCurveTo(0.46, 0.02, 0.0, 0.0);
  gumShape.quadraticCurveTo(-0.46, 0.02, -0.92, -0.04);

  const gumGeo = new THREE.ExtrudeGeometry(gumShape, {
    depth: 0.9,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.06,
  });
  gumGeo.translate(0, 0, -0.45);

  const gumMat = new THREE.MeshPhysicalMaterial({
    color: 0xee6c8c,
    emissive: 0x5c1125,
    emissiveIntensity: 0.38,
    transparent: true,
    opacity: 0.82,
    roughness: 0.24,
    metalness: 0.02,
    clearcoat: 0.72,
    clearcoatRoughness: 0.18,
    depthWrite: false,
  });
  const gumMesh = new THREE.Mesh(gumGeo, gumMat);
  gumMesh.renderOrder = 3;
  group.add(gumMesh);

  return group;
}

/**
 * Builds a translucent surgical CAD/CAM 3D guide template seated snugly over the gingiva,
 * with a precision machined metallic guide sleeve.
 */
export function createSurgicalGuide() {
  const group = new THREE.Group();

  const archShape = new THREE.Shape();
  archShape.moveTo(-0.88, 0.17);
  archShape.quadraticCurveTo(-0.88, 0.4, -0.68, 0.44);
  archShape.lineTo(0.68, 0.44);
  archShape.quadraticCurveTo(0.88, 0.4, 0.88, 0.17);
  archShape.lineTo(0.76, 0.17);
  archShape.quadraticCurveTo(0.74, 0.3, 0.56, 0.31);
  archShape.lineTo(-0.56, 0.31);
  archShape.quadraticCurveTo(-0.74, 0.3, -0.76, 0.17);
  archShape.closePath();

  const resinGeo = new THREE.ExtrudeGeometry(archShape, {
    depth: 0.84,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  resinGeo.translate(0, 0, -0.42);

  const resinMat = new THREE.MeshPhysicalMaterial({
    color: 0x64f5d2,
    transparent: true,
    opacity: 0.28,
    roughness: 0.14,
    metalness: 0.05,
    clearcoat: 0.9,
    depthWrite: false,
  });
  const resinMesh = new THREE.Mesh(resinGeo, resinMat);
  resinMesh.renderOrder = 4;
  group.add(resinMesh);

  const sleeveMat = new THREE.MeshStandardMaterial({
    color: 0x5ef2b8,
    metalness: 0.78,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const sleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.36, 0.32, 36, 1, true),
    sleeveMat
  );
  sleeve.position.y = 0.38;
  sleeve.renderOrder = 4;
  group.add(sleeve);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.026, 10, 36), sleeveMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.54;
  rim.renderOrder = 4;
  group.add(rim);

  return group;
}

/**
 * Builds a realistic natural tooth with unified cervical root trunk + curved anatomical roots
 * (seated seamlessly through pink gingiva into ivory bone with subtle inner root canals).
 */
export function createDiagnosticTooth() {
  const group = new THREE.Group();

  // Enamel crown seated snugly into pink gingiva margin (cervix starts inside gum at y = 0.18)
  const crown = createAnatomicalCrown({
    wireframe: false,
    color: 0xf4efe3,
  });
  crown.position.y = 0.18;
  group.add(crown);

  // Unified solid dentin/cementum root material (opaque & clean -> zero overlapping alpha artifacts)
  const dentinMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6d3a7,
    emissive: 0x3b2d14,
    emissiveIntensity: 0.18,
    roughness: 0.45,
    metalness: 0.02,
  });

  // Seamless cervical root trunk connecting crown base (y=0.22) down to root furcation (y=-0.22)
  const trunkProfile = [
    new THREE.Vector2(0.0, 0.22),
    new THREE.Vector2(0.28, 0.22),
    new THREE.Vector2(0.27, 0.04),
    new THREE.Vector2(0.23, -0.14),
    new THREE.Vector2(0.16, -0.24),
    new THREE.Vector2(0.0, -0.26),
  ];
  const trunkMesh = new THREE.Mesh(new THREE.LatheGeometry(trunkProfile, 32), dentinMat);
  trunkMesh.scale.set(1.06, 1, 0.88);
  trunkMesh.renderOrder = 1;
  group.add(trunkMesh);

  // Two smoothly curved anatomical roots descending deep into alveolar bone
  [-1, 1].forEach((dir) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(dir * 0.14, -0.08, 0),
      new THREE.Vector3(dir * 0.22, -0.45, dir * 0.02),
      new THREE.Vector3(dir * 0.24, -0.86, 0),
      new THREE.Vector3(dir * 0.19, -1.18, -dir * 0.02),
    ]);

    const segs = 36;
    const radial = 16;
    const tubeGeo = new THREE.TubeGeometry(curve, segs, 0.115, radial, false);
    const pos = tubeGeo.attributes.position;

    // Taper tube cleanly toward the root apex
    for (let i = 0; i < pos.count; i++) {
      const ringIdx = Math.floor(i / (radial + 1));
      const t = ringIdx / segs;
      const center = curve.getPointAt(Math.min(1, t));
      const taper = THREE.MathUtils.lerp(1.15, 0.18, Math.pow(t, 0.85));

      const dx = (pos.getX(i) - center.x) * taper;
      const dy = (pos.getY(i) - center.y) * taper;
      const dz = (pos.getZ(i) - center.z) * taper;
      pos.setXYZ(i, center.x + dx, center.y + dy, center.z + dz);
    }
    tubeGeo.computeVertexNormals();

    const rootMesh = new THREE.Mesh(tubeGeo, dentinMat);
    rootMesh.renderOrder = 1;
    group.add(rootMesh);

    // Rounded root apex cap
    const apexMesh = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), dentinMat);
    apexMesh.position.set(dir * 0.19, -1.18, -dir * 0.02);
    apexMesh.renderOrder = 1;
    group.add(apexMesh);
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
