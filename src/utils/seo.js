const base = import.meta.env.BASE_URL;

export function absoluteUrl(path = '/') {
  if (typeof window === 'undefined') {
    return path;
  }

  const resolved = path.startsWith('/')
    ? `${base}${path.slice(1)}`
    : `${base}${path}`;

  return new URL(resolved, window.location.origin).toString();
}
