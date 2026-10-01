#!/usr/bin/env node
/**
 * Writes dist/api/mail-config.php for public/api/contact.php from the
 * SMTP_PASSWORD environment variable (a GitHub Actions secret), so the mailbox
 * password is never committed. Run after `npm run build`, before uploading.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, '..', 'dist', 'api', 'mail-config.php');

const password = process.env.SMTP_PASSWORD ?? '';
if (!password) {
  console.warn('::warning::SMTP_PASSWORD is not set — the contact forms will reply "Email is not configured yet."');
  process.exit(0);
}

// PHP single-quoted string: only backslash and quote need escaping.
const phpString = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, `<?php\n// Generated at deploy time. Do not commit.\nreturn ['smtp_password' => ${phpString(password)}];\n`);
console.log('mail-config.php written');
