# youtube-transcript-api-cf-worker

This Bun-powered project converts YouTube video subtitles to SRT format using Cloudflare Workers.

## Setup

1. Install [Bun](https://bun.sh) if you haven't already.

2. Clone and enter the repo:
   ```bash
   git clone https://github.com/nicobailon/youtube-transcript-api-cf-worker.git
   cd youtube-transcript-api-cf-worker
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Get Wrangler:
   ```bash
   bun add -g wrangler
   ```

5. Log into Cloudflare:
   ```bash
   wrangler login
   ```

## Dev Mode

Run locally:
```bash
wrangler dev
```

Access at `http://localhost:8787`.

## Ship It

Deploy to Cloudflare:

```bash
wrangler publish
```

## How to Use

Hit your worker with a GET request:

https://your-worker.workers.dev/?url=https://www.youtube.com/watch?v=H7Qe96fqg1M

You'll get the SRT content as plain text.


## Project Anatomy

- `src/index.ts`: Worker logic
- `wrangler.toml`: Cloudflare config
- `package.json`: Project metadata
- `tsconfig.json`: TypeScript settings

## Open Source Goodies

- youtube-captions-scraper (MIT)
- @cloudflare/workers-types (BSD-3-Clause)
- typescript (Apache-2.0)


## Contribute

PRs welcome!

## License

MIT. Go wild.