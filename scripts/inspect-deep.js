import fs from 'fs';
import path from 'path';

function inspectGltfDeep(filename) {
  const filePath = path.resolve('public/models', filename);
  const buf = fs.readFileSync(filePath);
  const jsonChunkLength = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonChunkLength);
  const gltf = JSON.parse(jsonStr);

  console.log(`\n================== ${filename} ==================`);
  console.log('Nodes:');
  for (let i = 0; i < (gltf.nodes || []).length; i++) {
    const node = gltf.nodes[i];
    console.log(`  [Node ${i}] "${node.name || 'unnamed'}" mesh:${node.mesh} translation:${node.translation} rotation:${node.rotation} scale:${node.scale}`);
  }
  console.log('Materials:');
  for (let i = 0; i < (gltf.materials || []).length; i++) {
    const m = gltf.materials[i];
    console.log(`  [Mat ${i}] "${m.name}" pbr:`, JSON.stringify(m.pbrMetallicRoughness));
  }
}

inspectGltfDeep('plant.glb');
inspectGltfDeep('indoor_plant.glb');
inspectGltfDeep('indoor_plant2.glb');
