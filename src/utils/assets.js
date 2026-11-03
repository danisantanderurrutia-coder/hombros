/**
 * Helper to resolve static assets in public/ correctly across both local dev
 * and GitHub Pages subpaths (e.g. /hombros/).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || './';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
