# My Design Lab - AI Coding Agent Instructions

## Architecture Overview

This is a **dual-stack design rendering system** that converts HTML/CSS templates into high-quality PNG, JPEG, and PDF outputs using either Node.js + Puppeteer or Python + Playwright. The project is optimized for GitHub Codespaces with automatic dev environment setup.

### Core Components
- **Render Engines**: `src/render.mjs` (Node) and `src/python/render.py` (Python) - parallel implementations with identical CLI interface
- **Template System**: Modular CSS architecture in `src/templates/` with shared components, themes, and paper formats
- **Asset Pipeline**: `assets/` for images/fonts → `exports/` for generated outputs, tracked via Git LFS

## Key Architectural Patterns

### Template Structure
Templates follow a **3-layer CSS architecture**:
1. **Base layer** (`common/base.css`): Core utilities and canvas components
2. **Paper layer** (`common/paper-a4.css`): Print-specific formatting and page dimensions
3. **Theme layer** (`themes/theme-*.css`): Color schemes and visual styling

Example template imports:
```html
<link href="../common/base.css" rel="stylesheet" />
<link href="../common/paper-a4.css" rel="stylesheet" />
<link href="../themes/theme-indigo.css" rel="stylesheet" />
```

### Dual-Engine Consistency
Both render engines accept **identical CLI parameters** but have implementation differences:
- **Puppeteer**: Uses `deviceScaleFactor` for high-DPI screenshots
- **Playwright**: Uses `scale: "css"` parameter
- Both support `--background transparent` with different internal handling

### Viewport vs Paper Modes
The system operates in two distinct modes:
- **Viewport mode**: `--width 1200 --height 628` creates fixed-size outputs
- **Paper mode**: `--pdf a4` uses print dimensions (1240×1754px for A4 preview)

## Essential Development Workflows

### Quick Start Commands
```bash
# Node.js rendering (standard)
npm run render                    # Sample template → exports/sample/
npm run render:ts                 # With timestamp for versioning
npm run watch                     # Auto-rebuild on template changes

# Python rendering (alternative stack)  
npm run render:py                 # Python equivalent
npm run render:py:pdf            # PDF-only output

# A4 document workflow
npm run render:a4:png            # A4 template as PNG
npm run render:a4:pdf            # A4 template as PDF
npm run watch:a4                 # A4 auto-rebuild
```

### Development Environment
The **devcontainer** automatically installs:
- Node 20 + Python 3.11 + Git LFS
- All dependencies via `npm ci` and `pip install -r requirements.txt`
- Playwright Chromium with system dependencies
- VS Code extensions for formatting (Prettier, ESLint, Black)

### Custom Render Commands
Both engines support identical advanced options:
```bash
# High-quality social media images
node src/render.mjs --input src/templates/sample/index.html \
  --out exports/custom/banner --width 1200 --height 628 \
  --formats png,jpeg,pdf --scale 2 --background white

# Transparent PNG with custom quality
python src/python/render.py --input src/templates/custom/index.html \
  --out exports/transparent --background transparent --formats png --scale 1.5
```

## Project-Specific Conventions

### File Organization
- **Templates**: Place in `src/templates/{project}/` with local `index.html` + `styles.css`
- **Assets**: Use `../../../assets/{category}/` paths from templates 
- **Exports**: Auto-created in `exports/{project}/` with timestamp support via `--timestamp`
- **Themes**: Reusable in `src/templates/themes/` - swap to change entire color scheme

### CSS Custom Properties Pattern
All templates use CSS variables for theming consistency:
```css
:root {
  --ink: #162137;        /* Primary text */
  --accent: #b99a58;     /* Highlights/CTAs */
  --muted: #44506a;      /* Secondary text */
  --muted-soft: #6b748a; /* Tertiary text */
}
```

### Interactive Controls Pattern
A4 templates include **development-time controls** that auto-hide during render:
- `.font-picker`: Live font switching with `.font-switch-tagline` targets
- CSS variable updates via JavaScript for real-time preview
- `render-mode` class automatically applied on narrow viewports

### Background Transparency Handling
For transparent PNGs, templates require **dual approach**:
1. `--background transparent` CLI flag
2. CSS: `html, body { background: transparent !important; }`

### Asset Path Conventions
- **Relative paths from templates**: `../../../assets/category/file.ext`
- **Web fonts**: Google Fonts with `preconnect` optimization
- **Images**: Use Git LFS for PNG/JPG (configured in `.gitattributes`)

## Integration Points

### Git LFS Configuration
Large assets automatically tracked via `.gitattributes`:
```
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text  
*.pdf filter=lfs diff=lfs merge=lfs -text
```

### File Structure Dependencies
- Templates reference assets via **relative paths** (ensures portability)
- Common CSS imported **before** themes (allows overrides)
- Paper CSS applied **after** base (specializes layout)

### Watch Mode Integration
Uses `chokidar-cli` for file watching:
- Monitors `src/templates/{project}/**/*` for changes
- Triggers render with `--timestamp` for history tracking
- Separate watch commands per template project

## Debugging Patterns

### CLI Testing
Test both engines with identical parameters to verify consistency:
```bash
# Compare outputs
npm run render && npm run render:py
# Check exports/sample/ for file size/quality differences
```

### Template Development
- Use `watch:*` commands for rapid iteration
- Check browser dev tools for CSS variable application
- Verify print CSS with browser print preview before PDF generation

### Environment Issues
- Git LFS: Run `git lfs install` if asset pulls fail
- Dependencies: Re-run devcontainer rebuild if render commands fail  
- Fonts: Verify Google Fonts loading in offline environments