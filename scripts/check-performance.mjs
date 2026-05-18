#!/usr/bin/env node
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dir = 'dist/client/_astro';
if (!existsSync(dir)) {
  console.error('Build output not found. Run `npm run build` first.');
  process.exit(1);
}
const files = readdirSync(dir).map((name) => ({ name, size: statSync(join(dir, name)).size }));
files.sort((a, b) => b.size - a.size);
console.log('Largest built assets:');
for (const file of files.slice(0, 10)) console.log(`- ${file.name}: ${(file.size / 1024).toFixed(1)} KB`);
