export function youtubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port) return '';
    let id: string | null = null;
    if (parsed.hostname === 'youtu.be') id = parsed.pathname.slice(1);
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(parsed.hostname)) {
      if (parsed.pathname === '/watch') id = parsed.searchParams.get('v');
      else id = parsed.pathname.match(/^\/(?:embed|shorts)\/([a-zA-Z0-9_-]+)\/?$/)?.[1] ?? null;
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube.com/embed/${id}` : '';
  } catch {
    return '';
  }
}
