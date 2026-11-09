/**
 * Roda todos os exemplos (antes e depois) e falha se algum quebrar.
 * Uso: npm run exemplos
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const scripts = Object.keys(JSON.parse(fs.readFileSync('package.json', 'utf8')).scripts).filter(
  (s) => /:(antes|depois)$/.test(s),
);

for (const s of scripts) {
  process.stdout.write(`▶️  ${s.padEnd(20)}`);
  execSync(`npm run -s ${s}`, { stdio: 'ignore' });
  console.log('ok');
}
console.log(`\n✅ ${scripts.length} exemplos rodaram sem erro.`);
