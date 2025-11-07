import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .requiredOption("--input <path>", "Input HTML file path (e.g. src/templates/sample/index.html)")
  .option("--out <path>", "Output file path prefix without extension (e.g. exports/banner)", "")
  .option("--width <px>", "Viewport width in px (for PNG/JPEG)", (v) => parseInt(v, 10))
  .option("--height <px>", "Viewport height in px (for PNG/JPEG)", (v) => parseInt(v, 10))
  .option("--formats <list>", "Comma-separated formats: png,jpeg,pdf", "png,pdf")
  .option("--scale <n>", "Device scale factor for higher DPI screenshots", (v) => parseFloat(v), 1)
  .option("--quality <1-100>", "JPEG quality", (v) => parseInt(v, 10), 90)
  .option("--background <value>", "Background for PNG/JPEG (css color or 'transparent')", "white")
  .option("--pdf <paper>", "PDF paper: a4 | letter | custom (uses width/height in px)")
  .option("--timestamp", "Append -YYYYMMDD-HHMMSS to output prefix for history stacking", false)
  .parse(process.argv);

const opts = program.opts();
const formatSource = program.getOptionValueSource("formats");

const resolvedFormats =
  formatSource === "default" && opts.pdf
    ? ["pdf"]
    : (opts.formats || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function timestampSuffix() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const HH = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `-${yyyy}${MM}${dd}-${HH}${mm}${ss}`;
}

function outPrefix() {
  if (opts.out) return opts.out;
  const base = path.basename(opts.input, path.extname(opts.input));
  return path.join("exports", base);
}

function paperFormat(paper) {
  const map = {
    a4: { format: "a4" },
    letter: { format: "letter" }
  };
  return paper ? map[paper.toLowerCase()] || null : null;
}

(async () => {
  const inputPath = path.resolve(process.cwd(), opts.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  let outBase = outPrefix();
  if (opts.timestamp) {
    outBase += timestampSuffix();
  }
  ensureDir(path.dirname(outBase));

  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    if (opts.background === "transparent") {
      await page.emulateMediaType("screen");
      await page.evaluateOnNewDocument(() => {
        const style = document.createElement("style");
        style.textContent = "html, body { background: transparent !important; }";
        document.documentElement.appendChild(style);
      });
    }

    if (opts.width && opts.height) {
      await page.setViewport({
        width: opts.width,
        height: opts.height,
        deviceScaleFactor: opts.scale ?? 1
      });
    }

    const fileUrl = "file://" + inputPath;
    await page.goto(fileUrl, { waitUntil: "networkidle0" });

    if (resolvedFormats.includes("png")) {
      const pngPath = `${outBase}.png`;
      await page.screenshot({
        path: pngPath,
        type: "png",
        omitBackground: opts.background === "transparent",
        fullPage: false
      });
      console.log(`✓ PNG saved: ${pngPath}`);
    }

    if (resolvedFormats.includes("jpeg") || resolvedFormats.includes("jpg")) {
      const jpgPath = `${outBase}.jpg`;
      await page.screenshot({
        path: jpgPath,
        type: "jpeg",
        quality: Math.max(1, Math.min(100, opts.quality)),
        omitBackground: false,
        fullPage: false
      });
      console.log(`✓ JPEG saved: ${jpgPath}`);
    }

    if (resolvedFormats.includes("pdf") || opts.pdf) {
      const pdfPath = `${outBase}.pdf`;
      const paper = opts.pdf;
      let pdfOptions = { path: pdfPath, printBackground: true };

      if (paper) {
        const preset = paperFormat(paper);
        if (preset) {
          pdfOptions = { ...pdfOptions, ...preset };
        } else if (opts.width && opts.height) {
          pdfOptions = { ...pdfOptions, width: `${opts.width}px`, height: `${opts.height}px` };
        }
      } else if (opts.width && opts.height) {
        pdfOptions = { ...pdfOptions, width: `${opts.width}px`, height: `${opts.height}px` };
      }

      await page.pdf(pdfOptions);
      console.log(`✓ PDF saved: ${pdfPath}`);
    }
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});