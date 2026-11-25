/**
 * Procedural 3D Plant GLB Generator for PLANTIFY
 * Generates realistic 3D plant models in Khronos glTF 2.0 binary (.glb) format.
 * Includes detailed procedural meshes: Pots, Soil, Stems, and botanical foliage (Monstera, Snake Plant, ZZ Plant).
 */

import fs from 'fs';
import path from 'path';

class GLBBuilder {
  constructor() {
    this.buffers = [];
    this.bufferViews = [];
    this.accessors = [];
    this.materials = [];
    this.meshes = [];
    this.nodes = [];
    this.totalByteLength = 0;
  }

  addData(buffer, target = 34962) {
    // Ensure 4-byte alignment
    const remainder = buffer.length % 4;
    let alignedBuffer = buffer;
    if (remainder !== 0) {
      const padding = 4 - remainder;
      alignedBuffer = Buffer.concat([buffer, Buffer.alloc(padding)]);
    }

    const byteOffset = this.totalByteLength;
    const byteLength = buffer.length;

    this.buffers.push(alignedBuffer);
    this.totalByteLength += alignedBuffer.length;

    const bufferViewIndex = this.bufferViews.length;
    this.bufferViews.push({
      buffer: 0,
      byteOffset,
      byteLength,
      target,
    });

    return bufferViewIndex;
  }

  addAccessor(bufferViewIndex, componentType, count, type, min = null, max = null) {
    const accessorIndex = this.accessors.length;
    const accessor = {
      bufferView: bufferViewIndex,
      byteOffset: 0,
      componentType,
      count,
      type,
    };
    if (min !== null) accessor.min = min;
    if (max !== null) accessor.max = max;

    this.accessors.push(accessor);
    return accessorIndex;
  }

  addMaterial({ name, baseColorFactor, metallicFactor = 0.1, roughnessFactor = 0.5, doubleSided = true }) {
    const matIndex = this.materials.length;
    this.materials.push({
      name,
      pbrMetallicRoughness: {
        baseColorFactor,
        metallicFactor,
        roughnessFactor,
      },
      doubleSided,
    });
    return matIndex;
  }

  addMesh(primitives, name = 'Mesh') {
    const meshIndex = this.meshes.length;
    this.meshes.push({
      name,
      primitives,
    });
    return meshIndex;
  }

  addNode(meshIndex, name = 'Node', translation = null, rotation = null, scale = null) {
    const nodeIndex = this.nodes.length;
    const node = { name, mesh: meshIndex };
    if (translation) node.translation = translation;
    if (rotation) node.rotation = rotation;
    if (scale) node.scale = scale;
    this.nodes.push(node);
    return nodeIndex;
  }

  build() {
    const binBuffer = Buffer.concat(this.buffers);

    const gltf = {
      asset: {
        version: '2.0',
        generator: 'PLANTIFY Procedural 3D Botanical Engine',
      },
      scenes: [{ nodes: this.nodes.map((_, i) => i) }],
      scene: 0,
      nodes: this.nodes,
      meshes: this.meshes,
      materials: this.materials,
      accessors: this.accessors,
      bufferViews: this.bufferViews,
      buffers: [
        {
          byteLength: binBuffer.length,
        },
      ],
    };

    const jsonStr = JSON.stringify(gltf);
    let jsonBuffer = Buffer.from(jsonStr, 'utf8');

    // Align JSON to 4-byte boundary with spaces (0x20)
    const jsonRemainder = jsonBuffer.length % 4;
    if (jsonRemainder !== 0) {
      const padding = 4 - jsonRemainder;
      jsonBuffer = Buffer.concat([jsonBuffer, Buffer.from(' '.repeat(padding), 'utf8')]);
    }

    // Header: 12 bytes
    const totalLength = 12 + 8 + jsonBuffer.length + 8 + binBuffer.length;
    const header = Buffer.alloc(12);
    header.writeUInt32LE(0x46546c67, 0); // "glTF"
    header.writeUInt32LE(2, 4); // version 2
    header.writeUInt32LE(totalLength, 8);

    // Chunk 0: JSON
    const chunk0Header = Buffer.alloc(8);
    chunk0Header.writeUInt32LE(jsonBuffer.length, 0);
    chunk0Header.writeUInt32LE(0x4e4f534a, 4); // "JSON"

    // Chunk 1: BIN
    const chunk1Header = Buffer.alloc(8);
    chunk1Header.writeUInt32LE(binBuffer.length, 0);
    chunk1Header.writeUInt32LE(0x004e4942, 4); // "BIN\0"

    return Buffer.concat([header, chunk0Header, jsonBuffer, chunk1Header, binBuffer]);
  }
}

// ── Math & Geometry Utilities ──
function normalize(v) {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function computeBounds(positions) {
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    if (x < min[0]) min[0] = x;
    if (y < min[1]) min[1] = y;
    if (z < min[2]) min[2] = z;
    if (x > max[0]) max[0] = x;
    if (y > max[1]) max[1] = y;
    if (z > max[2]) max[2] = z;
  }
  return { min, max };
}

function createMeshGeometry(builder, positions, normals, indices, materialIndex) {
  const posArray = new Float32Array(positions);
  const normArray = new Float32Array(normals);
  const indArray = indices.length > 65535 ? new Uint32Array(indices) : new Uint16Array(indices);

  const posBuf = Buffer.from(posArray.buffer, posArray.byteOffset, posArray.byteLength);
  const normBuf = Buffer.from(normArray.buffer, normArray.byteOffset, normArray.byteLength);
  const indBuf = Buffer.from(indArray.buffer, indArray.byteOffset, indArray.byteLength);

  const posBv = builder.addData(posBuf, 34962);
  const normBv = builder.addData(normBuf, 34962);
  const indBv = builder.addData(indBuf, 34963);

  const bounds = computeBounds(positions);

  const posAcc = builder.addAccessor(posBv, 5126, positions.length / 3, 'VEC3', bounds.min, bounds.max);
  const normAcc = builder.addAccessor(normBv, 5126, normals.length / 3, 'VEC3');
  const indAcc = builder.addAccessor(
    indBv,
    indices.length > 65535 ? 5125 : 5123,
    indices.length,
    'SCALAR'
  );

  return {
    attributes: {
      POSITION: posAcc,
      NORMAL: normAcc,
    },
    indices: indAcc,
    material: materialIndex,
  };
}

// ── 3D Shape Generators ──

/**
 * Creates an elegant modern ceramic pot
 */
function createPot(bottomR, topR, height, segments = 32) {
  const positions = [];
  const normals = [];
  const indices = [];

  // Outer cylinder / cone
  for (let yStep = 0; yStep <= 1; yStep++) {
    const y = yStep * height;
    const r = yStep === 0 ? bottomR : topR;
    const normalY = (bottomR - topR) / height;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      positions.push(cos * r, y, sin * r);
      const n = normalize([cos, normalY, sin]);
      normals.push(n[0], n[1], n[2]);
    }
  }

  // Lip / rim of the pot (gives realistic depth)
  const rimThickness = 0.02;
  const innerR = topR - rimThickness;
  const innerBottomR = bottomR - rimThickness;
  const rimY = height;

  const rimStart = positions.length / 3;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // outer rim vertex
    positions.push(cos * topR, rimY, sin * topR);
    normals.push(0, 1, 0);

    // inner rim vertex
    positions.push(cos * innerR, rimY, sin * innerR);
    normals.push(0, 1, 0);
  }

  // Indices for outer wall
  const seg1 = segments + 1;
  for (let i = 0; i < segments; i++) {
    const a = i;
    const b = i + 1;
    const c = i + seg1;
    const d = i + seg1 + 1;
    indices.push(a, c, b);
    indices.push(b, c, d);
  }

  // Indices for rim
  for (let i = 0; i < segments; i++) {
    const a = rimStart + i * 2;
    const b = a + 1;
    const c = rimStart + (i + 1) * 2;
    const d = c + 1;
    indices.push(a, b, c);
    indices.push(c, b, d);
  }

  // Bottom disc
  const botCenter = positions.length / 3;
  positions.push(0, 0, 0);
  normals.push(0, -1, 0);

  const botRing = positions.length / 3;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    positions.push(Math.cos(angle) * bottomR, 0, Math.sin(angle) * bottomR);
    normals.push(0, -1, 0);
  }
  for (let i = 0; i < segments; i++) {
    indices.push(botCenter, botRing + i, botRing + i + 1);
  }

  return { positions, normals, indices };
}

/**
 * Creates soil layer with slight organic displacement
 */
function createSoil(radius, y, segments = 24) {
  const positions = [];
  const normals = [];
  const indices = [];

  const centerIdx = 0;
  positions.push(0, y + 0.005, 0);
  normals.push(0, 1, 0);

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const jitter = Math.sin(angle * 7) * 0.004;
    positions.push(Math.cos(angle) * radius, y + jitter, Math.sin(angle) * radius);
    normals.push(0, 1, 0);
  }

  for (let i = 1; i <= segments; i++) {
    indices.push(centerIdx, i, i + 1);
  }

  return { positions, normals, indices };
}

/**
 * Creates a smooth curved 3D tube for stems
 */
function createCurvedStem(pathPoints, radius = 0.012, radialSegs = 8) {
  const positions = [];
  const normals = [];
  const indices = [];

  for (let p = 0; p < pathPoints.length; p++) {
    const curr = pathPoints[p];
    const prev = p > 0 ? pathPoints[p - 1] : curr;
    const next = p < pathPoints.length - 1 ? pathPoints[p + 1] : curr;

    const dir = normalize([next[0] - prev[0], next[1] - prev[1], next[2] - prev[2]]);
    const up = Math.abs(dir[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
    const side = normalize(cross(dir, up));
    const normal = normalize(cross(side, dir));

    // Slight taper towards leaf tip
    const r = radius * (1 - (p / pathPoints.length) * 0.35);

    for (let s = 0; s <= radialSegs; s++) {
      const angle = (s / radialSegs) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const nx = side[0] * cos + normal[0] * sin;
      const ny = side[1] * cos + normal[1] * sin;
      const nz = side[2] * cos + normal[2] * sin;

      positions.push(curr[0] + nx * r, curr[1] + ny * r, curr[2] + nz * r);
      normals.push(nx, ny, nz);
    }
  }

  const stride = radialSegs + 1;
  for (let p = 0; p < pathPoints.length - 1; p++) {
    for (let s = 0; s < radialSegs; s++) {
      const a = p * stride + s;
      const b = a + 1;
      const c = (p + 1) * stride + s;
      const d = c + 1;
      indices.push(a, c, b);
      indices.push(b, c, d);
    }
  }

  return { positions, normals, indices };
}

/**
 * Creates an iconic Monstera Deliciosa leaf blade with signature fenestrations / lobes
 */
function createMonsteraLeaf(center, normalDir, tangentDir, width, length) {
  const positions = [];
  const normals = [];
  const indices = [];

  const sideDir = normalize(cross(normalDir, tangentDir));
  const norm = normalize(normalDir);

  const stepsL = 14;
  const stepsW = 10;

  for (let i = 0; i <= stepsL; i++) {
    const v = i / stepsL; // 0 (base) to 1 (tip)
    // Heart/broad oval profile
    const profileW = Math.sin(Math.pow(v, 0.6) * Math.PI) * width;
    // Leaf natural downward arch
    const arch = -Math.pow(v, 1.8) * 0.12;

    for (let j = 0; j <= stepsW; j++) {
      const u = (j / stepsW) * 2 - 1; // -1 to +1 across leaf
      const absU = Math.abs(u);

      // Fenestration / split-leaf cutouts simulation:
      // Monstera leaves have signature cutout slits on sides
      let lobeWave = 1.0;
      if (absU > 0.4 && v > 0.18 && v < 0.85) {
        // Deep fenestration slits
        const slit = Math.sin(v * Math.PI * 9);
        if (slit < -0.2) {
          lobeWave = 0.55 + Math.max(0, slit + 0.2) * 0.45;
        }
      }

      const w = u * profileW * lobeWave;
      // Cup / curvature across leaf width
      const cup = -Math.pow(absU, 2) * 0.035;

      const px = center[0] + tangentDir[0] * v * length + sideDir[0] * w + norm[0] * (arch + cup);
      const py = center[1] + tangentDir[1] * v * length + sideDir[1] * w + norm[1] * (arch + cup);
      const pz = center[2] + tangentDir[2] * v * length + sideDir[2] * w + norm[2] * (arch + cup);

      positions.push(px, py, pz);

      // Slightly perturbed normal to catch glossy leaf sheen
      const nSide = sideDir[0] * u * 0.3;
      const nArch = norm[0] + tangentDir[0] * v * 0.2;
      const leafNorm = normalize([nArch + nSide, norm[1] + 0.2, norm[2] + sideDir[2] * u * 0.3]);
      normals.push(leafNorm[0], leafNorm[1], leafNorm[2]);
    }
  }

  const stride = stepsW + 1;
  for (let i = 0; i < stepsL; i++) {
    for (let j = 0; j < stepsW; j++) {
      const a = i * stride + j;
      const b = a + 1;
      const c = (i + 1) * stride + j;
      const d = c + 1;
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  return { positions, normals, indices };
}

/**
 * Creates an upright Sansevieria (Snake Plant) sword blade with curved cross-section
 */
function createSnakePlantLeaf(basePos, height, maxWidth, tiltAngle, yawAngle) {
  const positions = [];
  const normals = [];
  const indices = [];

  const cosYaw = Math.cos(yawAngle);
  const sinYaw = Math.sin(yawAngle);

  const stepsY = 16;
  const stepsX = 8;

  for (let i = 0; i <= stepsY; i++) {
    const v = i / stepsY; // 0 to 1 (top)
    const y = basePos[1] + v * height;

    // Width tapers gently to sharp needle tip
    let w = Math.sin(v * Math.PI * 0.95) * maxWidth;
    if (v < 0.15) w = (v / 0.15) * maxWidth * 0.7 + 0.01;

    // Slight S-curve twist / wave
    const wave = Math.sin(v * Math.PI * 2.5) * 0.015;
    const tilt = Math.sin(tiltAngle) * v * height * 0.25;

    for (let j = 0; j <= stepsX; j++) {
      const u = (j / stepsX) * 2 - 1; // -1 to 1
      const absU = Math.abs(u);

      // Concave trough in center of leaf
      const trough = (1 - absU * absU) * 0.018;

      const localX = u * w;
      const localZ = tilt + wave - trough;

      // Rotate by yaw
      const worldX = basePos[0] + (localX * cosYaw - localZ * sinYaw);
      const worldZ = basePos[2] + (localX * sinYaw + localZ * cosYaw);

      positions.push(worldX, y, worldZ);

      // Leaf normal with outward rim tilt
      const nX = u * 0.5;
      const nZ = 1.0;
      const rotNx = nX * cosYaw - nZ * sinYaw;
      const rotNz = nX * sinYaw + nZ * cosYaw;
      const n = normalize([rotNx, 0.1, rotNz]);
      normals.push(n[0], n[1], n[2]);
    }
  }

  const stride = stepsX + 1;
  for (let i = 0; i < stepsY; i++) {
    for (let j = 0; j < stepsX; j++) {
      const a = i * stride + j;
      const b = a + 1;
      const c = (i + 1) * stride + j;
      const d = c + 1;
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  return { positions, normals, indices };
}

/**
 * Creates glossy oval ZZ Plant leaflets along a succulent upright cane
 */
function createZZPlantLeaflet(pos, normal, tangent, w, len) {
  const positions = [];
  const normals = [];
  const indices = [];

  const side = normalize(cross(normal, tangent));
  const stepsL = 8;
  const stepsW = 6;

  for (let i = 0; i <= stepsL; i++) {
    const v = i / stepsL;
    const currentW = Math.sin(v * Math.PI) * w;
    const arch = -Math.pow(v, 2) * 0.02;

    for (let j = 0; j <= stepsW; j++) {
      const u = (j / stepsW) * 2 - 1;
      const px = pos[0] + tangent[0] * v * len + side[0] * u * currentW + normal[0] * arch;
      const py = pos[1] + tangent[1] * v * len + side[1] * u * currentW + normal[1] * arch;
      const pz = pos[2] + tangent[2] * v * len + side[2] * u * currentW + normal[2] * arch;

      positions.push(px, py, pz);
      normals.push(normal[0], normal[1] + 0.1, normal[2]);
    }
  }

  const stride = stepsW + 1;
  for (let i = 0; i < stepsL; i++) {
    for (let j = 0; j < stepsW; j++) {
      const a = i * stride + j;
      const b = a + 1;
      const c = (i + 1) * stride + j;
      const d = c + 1;
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  return { positions, normals, indices };
}

// ── Merge Multiple Geometries into one mesh ──
function mergeGeometries(geoList) {
  const merged = { positions: [], normals: [], indices: [] };
  let offset = 0;

  for (const geo of geoList) {
    merged.positions.push(...geo.positions);
    merged.normals.push(...geo.normals);
    for (const idx of geo.indices) {
      merged.indices.push(idx + offset);
    }
    offset += geo.positions.length / 3;
  }

  return merged;
}

// ── BUILD MODELS ──

export function buildMonsteraGLB() {
  const builder = new GLBBuilder();

  // Materials
  const ceramicWhite = builder.addMaterial({
    name: 'CeramicWhite',
    baseColorFactor: [0.94, 0.94, 0.93, 1.0],
    roughnessFactor: 0.22,
    metallicFactor: 0.05,
  });

  const soilMat = builder.addMaterial({
    name: 'MoistSoil',
    baseColorFactor: [0.18, 0.13, 0.09, 1.0],
    roughnessFactor: 0.85,
    metallicFactor: 0.0,
  });

  const stemMat = builder.addMaterial({
    name: 'StemGreen',
    baseColorFactor: [0.16, 0.42, 0.22, 1.0],
    roughnessFactor: 0.45,
    metallicFactor: 0.02,
  });

  const monsteraLeafMat = builder.addMaterial({
    name: 'MonsteraLeafLustre',
    baseColorFactor: [0.12, 0.42, 0.21, 1.0],
    roughnessFactor: 0.32,
    metallicFactor: 0.08,
    doubleSided: true,
  });

  // 1. Pot
  const potGeo = createPot(0.14, 0.20, 0.26, 36);
  const potPrim = createMeshGeometry(builder, potGeo.positions, potGeo.normals, potGeo.indices, ceramicWhite);
  const potMesh = builder.addMesh([potPrim], 'CeramicPot');
  builder.addNode(potMesh, 'PotNode');

  // 2. Soil
  const soilGeo = createSoil(0.18, 0.25, 28);
  const soilPrim = createMeshGeometry(builder, soilGeo.positions, soilGeo.normals, soilGeo.indices, soilMat);
  const soilMesh = builder.addMesh([soilPrim], 'PotSoil');
  builder.addNode(soilMesh, 'SoilNode');

  // 3. Stems & Leaves
  const stemGeos = [];
  const leafGeos = [];

  const branches = [
    { yaw: 0.2, pitch: 0.45, height: 0.58, reach: 0.28, leafW: 0.20, leafL: 0.28 },
    { yaw: 1.4, pitch: 0.38, height: 0.68, reach: 0.32, leafW: 0.24, leafL: 0.34 },
    { yaw: 2.7, pitch: 0.52, height: 0.54, reach: 0.26, leafW: 0.19, leafL: 0.26 },
    { yaw: 4.1, pitch: 0.40, height: 0.72, reach: 0.35, leafW: 0.25, leafL: 0.36 },
    { yaw: 5.3, pitch: 0.48, height: 0.62, reach: 0.30, leafW: 0.22, leafL: 0.30 },
    // A smaller emerging young leaf in center
    { yaw: 3.2, pitch: 0.15, height: 0.42, reach: 0.12, leafW: 0.14, leafL: 0.18 },
  ];

  for (const b of branches) {
    const cosY = Math.cos(b.yaw);
    const sinY = Math.sin(b.yaw);

    // Stem path points (starts from soil center, arches up and outward)
    const pts = [
      [cosY * 0.03, 0.25, sinY * 0.03],
      [cosY * 0.08, 0.36, sinY * 0.08],
      [cosY * 0.16, 0.48, sinY * 0.16],
      [cosY * (b.reach * 0.8), b.height * 0.88, sinY * (b.reach * 0.8)],
      [cosY * b.reach, b.height, sinY * b.reach],
    ];

    stemGeos.push(createCurvedStem(pts, 0.012, 8));

    // Leaf blade at stem end
    const tip = pts[pts.length - 1];
    const tangent = normalize([cosY * 0.8, -0.4, sinY * 0.8]);
    const normal = normalize([-cosY * 0.2, 0.9, -sinY * 0.2]);

    leafGeos.push(createMonsteraLeaf(tip, normal, tangent, b.leafW, b.leafL));
  }

  const mergedStems = mergeGeometries(stemGeos);
  const stemPrim = createMeshGeometry(builder, mergedStems.positions, mergedStems.normals, mergedStems.indices, stemMat);
  const stemMesh = builder.addMesh([stemPrim], 'MonsteraStems');
  builder.addNode(stemMesh, 'StemNode');

  const mergedLeaves = mergeGeometries(leafGeos);
  const leafPrim = createMeshGeometry(builder, mergedLeaves.positions, mergedLeaves.normals, mergedLeaves.indices, monsteraLeafMat);
  const leafMesh = builder.addMesh([leafPrim], 'MonsteraFoliage');
  builder.addNode(leafMesh, 'LeafNode');

  return builder.build();
}

export function buildSnakePlantGLB() {
  const builder = new GLBBuilder();

  // Modern matte black or terracotta pot
  const potMat = builder.addMaterial({
    name: 'ModernPotMat',
    baseColorFactor: [0.22, 0.22, 0.24, 1.0],
    roughnessFactor: 0.35,
    metallicFactor: 0.1,
  });

  const soilMat = builder.addMaterial({
    name: 'PebbleSoil',
    baseColorFactor: [0.24, 0.18, 0.14, 1.0],
    roughnessFactor: 0.8,
  });

  // Iconic gold-bordered variegated leaf
  const snakeLeafMat = builder.addMaterial({
    name: 'SnakePlantVariegated',
    baseColorFactor: [0.18, 0.42, 0.24, 1.0],
    roughnessFactor: 0.42,
    metallicFactor: 0.02,
    doubleSided: true,
  });

  // 1. Pot
  const potGeo = createPot(0.12, 0.17, 0.28, 36);
  const potPrim = createMeshGeometry(builder, potGeo.positions, potGeo.normals, potGeo.indices, potMat);
  const potMesh = builder.addMesh([potPrim], 'CylinderPot');
  builder.addNode(potMesh, 'PotNode');

  // 2. Soil
  const soilGeo = createSoil(0.155, 0.27, 28);
  const soilPrim = createMeshGeometry(builder, soilGeo.positions, soilGeo.normals, soilGeo.indices, soilMat);
  const soilMesh = builder.addMesh([soilPrim], 'SoilLayer');
  builder.addNode(soilMesh, 'SoilNode');

  // 3. Upright sword leaves with varied heights and yaw angles
  const leafGeos = [];
  const blades = [
    // Tall central spears
    { base: [0.0, 0.27, 0.0], height: 0.65, width: 0.046, tilt: 0.04, yaw: 0.3 },
    { base: [0.02, 0.27, -0.02], height: 0.60, width: 0.044, tilt: 0.06, yaw: 1.8 },
    { base: [-0.02, 0.27, 0.01], height: 0.58, width: 0.042, tilt: 0.05, yaw: 3.4 },
    // Surrounding medium blades
    { base: [0.04, 0.27, 0.03], height: 0.48, width: 0.040, tilt: 0.12, yaw: 0.9 },
    { base: [-0.04, 0.27, 0.04], height: 0.52, width: 0.041, tilt: 0.14, yaw: 2.5 },
    { base: [-0.03, 0.27, -0.04], height: 0.46, width: 0.038, tilt: 0.13, yaw: 4.2 },
    { base: [0.05, 0.27, -0.03], height: 0.50, width: 0.039, tilt: 0.11, yaw: 5.4 },
    // Outer shorter young leaves
    { base: [0.07, 0.27, 0.0], height: 0.35, width: 0.034, tilt: 0.22, yaw: 0.1 },
    { base: [-0.07, 0.27, 0.0], height: 0.32, width: 0.032, tilt: 0.24, yaw: 3.1 },
  ];

  for (const b of blades) {
    leafGeos.push(createSnakePlantLeaf(b.base, b.height, b.width, b.tilt, b.yaw));
  }

  const mergedLeaves = mergeGeometries(leafGeos);
  const leafPrim = createMeshGeometry(builder, mergedLeaves.positions, mergedLeaves.normals, mergedLeaves.indices, snakeLeafMat);
  const leafMesh = builder.addMesh([leafPrim], 'SansevieriaBlades');
  builder.addNode(leafMesh, 'FoliageNode');

  return builder.build();
}

export function buildZZPlantGLB() {
  const builder = new GLBBuilder();

  // Terracotta warm pot
  const potMat = builder.addMaterial({
    name: 'TerracottaPot',
    baseColorFactor: [0.72, 0.38, 0.22, 1.0],
    roughnessFactor: 0.65,
    metallicFactor: 0.0,
  });

  const soilMat = builder.addMaterial({
    name: 'RichCompost',
    baseColorFactor: [0.15, 0.11, 0.08, 1.0],
    roughnessFactor: 0.9,
  });

  const stemMat = builder.addMaterial({
    name: 'ThickCanes',
    baseColorFactor: [0.22, 0.46, 0.18, 1.0],
    roughnessFactor: 0.38,
    metallicFactor: 0.05,
  });

  // Ultra-glossy emerald leaflets
  const zzLeafMat = builder.addMaterial({
    name: 'ZZGlossyFoliage',
    baseColorFactor: [0.08, 0.38, 0.15, 1.0],
    roughnessFactor: 0.22,
    metallicFactor: 0.12,
    doubleSided: true,
  });

  // Pot & Soil
  const potGeo = createPot(0.13, 0.18, 0.25, 32);
  const potPrim = createMeshGeometry(builder, potGeo.positions, potGeo.normals, potGeo.indices, potMat);
  builder.addNode(builder.addMesh([potPrim], 'ZZPot'), 'Pot');

  const soilGeo = createSoil(0.165, 0.24, 24);
  const soilPrim = createMeshGeometry(builder, soilGeo.positions, soilGeo.normals, soilGeo.indices, soilMat);
  builder.addNode(builder.addMesh([soilPrim], 'ZZSoil'), 'Soil');

  // Canes with pairs of glossy leaflets
  const stemGeos = [];
  const leafGeos = [];

  const canes = [
    { yaw: 0.4, arch: 0.16, h: 0.55 },
    { yaw: 1.8, arch: 0.18, h: 0.60 },
    { yaw: 3.2, arch: 0.15, h: 0.52 },
    { yaw: 4.6, arch: 0.19, h: 0.58 },
  ];

  for (const c of canes) {
    const cosY = Math.cos(c.yaw);
    const sinY = Math.sin(c.yaw);

    const pts = [
      [cosY * 0.02, 0.24, sinY * 0.02],
      [cosY * 0.06, 0.34, sinY * 0.06],
      [cosY * 0.12, 0.44, sinY * 0.12],
      [cosY * c.arch, c.h, sinY * c.arch],
    ];

    stemGeos.push(createCurvedStem(pts, 0.014, 8));

    // Pairs of leaflets along the cane
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      const side = normalize([-sinY, 0, cosY]);
      const normal = [0, 1, 0];

      // Left leaflet
      leafGeos.push(createZZPlantLeaflet(p, normal, side, 0.035, 0.065));
      // Right leaflet
      const negSide = [-side[0], -side[1], -side[2]];
      leafGeos.push(createZZPlantLeaflet(p, normal, negSide, 0.035, 0.065));
    }
  }

  const mergedStems = mergeGeometries(stemGeos);
  const stemPrim = createMeshGeometry(builder, mergedStems.positions, mergedStems.normals, mergedStems.indices, stemMat);
  builder.addNode(builder.addMesh([stemPrim], 'ZZCanes'), 'Canes');

  const mergedLeaves = mergeGeometries(leafGeos);
  const leafPrim = createMeshGeometry(builder, mergedLeaves.positions, mergedLeaves.normals, mergedLeaves.indices, zzLeafMat);
  builder.addNode(builder.addMesh([leafPrim], 'ZZLeaflets'), 'Leaflets');

  return builder.build();
}

// ── Main Execution ──
function main() {
  const modelsDir = path.resolve(process.cwd(), 'public/models');
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  console.log('🌱 Generating 3D GLB Plant Models for PLANTIFY...');

  // 1. Monstera Deliciosa
  const monsteraBuf = buildMonsteraGLB();
  const monsteraPath = path.join(modelsDir, 'monstera.glb');
  fs.writeFileSync(monsteraPath, monsteraBuf);
  console.log(`✅ Generated: ${monsteraPath} (${(monsteraBuf.length / 1024).toFixed(1)} KB)`);

  // 2. Snake Plant (support both snake-plant.glb and snake_plant.glb)
  const snakeBuf = buildSnakePlantGLB();
  const snakePath1 = path.join(modelsDir, 'snake_plant.glb');
  const snakePath2 = path.join(modelsDir, 'snake-plant.glb');
  fs.writeFileSync(snakePath1, snakeBuf);
  fs.writeFileSync(snakePath2, snakeBuf);
  console.log(`✅ Generated: ${snakePath1} (${(snakeBuf.length / 1024).toFixed(1)} KB)`);
  console.log(`✅ Generated: ${snakePath2} (Alias)`);

  // 3. ZZ Plant
  const zzBuf = buildZZPlantGLB();
  const zzPath = path.join(modelsDir, 'zz_plant.glb');
  const zzPath2 = path.join(modelsDir, 'zz-plant.glb');
  fs.writeFileSync(zzPath, zzBuf);
  fs.writeFileSync(zzPath2, zzBuf);
  console.log(`✅ Generated: ${zzPath} (${(zzBuf.length / 1024).toFixed(1)} KB)`);

  console.log('🌿 All 3D plant models generated successfully!');
}

main();
