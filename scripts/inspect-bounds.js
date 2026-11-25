import fs from 'fs';

function getMeshBounds(file) {
  const buf = fs.readFileSync('public/models/' + file);
  const jsonChunkLen = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonChunkLen);
  const gltf = JSON.parse(jsonStr);

  console.log(`\n=== Mesh bounds for ${file} ===`);
  gltf.meshes.forEach((m, idx) => {
    console.log(`Mesh ${idx} (${m.name}):`);
    m.primitives.forEach((p, pIdx) => {
      const posAccIdx = p.attributes.POSITION;
      const acc = gltf.accessors[posAccIdx];
      console.log(`   Prim ${pIdx}: Min: [${acc.min.map(n=>n.toFixed(2))}], Max: [${acc.max.map(n=>n.toFixed(2))}]`);
      const size = [acc.max[0] - acc.min[0], acc.max[1] - acc.min[1], acc.max[2] - acc.min[2]];
      console.log(`          Size (X,Y,Z): ${size.map(n=>n.toFixed(2)).join(' x ')}`);
    });
  });
}

getMeshBounds('indoor_plant.glb');
getMeshBounds('indoor_plant2.glb');
