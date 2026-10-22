// Rewrites the README's writing log from the blog's RSS feed. Run daily by .github/workflows/writing.yml.
import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const FEED = "https://blog.victorbona.dev/rss";
const START = "<!-- writing:start -->";
const END = "<!-- writing:end -->";

const decode = (s) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
    .trim();
const tag = (item, name) => decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? "");

export function parse(xml, limit = 5) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => ({ title: tag(item, "title"), link: tag(item, "link"), date: new Date(tag(item, "pubDate")) }))
    // Papers have their own table in the README; the log carries posts only.
    .filter((i) => i.title && i.link.includes("/blog/") && !Number.isNaN(i.date.getTime()))
    .sort((a, b) => b.date - a.date)
    .slice(0, limit);
}

export function render(items) {
  return items
    .map((i) => `- \`${i.date.toISOString().slice(0, 10)}\` [${i.title.replace(/[[\]]/g, "\\$&")}](${i.link})`)
    .join("\n");
}

// Self-check on a fixture, so a feed format change fails loudly instead of emptying the README.
const sample = parse(`<item><title>A &amp; B</title><link>https://x/blog/a</link><pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate></item>`);
assert.equal(render(sample), "- `2024-01-01` [A & B](https://x/blog/a)");

const res = await fetch(FEED);
if (!res.ok) throw new Error(`${FEED}: HTTP ${res.status}`);
const items = parse(await res.text());
assert.ok(items.length > 0, "feed returned no items; leaving the README untouched");

const readme = await readFile("README.md", "utf8");
const [head, rest] = readme.split(START);
assert.ok(rest?.includes(END), "README is missing the writing markers");
const next = `${head}${START}\n${render(items)}\n${END}${rest.split(END)[1]}`;
if (next !== readme) {
  await writeFile("README.md", next);
  console.log(`updated writing log: ${items.length} entries`);
} else console.log("writing log already current");
