export async function getImageSizes(url) {
  const response = await fetch(url);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  let imageList = '';

  for (const image of images) {
    const src = image.getAttribute('src');
    const imageResponse = await fetch(`${baseurl}${src}`);
    if (imageResponse.status === 200) {
      const size = parseInt(imageResponse.headers.get('content-length')) / 1024;
      imageList += `&nbsp;${(size <= 100) ? '✅' : '❌'} - ${src} - ${size.toFixed(1)} kB<br>`;
    }
    else {
      imageList += `&nbsp;❌ - ${src} - Image Not found<br>`;
    }
  }
  return imageList;
}