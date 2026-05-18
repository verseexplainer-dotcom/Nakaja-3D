#!/usr/bin/env node
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const dir = 'src/content/products';
const files = readdirSync(dir).filter((name) => name.endsWith('.md'));
const required = ['title:', 'summary:', 'status:', 'lastVerifiedAt:'];
const failures = [];
for (const file of files) {
  const body = readFileSync(join(dir, file), 'utf8');
  const missing = required.filter((token) => !body.includes(token));
  if (missing.length) failures.push({ file, missing });
}
if (failures.length) {
  console.error('Product validation failed:');
  for (const failure of failures) console.error(`- ${failure.file}: missing ${failure.missing.join(', ')}`);
  process.exit(1);
}
console.log(`Validated ${files.length} product files.`);
