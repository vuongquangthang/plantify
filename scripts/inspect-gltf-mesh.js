import fs from 'fs';

function inspectGltf(file) {
  const buf = fs.readFileSync('public/models/' + file);
  const jsonChunkLen = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonChunkLen);
  const gltf = JSON.parse(jsonStr);
  console.log(`\n=== Inspection for ${file} ===`);
  console.log('Meshes count:', gltf.meshes?.length);
  if (gltf.meshes) {
    gltf.meshes.forEach((m, idx) => {
      console.log(`  Mesh ${idx}: "${m.name}", primitives:`, m.primitives.length);
      m.primitives.forEach((p, pIdx) => {
        console.log(`     Prim ${pIdx}: material=${p.material}, attributes=`, Object.keys(p.attributes));
      });
    });
  }
}

inspectGltf('indoor_plant.glb');
inspectGltf('indoor_plant2.glb');
