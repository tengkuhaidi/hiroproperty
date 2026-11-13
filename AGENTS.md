# Operational Rules & Project Invariants — Hiro Property

## 1. Cloudflare Bindings & Edge Infrastructure
- D1 Database: `hiroproperty_db` (`a84ddba4-92e2-490c-9f5b-e311bbc731f1`).
- R2 Bucket: `hiroproperty-assets` (curated high-res property assets & unit layouts).
- Pages API Functions: `/opt/data/projects/hiroproperty/functions/api/` (`articles`, `leads`, `units`, `marcomm`).

## 2. Standar Frontend & Estetika
- Brand identity: Slate Obsidian (`#0F172A`), Champagne Sand Gold (`#E2B755`), Warm Ivory Canvas (`#FDFBF7`).
- Anti-AI slop: Tata letak architectural modern, clean whitespace (>40%), font pairing berkarakter.

## 3. Alur Build & Deployment
- Deploy command:
  ```bash
  set -a; source /opt/data/.cloudflare.env; set +a
  cd /opt/data/projects/hiroproperty && npx @cloudflare/next-on-pages && npx wrangler pages deploy .vercel/output/static --project-name=hiroproperty --commit-dirty=true
  ```
