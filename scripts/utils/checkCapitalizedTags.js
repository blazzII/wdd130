export function checkCapitalizedTags(html) {
  const regex = /<\s*\/?\s*[A-Z][^\s>]*\s*[^>]*>/g;
  return regex.test(html);
}