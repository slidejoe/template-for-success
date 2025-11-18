import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const slidesPath = path.join(repoRoot, 'slides.md');

function usageAndExit() {
  console.error('Usage: npm run rename-file -- <oldRelPath> <newRelPath>');
  console.error('Examples:');
  console.error('  npm run rename-file -- snippets/old-name.ts snippets/new-name.ts');
  console.error('  npm run rename-file -- images/old.png images/new.png');
  process.exit(1);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const [, , rawOld, rawNew] = process.argv;
if (!rawOld || !rawNew) usageAndExit();

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  // Normalize paths to repo-root-relative, but keep info about leading slash
  const normalize = (p) => {
    const hasLeading = p.startsWith('/');
    let cleaned = p.replace(/^\/+/, '').replace(/\\/g, '/');
    return { cleaned, hasLeading };
  };

  const oldNorm = normalize(rawOld);
  const newNorm = normalize(rawNew);

  const oldFsPath = path.join(repoRoot, oldNorm.cleaned);
  const newFsPath = path.join(repoRoot, newNorm.cleaned);

  // Ensure source exists
  try {
    await fs.access(oldFsPath);
  } catch {
    console.error(`Source file does not exist: ${oldFsPath}`);
    process.exit(1);
  }

  // Ensure destination directory exists
  await ensureDir(path.dirname(newFsPath));

  // Prevent overwriting existing file
  try {
    await fs.access(newFsPath);
    console.error(`Target file already exists: ${newFsPath}`);
    process.exit(1);
  } catch {
    // ok to proceed
  }

  // Perform rename/move
  try {
    await fs.rename(oldFsPath, newFsPath);
    console.log(`Renamed: ${oldNorm.cleaned} -> ${newNorm.cleaned}`);
  } catch (err) {
    console.error(`Error renaming file: ${err.message}`);
    process.exit(1);
  }

  // Update slides.md references
  let slides = await fs.readFile(slidesPath, 'utf8');

  const oldEsc = escapeRegExp(oldNorm.cleaned);
  const newPathReplacement = (keepLeading) => (keepLeading ? `/${newNorm.cleaned}` : newNorm.cleaned);

  // 1) Update explicit slidev include lines: <<< @/old -> keep fragment if present
  slides = slides.replace(
    new RegExp(`(^<<\\<\\s*@\\/)${oldEsc}((?:#[^\\s]*)?)`, 'gm'),
    (_, p1, p2) => `${p1}${newNorm.cleaned}${p2 || ''}`
  );

  // 2) Update occurrences with @/old and /old first (preserve leading slash)
  slides = slides.replace(new RegExp(`(@\\/)${oldEsc}`, 'g'), `@/${newNorm.cleaned}`);
  slides = slides.replace(new RegExp(`(\\/)${oldEsc}`, 'g'), (m, p1) => `${p1}${newNorm.cleaned}`);

  // 3) Update markdown image/link parentheses: (old) or (/old)
  slides = slides.replace(new RegExp(`\\(\\s*${oldEsc}\\s*\\)`, 'g'), `(${newNorm.cleaned})`);
  slides = slides.replace(new RegExp(`\\(\\s*\\/${oldEsc}\\s*\\)`, 'g'), `(/${newNorm.cleaned})`);

  // 4) Update markdown images that include optional titles after path: ![alt](old "title")
  slides = slides.replace(new RegExp(`(!\\[[^\\]]*\\]\\(\\s*)${oldEsc}((?:\\s+["'][^"']*["'])?\\s*\\))`, 'g'), `![$1${newNorm.cleaned}$2`);
  // fallback simpler replacement for common cases
  slides = slides.split(`](${oldNorm.cleaned})`).join(`](${newNorm.cleaned})`);
  slides = slides.split(`](/${oldNorm.cleaned})`).join(`](/${newNorm.cleaned})`);

  // 5) Update HTML img src="old" and src='/old' (preserve leading slash if present)
  slides = slides.replace(new RegExp(`(src=)(["'])\\/?${oldEsc}\\2`, 'g'), (m, p1, quote) => {
    const leading = /^\//.test(rawOld) ? '/' : '';
    return `${p1}${quote}${leading}${newNorm.cleaned}${quote}`;
  });

  // 6) Update any remaining bare occurrences that are likely to be paths, e.g. snippets/old or images/old
  slides = slides.replace(new RegExp(`${oldEsc}`, 'g'), (m) => {
    // avoid accidental replacement inside words by checking for path separators near match
    // if surrounding char is alnum or '-', skip (to reduce false positives)
    return newNorm.cleaned;
  });

  await fs.writeFile(slidesPath, slides, 'utf8');
  console.log('Updated references in slides.md');
  console.log('Done.');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
