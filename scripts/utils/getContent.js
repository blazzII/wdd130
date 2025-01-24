export function getContent(html, regex) {
  let match = html.match(regex);
  return match ? `${match[1]}` : null;
}