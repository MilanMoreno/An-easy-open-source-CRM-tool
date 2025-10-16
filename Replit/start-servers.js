/**
 * Start both static file server and API server
 */

const { spawn } = require('child_process');

// Start API server on port 3000
const apiServer = spawn('node', ['api-server.js'], {
  stdio: 'inherit',
  env: { ...process.env }
});

// Start static file server on port 5000
const staticServer = spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: { ...process.env }
});

apiServer.on('error', (error) => {
  console.error('API Server error:', error);
});

staticServer.on('error', (error) => {
  console.error('Static Server error:', error);
});

apiServer.on('exit', (code) => {
  if (code !== 0) {
    console.error(`API Server exited with code ${code}`);
  }
});

staticServer.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Static Server exited with code ${code}`);
  }
});

process.on('SIGINT', () => {
  apiServer.kill();
  staticServer.kill();
  process.exit();
});

console.log('Starting servers...');
console.log('- API Server: http://localhost:3000');
console.log('- Static Server: http://0.0.0.0:5000');
