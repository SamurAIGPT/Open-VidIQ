# Open-VidIQ

> **Open source alternative to VidIQ and TubeBuddy for YouTube creators**

Open-VidIQ gives creators YouTube keyword research, live SERP rank tracking, deep video SEO scorecards, timestamped transcript search, audience comment intelligence, and an AI growth copilot — with **zero monthly subscriptions**.

Powered directly by [MuAPI](https://muapi.ai)'s YouTube SERP and Generative Media APIs. Pay fractions of a cent (~$0.002 to $0.006) per query instead of $19–$99/month.

---

## Why Open-VidIQ?

| Feature | Open-VidIQ (OSS) | VidIQ Pro / Boost | TubeBuddy Legend |
|---|---|---|---|
| **Monthly Subscription** | **$0 / mo (Self-hosted)** | $19 – $99 / mo | $29 – $49 / mo |
| **Cost per Keyword Check** | **~$0.002** (Pay-as-you-go) | Locked in monthly tier | Locked in monthly tier |
| **Cost per Video Audit** | **~$0.006** (Pay-as-you-go) | Locked in monthly tier | Locked in monthly tier |
| **Video SEO Scorecard** | **✓ Unlimited 0–100 Audit** | ✓ Included | ✓ Included |
| **Competitor Tag Extractor** | **✓ 1-Click Copy All** | ✓ Included | ✓ Included |
| **Full Transcript Search** | **✓ With SRT/TXT Exports** | Limited | Limited |
| **Viewer Question Mining** | **✓ Automated Idea Extraction** | Boost plan only | Not available |
| **AI Title & Thumbnail Ideas** | **✓ Unlimited via MuAPI** | Daily limits | Limited credits |
| **Data Integrity** | **100% Real Live YouTube Data** | Proprietary algorithms | Proprietary algorithms |
| **Code Ownership** | **100% Open Source (MIT)** | Proprietary SaaS | Proprietary SaaS |

---

## Core Features

### 1. YouTube Keyword Explorer & SERP (`/keywords`)
- **Real-Time YouTube Rankings**: Search any topic across global markets (`United States`, `United Kingdom`, `Germany`, `India`, etc.) with adjustable depth (top 20, 50, 100).
- **Opportunity Metrics**: Computes estimated search volume, competition score (0–100), and overall keyword opportunity rating.
- **Competitor Tag Cloud**: Aggregates high-frequency tags used by top-ranking competitors with a 1-click **"Copy All Tags"** button.
- **Video Cards**: Detailed SERP cards displaying view counts, publication age, duration, 4K/CC badges, and quick audit links.

### 2. Video SEO Inspector & Scorecard (`/inspect`)
- **Universal Input**: Paste any YouTube link (`watch?v=...`, `youtu.be/...`, `shorts/...`, or raw 11-char ID).
- **VidIQ-Style 0–100 Score**: Algorithmic assessment with letter grade (`A+`, `A`, `B`, `C`, etc.) and executive recommendation.
- **Actionable Optimization Checklist**:
  - Title length optimization (sweet spot: 40–70 characters for desktop & mobile feeds).
  - Title formatting hooks (brackets, numerals, separators).
  - Description richness (500+ characters target for algorithmic indexing).
  - Call-to-action & resource link detection.
  - Video chapter timestamps detection (`00:00`, `01:30`, etc.).
  - Tag volume (10–30 tags target).
  - Title-to-tag keyword cross-pollination.
  - Audience like-to-view ratio (> 3.5% benchmark).
- **Hidden Tag Extractor**: Displays all metadata tags used by the video with one-click copy.
- **Description Viewer**: Formatted view with expandable drawer.

### 3. Transcript & Subtitles Studio (`/transcripts`)
- **Synchronized Closed Captions**: Fetches complete timed transcripts across multiple languages (`en`, `es`, `fr`, `de`, `hi`, `ja`).
- **In-Transcript Search**: Filter spoken lines in real-time to find exact talking points.
- **Clickable Timestamps**: Click any line to highlight and jump to that specific moment.
- **1-Click Export**: Export the full transcript as plain `.txt` or formatted `.srt` subtitle files.

### 4. Audience & Comment Intelligence (`/comments`)
- **Sentiment Breakdown**: Analyzes audience tone across retrieved comments (Positive %, Neutral %, Inquisitive %, Constructive/Negative %).
- **Question Miner**: Automatically mines questions asked by real viewers in the comments — providing creators with immediate inspiration for follow-up uploads.
- **Reaction Ranking**: Displays high-engagement comments ranked by likes and replies.

### 5. AI Creator Copilot (`/copilot`)
- **High-CTR Title Generator**: Generates 5 high-converting YouTube titles across proven psychological hooks:
  1. *Curiosity Gap*
  2. *Master Guide*
  3. *Contrarian Warning*
  4. *Definitive Proof*
  5. *High Stakes*
- **SEO Description Generator**: Ready-to-paste 3-paragraph descriptions with chapter and resource link placeholders.
- **Tag Generator**: 15 targeted search tags with 1-click copy.
- **Thumbnail Visual Concepts**: Generates creative visual directions, focal facial expressions, text overlays, and AI generation prompts ready for image models.

---

## Architecture & MuAPI Endpoints

Open-VidIQ executes directly against [MuAPI](https://muapi.ai)'s production task runner. Requests poll continuously until completion or failure (no arbitrary timeout cuts, no fake fallback data):

| Capability | MuAPI Endpoint | Request Model | Cost |
|---|---|---|---|
| **YouTube Organic SERP** | `POST /seo-youtube-organic` | `SeoYoutubeOrganicRequest` | $0.002 / query |
| **Video Metadata & Tags** | `POST /seo-youtube-video-info` | `SeoYoutubeVideoInfoRequest` | $0.006 / video |
| **Subtitles & Transcripts** | `POST /seo-youtube-video-subtitles` | `SeoYoutubeVideoSubtitlesRequest` | $0.006 / video |
| **Comments & Sentiment** | `POST /seo-youtube-video-comments` | `SeoYoutubeVideoCommentsRequest` | $0.002 / 20 comments |
| **AI Copilot & Hooks** | `POST /gpt-5-nano` | Prompt string | ~$0.0005 / generation |
| **AI Thumbnail Generation** | `POST /nano-banana` | Image prompt | ~$0.005 / image |

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime & UI**: React 19 · TypeScript
- **Styling**: Tailwind CSS v4 (Obsidian & YouTube Studio dark aesthetic)
- **Icons**: Lucide React + custom YouTube & GitHub SVG components
- **API Client**: Pure Fetch with asynchronous task submission and polling (`src/lib/muapi.ts`)

---

## Quickstart

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- A [MuAPI](https://muapi.ai) API key (free sandbox keys are available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SamurAIGPT/Open-VidIQ.git
cd Open-VidIQ

# 2. Configure your environment variables
cp .env.example .env
# Edit .env and set your MUAPI_API_KEY:
# MUAPI_API_KEY=your_key_here

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Compile and build production bundle
npm run build

# Start production server
npm start
```

---

## Related Projects

- [every-app/open-seo](https://github.com/every-app/open-seo) — Open source alternative to Semrush and Ahrefs (built on DataForSEO)
- [Open-Pomelli](https://github.com/SamurAIGPT/Open-Pomelli) — Open source alternative to Google Pomelli (brand campaigns & assets)
- [Open-Poe-AI](https://github.com/Anil-matcha/Open-Poe-AI) — Open source alternative to Poe AI
- [muapiapp](https://github.com/SamurAIGPT/muapiapp) — Generative media & SEO API platform
- [awesome-vibecoded-saas](https://github.com/Anil-matcha/awesome-vibecoded-saas) — broader catalog of open-source SaaS alternatives featuring this creator-research workflow.
- [Muapi open-source alternatives](https://muapi.ai/open-source/alternative) — compare the creator-research workflow with the paid tools it targets.

---

## Contributing

Contributions are always welcome! Feel free to open an issue or submit a pull request:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

© [Open-VidIQ Contributors](https://github.com/SamurAIGPT/Open-VidIQ)
