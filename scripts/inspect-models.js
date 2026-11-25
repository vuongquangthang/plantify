import fs from 'fs';
import path from 'path';

const files = [
  'monstera_deliciosa_potted_mid-century_plant.glb',
  'free_pothos_potted_plant_-_money_plant.glb',
  'plant.glb',
  'indoor_plant.glb',
  'indoor_plant2.glb',
];

console.log('=== INSPECTING 5 DOWNLOADED 3D GLB FILES ===\n');

for (const file of files) {
  const filePath = path.resolve('public/models', file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Not found: ${file}`);
    continue;
  }
  const stat = fs.statSync(filePath);
  const buf = fs.readFileSync(filePath);

  const magic = buf.readUInt32LE(0);
  const version = buf.readUInt32LE(4);
  const length = buf.readUInt32LE(8);
  const jsonChunkLength = buf.readUInt32LE(12);
  const jsonChunkType = buf.readUInt32LE(16);

  const jsonStr = buf.toString('utf8', 20, 20 + jsonChunkLength);
  let gltf;
  try {
    gltf = JSON.parse(jsonStr);
  } catch (e) {
    console.log(`❌ Failed to parse JSON chunk of ${file}:`, e.message);
    continue;
  }

  console.log(`--------------------------------------------------`);
  console.log(`📁 File: ${file}`);
  console.log(`   Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB (${stat.size.toLocaleString()} bytes)`);
  console.log(`   glTF Version: ${version}`);
  console.log(`   Generator: ${gltf.asset?.generator || 'Unknown'}`);
  console.log(`   Copyright: ${gltf.asset?.copyright || 'N/A'}`);

  // Meshes & Materials
  const meshNames = (gltf.meshes || []).map((m) => m.name || 'unnamed');
  const matNames = (gltf.materials || []).map((m) => m.name || 'unnamed');
  const nodeNames = (gltf.nodes || []).map((n) => n.name || 'unnamed');
  const texturesCount = (gltf.textures || []).length;
  const imagesCount = (gltf.images || []).length;

  console.log(`   Meshes (${meshNames.length}):`, meshNames.slice(0, 10).join(', ') + (meshNames.length > 10 ? '...' : ''));
  console.log(`   Materials (${matNames.length}):`, matNames.slice(0, 10).join(', ') + (matNames.length > 10 ? '...' : ''));
  console.log(`   Textures: ${texturesCount}, Images: ${imagesCount}`);

  // Find min/max bounds across all POSITION accessors
  let globalMin = [Infinity, Infinity, Infinity];
  let globalMax = [-Infinity, -Infinity, -Infinity];

  for (const acc of gltf.accessors || []) {
    if (acc.type === 'VEC3' && acc.min && acc.max) {
      for (let i = 0; i < 3; i++) {
        if (acc.min[i] < globalMin[i]) globalMin[i] = acc.min[i];
        if (acc.max[i] > globalMax[i]) globalMax[i] = acc.max[i];
      }
    }
  }

  if (globalMin[0] !== Infinity) {
    const sizeX = globalMax[0] - globalMin[0];
    const sizeY = globalMax[1] - globalMin[1];
    const sizeZ = globalMax[2] - globalMin[2];
    console.log(`   Raw Bounding Box:`);
    console.log(`      Min: [${globalMin.map((n) => n.toFixed(3)).join(', ')}]`);
    console.log(`      Max: [${globalMax.map((n) => n.toFixed(3)).join(', ')}]`);
    console.log(`      Dimensions (X, Y, Z): ${sizeX.toFixed(3)} x ${sizeY.toFixed(3)} x ${sizeZ.toFixed(3)}`);
  }
}
