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
  
  let base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || './';

  // If deployed on GitHub Pages under /hombros, ensure base is properly scoped with absolute repository path
  if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/hombros') || window.location.hostname.includes('github.io'))) {
    base = '/hombros/';
  }

  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
