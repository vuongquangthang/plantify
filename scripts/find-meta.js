import fs from 'fs';

const files = ['plant.glb', 'indoor_plant.glb', 'indoor_plant2.glb'];

for (const file of files) {
  const buf = fs.readFileSync('public/models/' + file);
  const jsonChunkLen = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonChunkLen);
  const gltf = JSON.parse(jsonStr);

  console.log(`\n================== ${file} ==================`);
  console.log('Asset metadata:', gltf.asset);
  console.log('Extras:', gltf.extras || gltf.asset?.extras);

  const urls = jsonStr.match(/https?:\/\/[^\s"'<>]+/g);
  if (urls) {
    console.log('URLs:', [...new Set(urls)]);
  }

  // Look for title or keywords
  const titleMatch = jsonStr.match(/"(title|name|description)":"([^"]+)"/g);
  if (titleMatch) {
    console.log('Meta fields:', titleMatch.slice(0, 15));
  }
}
