const child_process = require('child_process'),
  process = require('process');

if (process.platform === 'win32') {
  child_process.exec('hexo server', (error) => {
    if (error) {
      console.error(`Exec "hexo server" throw error: ${error}`);
      return;
    }
    console.log('Running server successful');
  });
} else {
  const ls = child_process.spawn('hexo', ['server']);

  ls.on('close', (code) => {
    console.log(`Child process exit with code ${code}`);
  });
}