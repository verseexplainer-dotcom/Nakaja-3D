#!/usr/bin/env node
import { existsSync } from 'node:fs';
const required = ['AGENTS.md','README.md','DESIGN.md','src/pages/index.astro','functions/api/lead.ts'];
const missing = required.filter((p) => !existsSync(p));
if (missing.length) {
  console.error('Missing required paths:');
  missing.forEach((p) => console.error(`- ${p}`));
  process.exit(1);
}
console.log('Repo audit passed.');
