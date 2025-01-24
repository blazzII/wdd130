export async function validateHTML(h) {
  let url = `https://validator.w3.org/nu/?out=json`;
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html'
    },
    body: h
  });
  if (response.status !== 200 || !response.ok) {
    throw new Error(`Validation failed with status code ${response.status}`);
  }
  let vResult = await response.json();

  htmlErrorCount = vResult.messages.reduce((count, message) => {
    return message.type === 'error' ? count + 1 : count;
  }, 0);

  return htmlErrorCount;
}