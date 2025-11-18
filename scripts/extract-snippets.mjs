import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const debug = false;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const slidesPath = path.join(repoRoot, 'slides.md');
const snippetsDir = path.join(repoRoot, 'snippets');

const langToExt = {
  ts: '.ts', tsx: '.tsx', js: '.js', jsx: '.jsx',
  csharp: '.cs', cs: '.cs', razor: '.cshtml', cshtml: '.cshtml',
  json: '.json', md: '.md', markdown: '.md', html: '.html',
  css: '.css', scss: '.scss', bash: '.sh', sh: '.sh',
  ps1: '.ps1', xml: '.xml', java: '.java', c: '.c', cpp: '.cpp',
  razor: '.razor', razorhtml: '.cshtml', razorview: '.cshtml', cpp: '.cpp',
  csharpfile: '.cs'
};

function sanitizeFilename(text) {
  // remove html tags and ignore content inside angle brackets
  const noTags = text.replace(/<[^>]*>/g, '');
  return noTags
    .toLowerCase()
    .replace(/<\/?[^>]+(>|$)/g, '') // extra safety
    .replace(/[:/\\\?\%\*\|"<>]/g, '-') // replace problematic chars
    .replace(/[^a-z0-9\-]+/g, '-') // non alnum -> dash
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120) || 'snippet';
}

function regionMarkersForExt(ext) {
  if (['.html', '.xml', '.md', '.cshtml'].includes(ext)) return ['<!-- #region -->', '<!-- #endregion -->'];
  if (['.css', '.scss'].includes(ext)) return ['/* #region */', '/* #endregion */'];
  if (['.ps1', '.sh', '.py', '.rb'].includes(ext)) return ['#region', '#endregion'];
  if (['.c', '.cpp', '.cs', '.java', '.js', '.ts', '.jsx', '.tsx'].includes(ext)) return ['// #region', '// #endregion'];
  return ['// #region', '// #endregion'];
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function run() {
  const raw = await fs.readFile(slidesPath, 'utf8');

  // detect front-matter block (only if document starts with ---)
  const sepRegex = /^---\s*$/gm;
  const allSepMatches = [...raw.matchAll(sepRegex)];
  let frontMatterEnd = 0;
  if (raw.startsWith('---')) {
    if (allSepMatches.length >= 2 && allSepMatches[0].index === 0) {
      const second = allSepMatches[1];
      frontMatterEnd = second.index + second[0].length;
      // skip trailing newline(s)
      while (raw[frontMatterEnd] === '\r' || raw[frontMatterEnd] === '\n') frontMatterEnd++;
    } else {
      // malformed front-matter - treat as none
      frontMatterEnd = 0;
    }
  }

  // find all slide separators AFTER frontMatterEnd (positions where a new slide starts)
  const separators = [];
  for (const m of allSepMatches) {
    if ((m.index ?? 0) >= frontMatterEnd) {
      // compute start of next slide: position after the separator and any newline(s)
      let next = (m.index ?? 0) + m[0].length;
      while (raw[next] === '\r' || raw[next] === '\n') next++;
      separators.push({ sepIndex: m.index ?? 0, nextStart: next });
    }
  }

  // compute slide start positions: first slide starts at frontMatterEnd, subsequent slides at each separators.nextStart
  const slideStarts = [frontMatterEnd];
  for (const s of separators) slideStarts.push(s.nextStart);

  // regex for triple-fenced code blocks (opening line, lang info, content, closing fence)
  const fenceRegex = /(^```([^`\n]*)\n)([\s\S]*?)(^```[ \t]*$)/gm;
  const matches = [...raw.matchAll(fenceRegex)];
  if (matches.length === 0) {
    console.log('No fenced code blocks found. Nothing to do.');
    return;
  }

  // helper to find slide index for a position
  function getSlideNumberForPos(pos) {
    // find the largest slideStarts[i] <= pos
    let idx = 0;
    for (let i = 0; i < slideStarts.length; i++) {
      if (slideStarts[i] <= pos) idx = i;
      else break;
    }
    // slide numbers start at 1
    return idx + 1;
  }

  // helper to find nearest heading text before pos within same slide
  function findNearestHeadingBefore(pos, slideStart) {
    const segment = raw.slice(slideStart, pos);
    const headingRegex = /(^#{1,6})\s*(.+)$/gm;
    let last = null;
    for (const m of segment.matchAll(headingRegex)) {
      last = m[2].trim();
    }
    if (!last) return null;
    // ignore text inside HTML tags by stripping tags
    const cleaned = last.replace(/<[^>]*>/g, '').trim();
    return cleaned || null;
  }

  // collect file entries
  const files = new Map(); // filename -> { slides: Set, snippets: [{content, langInfo, openingLine, slide}] }
  const usedBasenames = new Map(); // basename + ext -> Set(slideNumbers)
  const matchesData = [];

  // First pass: determine filename for each match and collect snippets
  for (const m of matches) {
    const startPos = m.index ?? 0;
    var title = null;
    const openingLine = m[1].replace(/\n$/, '').replace(/(?:\[[^\]]*\])+/g, (match) => {
        title = match;
        return '';
    });

    const langInfo = (m[2] || '').trim();
    const codeContent = m[3].replace(/\r\n/g, '\n').replace(/\n$/, '');
    const slideNum = getSlideNumberForPos(startPos);
    const slideStart = slideStarts[Math.max(0, slideNum - 1)];
    const headingRaw = findNearestHeadingBefore(startPos, slideStart) || `slide-${slideNum}`;
    const baseCandidate = sanitizeFilename(headingRaw);

    // determine extension
    const langMatch = langInfo.match(/^([a-zA-Z0-9+-]+)/);
    const langToken = langMatch ? langMatch[1].toLowerCase() : '';
    const ext = langToken ? (langToExt[langToken] ?? `.${langToken}`) : '.txt';

    // attempt filename, append slide suffix only if collision between different slides
    let filenameBase = baseCandidate;
    let filename = `${filenameBase}${ext}`;

    //// Slides with the same heading will split into files per slide
    // const key = filename.toLowerCase();
    // if (files.has(filename)) {
    //   const existing = files.get(filename);
    //   const slidesSet = existing.slides;
    //   if (!slidesSet.has(slideNum)) {
    //     // collision with different slide -> append slide number
    //     filenameBase = `${baseCandidate}-s${slideNum}`;
    //     filename = `${filenameBase}${ext}`;
    //   }
    // } else {
    //   // If another file has same basename but different ext and used by other slide, that's fine.
    //   // Also ensure we don't accidentally create filename that another basename already used for other slide+ext.
    //   if (usedBasenames.has(`${baseCandidate}${ext.toLowerCase()}`)) {
    //     const slidesSet = usedBasenames.get(`${baseCandidate}${ext.toLowerCase()}`);
    //     if (!slidesSet.has(slideNum)) {
    //       filenameBase = `${baseCandidate}-s${slideNum}`;
    //       filename = `${filenameBase}${ext}`;
    //     }
    //   }
    // }

    // record used basename for this ext
    const ubKey = `${filenameBase}${ext.toLowerCase()}`;
    if (!usedBasenames.has(ubKey)) usedBasenames.set(ubKey, new Set([slideNum]));
    else usedBasenames.get(ubKey).add(slideNum);

    // push snippet into files map
    const entry = files.get(filename) ?? { slides: new Set(), snippets: [] };
    entry.slides.add(slideNum);
    const snippetName = `snippet-${entry.snippets.length + 1}`;
    entry.snippets.push({ content: codeContent, langInfo, openingLine, title, slide: slideNum, label: snippetName });
    files.set(filename, entry);

    // keep data for replacement pass
    matchesData.push({
      start: startPos,
      end: startPos + m[0].length,
      openingLine,
      langInfo,
      slide: slideNum,
      finalFilename: filename,
      snippetName: snippetName,
      file: entry
    });
  }

  // ensure snippets dir exists
  await ensureDir(snippetsDir);

  // write snippet files
  for (const [filename, entry] of files) {
    const ext = path.extname(filename).toLowerCase();
    const [regionStart, regionEnd] = regionMarkersForExt(ext);
    const outParts = [];
    if (entry.snippets.length === 1) {
      // single snippet -> write directly
        if(entry.snippets[0].title) {
            outParts.push(entry.snippets[0].title);
        }
      outParts.push(entry.snippets[0].content + '\n');
    } else {
      // multiple -> wrap each with region markers
      entry.snippets.forEach((s, idx) => {
        outParts.push(regionStart.replace('#region', `#region ${s.label}`));
        if(s.title) {
            outParts.push(s.title);
        }
        outParts.push(s.content);
        outParts.push(regionEnd.replace('#endregion', `#endregion ${s.label}`));
        outParts.push('');
      });
    }
    const out = outParts.join('\n');
    !debug && await fs.writeFile(path.join(snippetsDir, filename), out, 'utf8');
    console.log(`Wrote ${filename} (${entry.snippets.length} snippet(s))`);
  }

  // Rebuild slides.md with replacements (position-aware)
  let newParts = [];
  let lastIndex = 0;

  // sort matchesData by start to ensure order
  matchesData.sort((a, b) => a.start - b.start);

  for (const item of matchesData) {
    newParts.push(raw.slice(lastIndex, item.start));
    // build replacement
    newParts.push(`<<< @/snippets/${item.finalFilename}${item.file.snippets.length === 1 ? '' : `#${item.snippetName}`} ${item.openingLine.replace('```', '')}`);
    lastIndex = item.end;
  }
  newParts.push(raw.slice(lastIndex));

  const newSlides = newParts.join('');
  !debug && await fs.writeFile(slidesPath, newSlides, 'utf8');
  console.log('slides.md updated with external snippet includes.');
  console.log('Done.');
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
