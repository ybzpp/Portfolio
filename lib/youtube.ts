export function youtubeEmbedUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  const match =
    trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  const id = match ? match[1] : null;
  return id ? `https://www.youtube.com/embed/${id}` : trimmed;
}
