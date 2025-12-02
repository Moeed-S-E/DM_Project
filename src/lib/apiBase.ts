export function apiBase() {
  // In the browser during local development, prefer a local backend to avoid CORS.
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return process.env.NEXT_PUBLIC_LOCAL_API_BASE || 'http://localhost:4000';
    }
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || '';
}
