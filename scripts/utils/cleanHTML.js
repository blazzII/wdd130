export function cleanHTML(h) {
  h = h.replace(/[\n\r]/g, ""); // remove line breaks
  h = h.replace(/ {2,}/g, " "); // remove extra spaces

  return h;
}