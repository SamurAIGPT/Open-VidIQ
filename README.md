# Open-VidIQ

> **Open source alternative to VidIQ and TubeBuddy for YouTube creators**

Open-VidIQ gives you YouTube keyword research, live SERP rank tracking, deep video SEO scorecards, timestamped transcript search, audience comment intelligence, and an AI growth copilot — with **zero monthly subscriptions**.

Powered by [MuAPI](https://muapi.ai)'s YouTube SERP endpoints. Pay fractions of a cent (~$0.002) per query instead of $19–$99/month.

---

## Why Open-VidIQ?

| Feature | Open-VidIQ (OSS) | VidIQ Pro / Boost | TubeBuddy Legend |
|---|---|---|---|
| **Monthly Subscription** | **$0 / mo (Self-hosted)** | $19 – $99 / mo | $29 – $49 / mo |
| **Cost per Keyword Check** | **~$0.002** (Pay-as-you-go) | Locked in monthly tier | Locked in monthly tier |
| **Video SEO Scorecard** | **✓ Unlimited 0–100 Audit** | ✓ Included | ✓ Included |
| **Competitor Tag Extractor** | **✓ 1-Click Copy All** | ✓ Included | ✓ Included |
| **Full Transcript Search** | **✓ With SRT/TXT Exports** | Limited | Limited |
| **Viewer Question Mining** | **✓ Automated Idea Extraction** | Boost plan only | Not available |
| **AI Title & Thumbnail Ideas** | **✓ Unlimited via MuAPI** | Daily limit | Limited credits |
| **Code Ownership** | **100% Open Source (MIT)** | Proprietary SaaS | Proprietary SaaS |

---

## Features

### 1. YouTube Keyword Explorer & SERP
- Enter any topic or niche (e.g. `"ai video tutorial"`, `"nextjs 15 course"`).
- Fetches real-time YouTube Organic rankings across countries (`United States`, `United Kingdom`, `Germany`, `India`, etc.).
- Computes estimated monthly search volume, competition score (0–100), and overall keyword opportunity score.
- Aggregates high-frequency competitor video tags with 1-click copy.

### 2. Video SEO Inspector & Scorecard
- Paste any YouTube video URL (`watch?v=...`, `youtu.be/...`, `shorts/...`, or raw 11-char ID).
- Algorithmic **VidIQ-style 0–100 Score** with letter grade (`A+`, `A`, `B`, `C`, `D`, `F`).
- Actionable optimization checklist covering Title length, formatting hooks, description richness, chapter timestamps, tag volume, and like-to-view ratios.
- Extracts all hidden video tags for instant competitive analysis.

### 3. Transcript & Subtitles Studio
- Fetches full synchronized closed captions across multiple languages (`en`, `es`, `fr`, `de`, `hi`, `ja`).
- Interactive transcript viewer with search filter and timestamp jumping.
- One-click export to formatted `.srt` or `.txt`.

### 4. Audience & Comment Intelligence
- Analyzes comment engagement, top commenter reactions, and sentiment breakdown (Positive, Neutral, Inquisitive, Constructive).
- **Question Miner**: automatically extracts viewer questions from comments to discover high-demand topics for your next video!

### 5. AI Creator Copilot
- Generates 5 high-CTR YouTube title variations using proven psychological hooks (Curiosity Gap, Master Guide, Contrarian Warning, Definitive Proof, High Stakes).
- Writes SEO-optimized descriptions with timestamp placeholders.
- Generates visual thumbnail concepts and ready-to-use AI generation prompts.

---

## Architecture & MuAPI Endpoints

Open-VidIQ connects directly to [MuAPI](https://muapi.ai)'s specialized YouTube SERP & generative suite:

| Capability | MuAPI Endpoint | Cost |
|---|---|---|
| **YouTube Organic Search** | `POST /seo-youtube-organic` | $0.002 / search |
| **Video Metadata & Tags** | `POST /seo-youtube-video-info` | $0.006 / video |
| **Subtitles & Transcripts** | `POST /seo-youtube-video-subtitles` | $0.006 / video |
| **Comments & Sentiment** | `POST /seo-youtube-video-comments` | $0.002 / 20 comments |
| **AI Copilot & Prompts** | `POST /gpt-5-nano` | ~$0.0005 / generation |
| **AI Thumbnail Generation** | `POST /nano-banana` | ~$0.005 / image |

---

## Quickstart

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- A free [MuAPI](https://muapi.ai) API key (free sandbox keys are available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SamurAIGPT/Open-VidIQ.git
cd Open-VidIQ

# 2. Configure environment variables
cp .env.example .env
# Edit .env and paste your MUAPI_API_KEY

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!TIP]
> **Zero-Config Demo Mode**: Even without an API key, Open-VidIQ automatically runs in interactive demo mode with pre-cached creator datasets so you can test all features immediately!

---

## Related Projects

- [every-app/open-seo](https://github.com/every-app/open-seo) — Open source alternative to Semrush and Ahrefs
- [Open-Pomelli](https://github.com/SamurAIGPT/Open-Pomelli) — Open source alternative to Google Pomelli (brand campaigns & assets)
- [Open-Poe-AI](https://github.com/Anil-matcha/Open-Poe-AI) — Open source alternative to Poe AI
- [muapiapp](https://github.com/SamurAIGPT/muapiapp) — Generative media API platform

---

## License

MIT © [Open-VidIQ Contributors](https://github.com/SamurAIGPT/Open-VidIQ)
