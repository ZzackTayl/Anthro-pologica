import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { spawn } from 'child_process';

const appPort = process.env.PORT || 4173;
const previewUrl = `http://localhost:${appPort}/`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(url, timeoutMs = 30000, intervalMs = 500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok) return true;
    } catch {
      // swallow until server is ready
    }
    await wait(intervalMs);
  }
  throw new Error('Preview server did not start in time');
}

async function startPreview() {
  const proc = spawn('npm', ['run', 'preview', '--', '--host', '0.0.0.0', '--port', String(appPort)], {
    stdio: 'pipe',
    shell: process.platform === 'win32',
  });

  proc.on('error', (err) => {
    throw err;
  });

  await waitForServer(previewUrl);
  return proc;
}

async function run() {
  const server = await startPreview();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(previewUrl);

  const { violations } = await new AxeBuilder({ page }).analyze();

  if (violations.length) {
    console.log(JSON.stringify(violations, null, 2));
    await context.close();
    await browser.close();
    server.kill('SIGINT');
    process.exitCode = 1;
    return;
  }

  console.log('axe-core: no accessibility violations detected');
  await context.close();
  await browser.close();
  server.kill('SIGINT');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
