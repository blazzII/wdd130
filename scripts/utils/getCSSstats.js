export async function getCSSstats(uri) {
  let url = `https://cssstats.com/api/stats?url=${uri}`;
  let response = await fetch(url);
  let result = await response.json();
  if (result.message) {
    return 0;
  }
  return result;
}