# My Design Lab

코드(HTML/CSS/JS)로 디자인을 만들고 PNG/JPEG/PDF로 내보내는 개인 레포입니다. Node+Puppeteer 또는 Python+Playwright 중 원하는 스택을 선택해 사용할 수 있습니다. GitHub Codespaces에서 바로 열어 작업하세요.

## 폴더 구조

```
.
├─ .devcontainer/         # Codespaces 개발환경
├─ src/
│  ├─ render.mjs          # Node + Puppeteer 렌더 스크립트
│  └─ python/
│     └─ render.py        # Python + Playwright 렌더 스크립트
│  └─ templates/
│     └─ sample/          # 샘플 템플릿(HTML/CSS)
├─ assets/                # 로고/이미지/폰트 등 업로드
├─ uploads/               # 원본 업로드(정리용, 자유롭게)
├─ exports/               # 내보낸 결과물(PNG/JPG/PDF)
├─ .gitattributes         # Git LFS(이미지/PDF) 설정
├─ package.json
├─ requirements.txt
└─ README.md
```

## 시작하기 (Codespaces)
1. GitHub에서 “Code > Create codespace on main” 클릭
2. 컨테이너 준비 후 터미널에서:
   ```bash
   npm run render        # Node+Puppeteer
   npm run render:py     # Python+Playwright
   ```
   - `exports/` 폴더에 결과물 생성: `sample(.png|.jpg|.pdf)`, `sample-py(.png|.jpg|.pdf)`

## 로컬에서 사용
- Node.js 20+ 또는 Python 3.11+가 필요합니다.
- Node:
  ```bash
  npm install
  npm run render
  ```
- Python:
  ```bash
  pip install -r requirements.txt
  python -m playwright install --with-deps chromium
  npm run render:py
  ```

## 렌더 명령 예시

- 지정 크기 PNG/JPEG/PDF (Node):
  ```bash
  node src/render.mjs \
    --input src/templates/sample/index.html \
    --out exports/sample-1200x628 \
    --width 1200 --height 628 \
    --formats png,jpeg,pdf \
    --scale 2 \
    --background white
  ```

- A4 PDF (Node):
  ```bash
  node src/render.mjs --input src/templates/sample/index.html --out exports/sample-a4 --pdf a4
  ```

- 지정 크기 PNG/JPEG/PDF (Python):
  ```bash
  python src/python/render.py \
    --input src/templates/sample/index.html \
    --out exports/sample-py-1200x628 \
    --width 1200 --height 628 \
    --formats png,jpeg,pdf \
    --scale 2 \
    --background white
  ```

- A4 PDF (Python):
  ```bash
  python src/python/render.py --input src/templates/sample/index.html --out exports/sample-py-a4 --pdf a4
  ```

옵션(공통):
- `--width`, `--height`: PNG/JPEG 뷰포트(px)
- `--scale`: 스크린샷 DPI 스케일(고해상도용, 기본 1)
- `--formats`: `png,jpeg,pdf` 중 콤마 구분
- `--quality`: JPEG 품질(1–100, 기본 90)
- `--background`: PNG/JPEG 배경색(예: `white`, `#000`, `transparent`)
- `--pdf`: `a4`, `letter` 또는 생략(생략 시 width/height px로 PDF 사이즈)

팁:
- 완전 투명 PNG: `--background transparent`와 CSS에서 `body{background:transparent}` 권장
- PDF 인쇄 배경 포함: 기본 활성화(`printBackground/print_background: true`)

## Git LFS
- `.gitattributes`로 PNG/JPG/PDF 등 대용량 파일을 LFS로 추적합니다.
- Codespaces는 자동으로 `git lfs install` 실행합니다.
- 저장소 용량과 LFS 쿼터 정책을 확인하세요.

## CI (선택)
수동 트리거로 샘플을 렌더하고 아티팩트를 업로드하는 워크플로가 포함되어 있습니다:
- GitHub Actions > Workflows > Render sample > Run workflow

## 라이선스
MIT License