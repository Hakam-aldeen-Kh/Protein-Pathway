export function capitalize(s) {
  if (s !== undefined && s.length > 0) {
    return String(s[0]).toUpperCase() + String(s).slice(1);
  }
  return s
}
