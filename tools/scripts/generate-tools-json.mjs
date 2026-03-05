#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const toolsDir = path.resolve(__dirname, '..');
const manifestPath = path.join(toolsDir, 'tools.json');

const entries = await fs.readdir(toolsDir, { withFileTypes: true });

const folders = entries
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .filter(name => !name.startsWith('.') && name !== 'scripts')
  .sort((a, b) => a.localeCompare(b));

const validFolders = [];
for (const folder of folders) {
  const indexPath = path.join(toolsDir, folder, 'index.html');
  try {
    await fs.access(indexPath);
    validFolders.push(folder);
  } catch {
    // Ignore folders without an index.html tool entry point.
  }
}

await fs.writeFile(manifestPath, `${JSON.stringify(validFolders, null, 2)}\n`, 'utf8');
console.log(`Updated ${manifestPath} with ${validFolders.length} tool(s).`);
