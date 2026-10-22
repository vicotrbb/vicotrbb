// Renders the profile's SVG assets in the blog's "Control Plane, Phosphor Edition" look.
// Text is drawn as paths: GitHub serves SVGs as images, so they cannot load web fonts.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import opentype from "opentype.js";

const C = {
  bg: "#020604",
  panel: "#08110c",
  line: "#15241b",
  lineStrong: "#1f5c3a",
  rule: "#2a7a4c",
  text: "#d8e8de",
  dim: "#6f8f7c",
  lit: "#4dff8f",
  warn: "#e8c45c",
};

// Fonts the site ships (Martian Mono, Schibsted Grotesk), static cuts from Fontsource.
async function font(family, weight) {
  const file = `.cache/${family}-${weight}.ttf`;
  let buf = await readFile(file).catch(() => null);
  if (!buf) {
    const res = await fetch(`https://cdn.jsdelivr.net/fontsource/fonts/${family}@latest/latin-${weight}-normal.ttf`);
    if (!res.ok) throw new Error(`font ${family} ${weight}: HTTP ${res.status}`);
    buf = Buffer.from(await res.arrayBuffer());
    await mkdir(".cache", { recursive: true });
    await writeFile(file, buf);
  }
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const F = {
  mono: await font("martian-mono", 400),
  monoBold: await font("martian-mono", 700),
  sans: await font("schibsted-grotesk", 400),
  sansBold: await font("schibsted-grotesk", 600),
};

const width = (s, f, size) => f.getAdvanceWidth(s, size);

// One run of text as a path. anchor: start | middle | end.
function t(s, { x, y, f = F.mono, size = 14, fill = C.text, anchor = "start", attrs = "" }) {
  const w = width(s, f, size);
  const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return `<path${attrs} fill="${fill}" d="${f.getPath(s, x0, y, size).toPathData(2)}"/>`;
}

// Several runs on one baseline, each with its own style; returns [svg, endX].
function runs(parts, { x, y, size = 14 }) {
  let cx = x;
  const out = parts.map(([s, f = F.mono, fill = C.text]) => {
    const p = t(s, { x: cx, y, f, size, fill });
    cx += width(s, f, size);
    return p;
  });
  return [out.join(""), cx];
}

const glow = `<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="2.5" result="b1"/><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b2"/>
  <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
const scan = `<pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="${C.lit}" opacity="0.035"/></pattern>`;
const motion = `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`;

function svg(w, h, label, body, css = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
<title>${label}</title>
<style>${css}${motion}</style>
${body}
</svg>
`;
}

// ---------- banner ----------

function instrument(cx, cy) {
  // Same grammar as the site's ControlPlane: graduated orbits, a lead spoke with a pulse, a lit core.
  const rings = [
    { label: "systems", r: 70, nodes: 4, phase: 2.3 },
    { label: "papers", r: 110, nodes: 7, phase: 2.1 },
    { label: "writing", r: 150, nodes: 9, phase: 4.0 },
    { label: "compendium", r: 186, nodes: 12, phase: 5.3 },
  ];
  const dash = [undefined, "2.4 1.8", undefined, "0.8 2.2"];
  let out = `<circle cx="${cx}" cy="${cy}" r="210" fill="url(#halo)"/>`;
  rings.forEach((ring, i) => {
    const nodes = Array.from({ length: ring.nodes }, (_, k) => {
      const a = ring.phase + (k * 2 * Math.PI) / ring.nodes + (k % 3) * 0.11;
      return [cx + ring.r * Math.cos(a), cy + ring.r * Math.sin(a)];
    });
    const [lx, ly] = nodes[0];
    out += `<g class="ticks" style="animation-duration:${180 + i * 60}s">
  <circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="${C.lineStrong}" stroke-width="5" pathLength="360" stroke-dasharray="0.35 4.65"/>
  <circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="${C.rule}" stroke-width="11" pathLength="360" stroke-dasharray="0.6 29.4"/>
</g>
<circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="${C.rule}" stroke-width="1.25"/>
<line x1="${cx}" y1="${cy}" x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}" stroke="${C.lineStrong}"/>
<line class="pulse" style="animation-delay:${i * 0.8}s" x1="${cx}" y1="${cy}" x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}" pathLength="100" stroke="${C.lit}" stroke-width="2" stroke-linecap="round" stroke-dasharray="10 110" stroke-dashoffset="10" filter="url(#glow)"/>
${nodes
  .map(
    ([x, y], k) =>
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${C.bg}" stroke="${k === 0 ? C.lit : C.rule}" stroke-width="1.5"${dash[(k + i) % 4] ? ` stroke-dasharray="${dash[(k + i) % 4]}"` : ""}/>`,
  )
  .join("\n")}
<rect x="${cx - width(ring.label, F.mono, 11) / 2 - 8}" y="${cy - ring.r - 9}" width="${width(ring.label, F.mono, 11) + 16}" height="18" fill="${C.bg}"/>
${t(ring.label, { x: cx, y: cy - ring.r + 4, size: 11, fill: C.dim, anchor: "middle" })}`;
  });
  out += `<circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="${C.rule}" stroke-width="1.25"/>
<path d="M${cx - 24} ${cy}h6M${cx + 18} ${cy}h6M${cx} ${cy - 24}v6M${cx} ${cy + 18}v6" stroke="${C.rule}" stroke-width="1.25"/>
<rect class="core" x="${cx - 6}" y="${cy - 6}" width="12" height="12" fill="${C.lit}" filter="url(#glow)"/>
${t("victor-bona", { x: cx, y: cy + 36, size: 11, f: F.monoBold, anchor: "middle" })}
${t("· leader", { x: cx, y: cy + 50, size: 11, fill: C.lit, anchor: "middle" })}`;
  return out;
}

function banner() {
  const W = 1200, H = 460;
  const x = 64;
  const [bar] = runs([["P000", F.monoBold, C.lit], ["  victor-bona@control-plane:~", F.mono, C.dim]], { x: 24, y: 28, size: 12 });
  const ready = t("Ready", { x: W - 24, y: 28, size: 12, f: F.monoBold, fill: C.lit, anchor: "end", attrs: ' filter="url(#glow)"' });
  const status = t("status ", { x: W - 24 - width("Ready", F.monoBold, 12), y: 28, size: 12, fill: C.dim, anchor: "end" });

  const cmdY = 112;
  const [prompt, afterPrompt] = runs([["$ ", F.monoBold, C.lit]], { x, y: cmdY, size: 18 });
  const cmdW = width("whoami", F.mono, 18);
  const typed = t("whoami", { x: afterPrompt, y: cmdY, size: 18 });
  // Typing: the clip grows one character per frame, then the output and cursor arrive.
  const steps = Array.from({ length: 7 }, (_, i) => ((cmdW * i) / 6).toFixed(1)).join(";");
  const cursorX = afterPrompt + cmdW + 6;

  const name = t("Victor Bona", { x: x - 3, y: 206, size: 76, f: F.sansBold, attrs: ' letter-spacing="-2"' });
  const line1 = t("Senior Software Engineer, Distributed systems", { x, y: 252, size: 25, f: F.sans, fill: C.dim });
  const line2 = t("specialist and AI enthusiast", { x, y: 286, size: 25, f: F.sans, fill: C.dim });

  const rows = [
    ["role", "Senior Software Engineer @ Hopper"],
    ["uptime", "8 yrs · Amazon, Valari (YC W22), Deel"],
    ["base", "Blumenau, Brazil"],
  ];
  const boxY = 322;
  const readout = rows
    .map(([k, v], i) => t(k, { x: x + 20, y: boxY + 30 + i * 26, size: 13, fill: C.dim }) + t(v, { x: x + 110, y: boxY + 30 + i * 26, size: 13 }))
    .join("");

  const body = `<defs>${glow}${scan}
<radialGradient id="halo"><stop offset="0" stop-color="${C.lit}" stop-opacity="0.07"/><stop offset="1" stop-color="${C.lit}" stop-opacity="0"/></radialGradient>
<clipPath id="type"><rect x="${afterPrompt}" y="${cmdY - 22}" height="30" width="${cmdW}">
  <animate attributeName="width" values="0;0;${steps}" keyTimes="0;${(0.35).toFixed(2)};${Array.from({ length: 7 }, (_, i) => (0.4 + i * 0.1).toFixed(2)).join(";")}" dur="1.6s" calcMode="discrete" fill="freeze"/>
</rect></clipPath></defs>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="${C.bg}" stroke="${C.lineStrong}"/>
<path d="M1 44.5H${W - 1}" stroke="${C.line}"/>
${bar}${status}${ready}
<g class="out">${instrument(925, 252)}</g>
${prompt}<g clip-path="url(#type)">${typed}</g>
<rect class="cursor" x="${cursorX}" y="${cmdY - 16}" width="10" height="20" fill="${C.lit}" filter="url(#glow)"/>
<g class="out">${name}${line1}${line2}
<rect x="${x + 0.5}" y="${boxY + 0.5}" width="${Math.ceil(110 + Math.max(...rows.map(([, v]) => width(v, F.mono, 13))) + 20)}" height="92" fill="${C.panel}" stroke="${C.line}"/>
${readout}</g>
<rect x="1" y="45" width="${W - 2}" height="${H - 46}" rx="9" fill="url(#scan)" pointer-events="none"/>`;

  const css = `
.out { animation: out 1.9s steps(1, end) both; }
@keyframes out { 0%, 99% { opacity: 0; } 100% { opacity: 1; } }
.cursor { animation: blink 1.1s steps(1, end) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.ticks { transform-origin: 925px 252px; animation: spin linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.pulse { animation: beat 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
@keyframes beat { 0% { stroke-dashoffset: 10; } 40%, 100% { stroke-dashoffset: -100; } }
.core { animation: core 3.2s ease-in-out infinite; }
@keyframes core { 50% { opacity: 0.55; } }
`;
  return svg(W, H, "Victor Bona: Senior Software Engineer, Distributed systems specialist and AI enthusiast", body, css);
}

// ---------- section headings ----------

function heading(code, cmd) {
  const size = 15, padX = 16, H = 42;
  const parts = [[code, F.monoBold, C.dim], ["   $ ", F.monoBold, C.lit], [cmd, F.mono, C.text]];
  const W = Math.ceil(padX * 2 + parts.reduce((s, [str, f]) => s + width(str, f, size), 0) + 18);
  const [text] = runs(parts, { x: padX, y: 26, size });
  const body = `
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="5" fill="${C.bg}" stroke="${C.lineStrong}"/>
${text}`;
  return svg(W, H, `$ ${cmd}`, body);
}

// ---------- status chips (used in the systems table) ----------

function chip(label, color, pulse) {
  const size = 11, H = 22;
  const W = Math.ceil(28 + width(label, F.mono, size) + 10);
  const body = `<defs>${glow}</defs>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="3" fill="${C.bg}" stroke="${C.line}"/>
<circle${pulse ? ' class="dot"' : ""} cx="14" cy="11" r="3.5" fill="${color}"${pulse ? ' filter="url(#glow)"' : ""}/>
${t(label, { x: 26, y: 15, size, fill: color })}`;
  return svg(W, H, label, body, pulse ? `.dot { animation: dot 2.4s ease-in-out infinite; } @keyframes dot { 50% { opacity: 0.35; } }` : "");
}

// ---------- footer ----------

function footer() {
  const W = 1200, H = 64;
  const [text, endX] = runs(
    [["$ ", F.monoBold, C.lit], ["exit", F.mono, C.text], ["   # connection kept open at blog.victorbona.dev", F.mono, C.dim]],
    { x: 24, y: 38, size: 14 },
  );
  const body = `<defs>${glow}${scan}</defs>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="8" fill="${C.bg}" stroke="${C.lineStrong}"/>
${text}<rect class="cursor" x="${endX + 8}" y="23" width="9" height="19" fill="${C.lit}" filter="url(#glow)"/>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="7" fill="url(#scan)"/>`;
  return svg(W, H, "exit: connection kept open at blog.victorbona.dev", body, `.cursor { animation: blink 1.1s steps(1, end) infinite; } @keyframes blink { 50% { opacity: 0; } }`);
}

const files = {
  "banner.svg": banner(),
  "footer.svg": footer(),
  "h-node.svg": heading("P200", "describe node/victor-bona"),
  "h-systems.svg": heading("P300", "get systems --owner victor-bona"),
  "h-lab.svg": heading("P310", "get experiments --namespace lab"),
  "h-research.svg": heading("P400", "get papers --sort published"),
  "h-writing.svg": heading("P500", "tail -n 5 /var/log/writing"),
  "h-connect.svg": heading("P900", "connect --to victor-bona"),
  "s-building.svg": chip("building", C.lit, true),
  "s-maintained.svg": chip("maintained", C.text, false),
  "s-sold.svg": chip("sold", C.warn, false),
};
await mkdir("assets", { recursive: true });
for (const [name, content] of Object.entries(files)) await writeFile(`assets/${name}`, content);
console.log(`rendered ${Object.keys(files).length} assets`);
