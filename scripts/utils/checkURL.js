export async function checkURL(url) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}