import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          length: buffer.length,
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('🚀 Starting Vite preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'ignore',
  });

  // Give server 2.5 seconds to start
  await new Promise((r) => setTimeout(r, 2500));

  try {
    console.log('🔍 Testing static & 3D GLB routes...');
    const root = await fetchUrl('http://localhost:4173/');
    console.log(`[GET /] Status: ${root.statusCode}, Length: ${root.length} bytes`);

    const monstera = await fetchUrl('http://localhost:4173/models/monstera.glb');
    console.log(`[GET /models/monstera.glb] Status: ${monstera.statusCode}, Length: ${monstera.length} bytes`);

    const snake = await fetchUrl('http://localhost:4173/models/snake_plant.glb');
    console.log(`[GET /models/snake_plant.glb] Status: ${snake.statusCode}, Length: ${snake.length} bytes`);

    const zz = await fetchUrl('http://localhost:4173/models/zz_plant.glb');
    console.log(`[GET /models/zz_plant.glb] Status: ${zz.statusCode}, Length: ${zz.length} bytes`);

    if (root.statusCode === 200 && monstera.statusCode === 200 && snake.statusCode === 200 && zz.statusCode === 200) {
      console.log('🎉 ALL 3D GLB ASSETS & APPLICATION ROUTES SERVED PERFECTLY!');
    } else {
      console.error('❌ Some routes failed!');
    }
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.kill();
    process.exit(0);
  }
}

run();
