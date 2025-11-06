import sys
from pathlib import Path
import click
from playwright.sync_api import sync_playwright


def paper_format(paper: str):
    if not paper:
        return None
    m = paper.lower()
    if m in ("a4", "letter"):
        return {"format": m}
    return None


@click.command()
@click.option("--input", "input_path", required=True, type=click.Path(exists=True, dir_okay=False), help="Input HTML file path")
@click.option("--out", "out_prefix", default="", help="Output file path prefix without extension")
@click.option("--width", type=int, help="Viewport width in px (PNG/JPEG)")
@click.option("--height", type=int, help="Viewport height in px (PNG/JPEG)")
@click.option("--formats", default="png,pdf", help="Comma-separated formats: png,jpeg,pdf")
@click.option("--scale", default=1.0, type=float, help="Device scale factor (not applied in Playwright page-level screenshots)")
@click.option("--quality", default=90, type=int, help="JPEG quality (1-100)")
@click.option("--background", default="white", help="Background for PNG/JPEG ('transparent' or CSS color)")
@click.option("--pdf", "pdf_paper", default=None, help="PDF paper: a4 | letter | custom (uses width/height px)")
def main(input_path, out_prefix, width, height, formats, scale, quality, background, pdf_paper):
    input_path = Path(input_path).resolve()
    if not input_path.exists():
        print(f"Input file not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    if out_prefix:
        out_base = Path(out_prefix)
    else:
        out_base = Path("exports") / input_path.stem

    out_base.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        if width and height:
            page.set_viewport_size({"width": width, "height": height})
            try:
                page.emulate_media(media="screen")
            except Exception:
                pass

        file_url = f"file://{input_path}"
        page.goto(file_url, wait_until="networkidle")

        fmts = [s.strip().lower() for s in formats.split(",") if s.strip()]

        # PNG
        if "png" in fmts:
            png_path = str(out_base) + ".png"
            page.screenshot(
                path=png_path,
                type="png",
                omit_background=(background == "transparent"),
                full_page=False,
                scale="css",
            )
            print(f"✓ PNG saved: {png_path}")

        # JPEG
        if "jpeg" in fmts or "jpg" in fmts:
            jpg_path = str(out_base) + ".jpg"
            page.screenshot(
                path=jpg_path,
                type="jpeg",
                quality=max(1, min(100, int(quality))),
                full_page=False,
                scale="css",
            )
            print(f"✓ JPEG saved: {jpg_path}")

        # PDF
        if "pdf" in fmts or pdf_paper:
            pdf_path = str(out_base) + ".pdf"
            pdf_opts = {"path": pdf_path, "print_background": True}
            if pdf_paper:
                preset = paper_format(pdf_paper)
                if preset:
                    pdf_opts.update(preset)
                elif width and height:
                    pdf_opts.update({"width": f"{width}px", "height": f"{height}px"})
            elif width and height:
                pdf_opts.update({"width": f"{width}px", "height": f"{height}px"})

            page.pdf(**pdf_opts)
            print(f"✓ PDF saved: {pdf_path}")

        browser.close()


if __name__ == "__main__":
    main()