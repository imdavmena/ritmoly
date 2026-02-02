import { OpenAIClient } from "./OpenAIClient";
import { MusicSearchService } from "./MusicSearchService";

export class PlaylistGeneratorService {
  private ai = new OpenAIClient();
  private search = new MusicSearchService();

  async generate(params: {
    duration_minutes: 30 | 60 | 90;
    vibe: string;
    bpm_range: string;
    event_type: string;
    seed_track_filename: string;
  }) {
    const prompt = `
Generate a DJ set playlist plan strictly as JSON with this shape:
{
  "title": string,
  "bpm_range": string,
  "sections": [
    { "name": "Warmup", "tracks": [ ... ] },
    { "name": "Build", "tracks": [ ... ] },
    { "name": "Peak", "tracks": [ ... ] },
    { "name": "Closing", "tracks": [ ... ] }
  ]
}

Each track:
{
  "artist": string,
  "title": string,
  "reason": string,
  "mix_note": string
}

Constraints:
- Total tracks across all sections should match a ${params.duration_minutes} minute set (approx).
- Keep consistent vibe lineage: ${params.vibe}.
- BPM range target: ${params.bpm_range}.
- Event type: ${params.event_type}.
- Seed file name: ${params.seed_track_filename} (use as inspiration; you do NOT have audio analysis).
- No markdown. JSON only.
`;

    const raw = await this.ai.chatJson(prompt);

    // Enriquecer con links + preview placeholders
    for (const section of raw.sections ?? []) {
      for (const tr of section.tracks ?? []) {
        tr.platform_links = this.search.buildLinks(tr.artist, tr.title);
        tr.preview_url = await this.search.findPreviewUrl(tr.artist, tr.title);
      }
    }
    return raw;
  }
}
