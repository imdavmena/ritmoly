export class MusicSearchService {
  // PLACEHOLDER: aquí integrarías Spotify API / Beatport search / SoundCloud / YouTube
  // Para MVP devolvemos links “best guess” con querystring.
  buildLinks(artist: string, title: string) {
    const q = encodeURIComponent(`${artist} ${title}`);
    return {
      spotify: `https://open.spotify.com/search/${q}`,
      beatport: `https://www.beatport.com/search?q=${q}`,
      soundcloud: `https://soundcloud.com/search?q=${q}`,
      youtube: `https://www.youtube.com/results?search_query=${q}`
    };
  }

  async findPreviewUrl(_artist: string, _title: string): Promise<string | null> {
    // PLACEHOLDER: Spotify preview_url u otra fuente
    return null;
  }
}
