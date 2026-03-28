# APEX F1 — Deploy Guide

## File structure you need

```
apex-f1/
├── api/
│   └── chat.js          ← serverless proxy (keeps API key secret)
├── src/
│   ├── App.jsx          ← the main apex_v12 app
│   └── main.jsx         ← React entry point
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## Step 1 — Create the project folder

```bash
mkdir apex-f1 && cd apex-f1
mkdir -p api src
```

## Step 2 — Drop in the files

Copy each file from this bundle into the right location:

| File from bundle    | Goes to             |
|---------------------|---------------------|
| apex_deploy.jsx     | src/App.jsx         |
| api_chat.js         | api/chat.js         |
| main.jsx            | src/main.jsx        |
| index.html          | index.html          |
| package.json        | package.json        |
| vite_config.js      | vite.config.js      |
| vercel.json         | vercel.json         |

## Step 3 — Install dependencies

```bash
npm install
```

## Step 4 — Test locally

```bash
npm run dev
```

Open http://localhost:5173 — the app should load. 
Note: LLM mode won't work locally yet (no API key). Rule-based mode works fine.

## Step 5 — Push to GitHub

```bash
git init
git add .
git commit -m "APEX F1 v12"
gh repo create apex-f1 --public --push
# or: git remote add origin https://github.com/YOUR_USERNAME/apex-f1.git
#     git push -u origin main
```

## Step 6 — Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts (all defaults are fine).

## Step 7 — Add your API key (for LLM mode)

1. Go to https://vercel.com → your project → Settings → Environment Variables
2. Add:  Name = `ANTHROPIC_API_KEY`  Value = `sk-ant-...your key...`
3. Click Save, then go to Deployments → Redeploy

That's it. Your app is live with a URL like `https://apex-f1-xxx.vercel.app`

---

## LLM toggle

In the AI Engineer panel:
- **Rule-based (default)** — instant, no API call, works offline
- **LLM mode** — check "use LLM" checkbox, calls claude-sonnet-4 via your proxy

---

## Custom domain (optional)

In Vercel → Settings → Domains → add your domain → follow DNS instructions.
