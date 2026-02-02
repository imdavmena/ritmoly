export type PlaylistSectionTrack = {
  artist: string;
  title: string;
  reason: string;
  mix_note: string;
  platform_links: {
    spotify?: string;
    beatport?: string;
    soundcloud?: string;
    youtube?: string;
  };
  preview_url?: string | null;
};

export type PlaylistSection = {
  name: "Warmup" | "Build" | "Peak" | "Closing";
  tracks: PlaylistSectionTrack[];
};

export type PlaylistDoc = {
  _id: string; // nanoid
  user_id: string;
  upload_id: string;
  title: string;
  bpm_range: string;
  duration_minutes: 30 | 60 | 90;
  vibe: string;
  event_type: string;
  sections: PlaylistSection[];
  created_at: Date;
};
