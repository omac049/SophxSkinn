export function absoluteUrl(path = '/') {
  if (typeof window === 'undefined') {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}
