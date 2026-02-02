export type UploadDoc = {
  _id: string; // nanoid
  user_id: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  // IMPORTANT: NO guardar mp3 en MongoDB. Solo metadata.
  storage_key: string;        // placeholder pointer to temp storage
  storage_url?: string;       // optional public URL placeholder
  created_at: Date;
};
