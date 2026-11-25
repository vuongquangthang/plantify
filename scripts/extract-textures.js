import fs from 'fs';
import path from 'path';

function inspectTextures(filename) {
  const filePath = path.resolve('public/models', filename);
  const buf = fs.readFileSync(filePath);
  const jsonChunkLength = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonChunkLength);
  const gltf = JSON.parse(jsonStr);

  console.log(`\n=== Textures in ${filename} ===`);
  const binOffset = 20 + jsonChunkLength + 8; // start of bin chunk
  const images = gltf.images || [];
  const bufferViews = gltf.bufferViews || [];

  images.forEach((img, idx) => {
    console.log(`  Image ${idx}: name="${img.name || ''}", mimeType="${img.mimeType}"`);
    if (img.bufferView !== undefined) {
      const bv = bufferViews[img.bufferView];
      console.log(`     BufferView ${img.bufferView}: offset=${bv.byteOffset || 0}, length=${bv.byteLength}`);
      // Save texture sample to inspect if helpful
      const imgBuffer = buf.subarray(binOffset + (bv.byteOffset || 0), binOffset + (bv.byteOffset || 0) + bv.byteLength);
      const ext = img.mimeType === 'image/jpeg' ? 'jpg' : 'png';
      const outPath = path.resolve('public/models', `texture_${filename.replace('.glb', '')}_${idx}_${img.name || 'unnamed'}.${ext}`);
      fs.writeFileSync(outPath, imgBuffer);
      console.log(`     Saved sample to ${path.basename(outPath)}`);
    }
  });
}

inspectTextures('plant.glb');
inspectTextures('indoor_plant.glb');
inspectTextures('indoor_plant2.glb');
