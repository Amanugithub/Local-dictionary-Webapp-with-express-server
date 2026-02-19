# Initial Version — Dictionary Project

This is a lightweight Node.js + Express dictionary lookup web app (initial version).
It serves a single-page EJS front-end and looks up words from a prebuilt JSON wordset.

**Quick summary**: type a word in the web UI (or POST to the search endpoints) to retrieve word entries and meanings from a local JSON data source.

---

**Features**
- Simple server rendered UI using EJS.
- Word suggestions endpoint for autocomplete-like behavior.
- Uses a bundled JSON wordset (read-only) for lookups.

---

**Repository layout (relevant files)**
- `wordset.mjs` — Express app (server entrypoint).
- `public/` — static assets (CSS, fonts, images).
- `views/index.ejs` — single EJS view used by the app.
- `package.json` — project metadata and dependencies.
- `../wordset-dictionary/allwords_wordset.json/aacompletewordset.json` — the JSON wordset used by `wordset.mjs` (expected relative to this folder).

See the files in this folder for the full project structure.

---

Prerequisites
- Node.js 14+ (recent Node releases support ES modules with `.mjs`).
- npm (to install dependencies listed in `package.json`).

---

Installation
1. Open a terminal and change to this folder:

```bash
cd "initial_version"
```

2. Install dependencies:

```bash
npm install
```

Note: if `package.json` does not list dependencies, you only need Node to run the `.mjs` file directly.

---

Run the server

From the `initial_version` folder run:

```bash
node wordset.mjs
```

By default the app listens on port `3000` (see `wordset.mjs`). Open http://localhost:3000 in your browser.

If you prefer a different port, set the `PORT` environment variable before starting:

```bash
PORT=4000 node wordset.mjs
```

---

How the app works
- `wordset.mjs` loads a JSON data file with `fs.readFileSync(...)` then starts an Express server and exposes two main routes:
  - `GET /` — renders the `index.ejs` view.
  - `POST /search` — accepts a form field `query` and renders the result on the page.
  - `POST /word` — accepts a `query` field and returns up to 10 suggestion strings that start with the provided prefix (JSON response).

Data source
- The app expects the main word dataset to be available at:

`../wordset-dictionary/allwords_wordset.json/aacompletewordset.json`

This path is referenced directly from `wordset.mjs` using `readFileSync(...)`. To avoid path resolution issues:
- Run the server from the `initial_version` directory (so the `..` relative path resolves correctly).
- Or modify `wordset.mjs` to load the JSON using an absolute path or using `path.resolve(...)` based on `fileURLToPath(import.meta.url)`.

---

License & credits
- The project includes font files in `public/fonts` and other assets — respect their individual license files (for example `OFL.txt` inside the font folders).
- For the project code, add a LICENSE file at the repo root if you want an explicit license.

---

Enjoy — open the app at http://localhost:3000 after starting it.
