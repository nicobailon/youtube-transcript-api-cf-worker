import { getSubtitles } from 'youtube-captions-scraper';

type SubtitleEntry = {
  start: string;
  dur: string;
  text: string;
};

const extractVideoId = (youtubeLink: string): string | null => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = youtubeLink.match(regex);
  return match ? match[1] : null;
};

const convertSecondsToTimestamp = (totalSeconds: number): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  const ms = Math.floor((totalSeconds % 1) * 1000);
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},${ms.toString().padStart(3, '0')}`;
};

async function generateSrtFromYouTube(videoUrl: string): Promise<string> {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw new Error('Invalid YouTube URL provided');

  try {
    const subtitles: SubtitleEntry[] = await getSubtitles({ videoID: videoId });
    return subtitles.map((entry, idx) => {
      const start = parseFloat(entry.start);
      const end = start + parseFloat(entry.dur);
      return `${idx + 1}\n${convertSecondsToTimestamp(start)} --> ${convertSecondsToTimestamp(end)}\n${entry.text}\n\n`;
    }).join('');
  } catch (err) {
    throw new Error(`Failed to fetch subtitles: ${err.message}`);
  }
}

export default {
  async fetch(req: Request): Promise<Response> {
    const targetUrl = new URL(req.url).searchParams.get('url');

    if (!targetUrl) {
      return new Response('Missing YouTube URL. Please provide it as a "url" query parameter.', { status: 400 });
    }

    try {
      const srtContent = await generateSrtFromYouTube(targetUrl);
      return new Response(srtContent, { headers: { 'Content-Type': 'text/plain' } });
    } catch (err) {
      return new Response(err.message, { status: 500 });
    }
  },
};