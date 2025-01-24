export function cleanCSS(c){
  c = c.replace(/[\n\r]/g, ""); // remove line breaks
  c = c.replace(/\/\*[\s\S]*?\*\//g, ""); // remove comments

  return c;
}