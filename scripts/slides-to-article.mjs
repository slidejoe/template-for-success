import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { parse } from "@slidev/parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const slidesPath = path.join(repoRoot, "slides.md");
const outPath = path.join(repoRoot, "article.md");

function extractFrontMatter(text) {
  if (!text.startsWith("---")) return { front: null, rest: text };
  const sepRegex = /^---\s*$/gm;
  const matches = [...text.matchAll(sepRegex)];
  if (matches.length < 2 || matches[0].index !== 0)
    return { front: null, rest: text };
  const second = matches[1];
  const fmEnd = second.index + second[0].length;
  const front = text.slice(0, fmEnd);
  const rest = text.slice(fmEnd).replace(/^\r?\n+/, "");
  return { front, rest };
}

function normalizeCodeFences(slideContent) {
  // Replace opening fences like ```ts{monaco} or ```md magic-move[...] with ```ts or ```md
  return slideContent.replace(/(^```)([^\n\r]*)/gm, (_, fence, rest) => {
    const langMatch = (rest || "").trim().match(/^([a-zA-Z0-9+#-]+)/);
    if (langMatch) return fence + langMatch[1];
    return fence;
  });
}

function stripSlidevMarkers(slideContent) {
  // remove lines consisting of ::something:: or :::something:::
  return slideContent.replace(/^\s*::[^\n:]*::\s*$/gm, "");
}

function prepareNote(note) {
  if (!note) return;
  // [Click] removed
  return note.replace(/\[Click\]/gi, "");
}

function removeStyleTags(slideContent) {
  return slideContent.replace(/<style[\s\S]*?<\/style>/gi, "");
}

function stripHtmlTagsKeepText(slideContent) {
  // keep inner text, remove tags; remove self-closing tags (like <img/>) entirely
  return slideContent.replace(/<\/?[^>]+>/g, "");
}

function removeDuplicateHeadings(slideContent, seen) {
  // remove duplicate headings across the whole article. `seen` is a Set shared across slides
  const lines = slideContent.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    const h = line.match(/^\s*(#{1,6})\s*(.+?)\s*$/);
    if (h) {
      const headingText = h[2].trim();
      if (seen.has(headingText.toLowerCase())) {
        // skip duplicate heading
        continue;
      }
      seen.add(headingText.toLowerCase());
      out.push(line);
    } else {
      out.push(line);
    }
  }
  return out.join("\n");
}

async function run() {
  const raw = await fs.readFile(slidesPath, "utf8");

  // 1) try slidev parser first
  let slidev = await parse(raw);

  // process slides
  const outSlides = [];
  const seenHeadings = new Set();
  for (let s of slidev.slides) {
    console.log(JSON.stringify(s));
    // if the slide contains layout: bio (either parsed frontmatter or inline), skip
    if (s.frontmatter.layout == "bio") continue;

    if (!s || !s.contentRaw || !s.contentRaw.trim()) continue;

    var slideContent = s.contentRaw;

    if (s.frontmatter.image) {
      slideContent = `![](${s.frontmatter.image})` + slideContent;
    }

    // remove [Click]
    slideContent += prepareNote(s.note);

    // remove Slidev markers
    slideContent = stripSlidevMarkers(slideContent);

    // remove style blocks entirely
    slideContent = removeStyleTags(slideContent);

    // replace HTML elements with their inner text (self-closing removed)
    slideContent = stripHtmlTagsKeepText(slideContent);

    // remove duplicate headings across slides
    slideContent = removeDuplicateHeadings(slideContent, seenHeadings);

    // normalize code fence headers
    slideContent = normalizeCodeFences(slideContent);

    slideContent = slideContent.trim();
    if (slideContent) outSlides.push(slideContent);
  }

  // build article
  const parts = [];

  parts.push(outSlides.join("\n\n"));

  const article = parts.join("\n").trim() + "\n";
  await fs.writeFile(outPath, article, "utf8");
  console.log(`Wrote ${path.relative(repoRoot, outPath)}`);
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
