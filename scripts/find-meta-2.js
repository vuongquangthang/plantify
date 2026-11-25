import fs from 'fs';

const files = [
  'monstera_deliciosa_potted_mid-century_plant.glb',
  'free_pothos_potted_plant_-_money_plant.glb'
];

for (const file of files) {
  const buf = fs.readFileSync('public/models/' + file);
  const jsonChunkLen = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonChunkLen);
  const gltf = JSON.parse(jsonStr);

  console.log(`\n================== ${file} ==================`);
  console.log('Asset metadata:', gltf.asset);
  console.log('Extras:', gltf.extras || gltf.asset?.extras);
}
