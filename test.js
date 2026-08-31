// ไฟล์เทสอย่างง่าย ไม่ใช้ไลบรารีเสริม (เพื่อให้ npm install เร็วและไม่พังง่ายบน CI)
const http = require('http');
const app = require('./app');

const PORT = 4321;
const server = app.listen(PORT, () => {
  runTests();
});

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runTests() {
  let failed = false;

  try {
    const health = await get('/health');
    if (health.status !== 200) throw new Error('GET /health ต้องได้ status 200');
    console.log('✅ ผ่าน: GET /health');

    const activities = await get('/activities');
    if (activities.status !== 200) throw new Error('GET /activities ต้องได้ status 200');
    console.log('✅ ผ่าน: GET /activities');

    const home = await get('/');
    if (home.status !== 200) throw new Error('GET / ต้องได้ status 200');
    console.log('✅ ผ่าน: GET /');

  } catch (err) {
    console.error('❌ เทสไม่ผ่าน:', err.message);
    failed = true;
  } finally {
    server.close();
    process.exit(failed ? 1 : 0);
  }
}
