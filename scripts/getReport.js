import { reset } from './utils/reset.js';
import {checkURL} from './utils/checkURL.js';
import { getCSSstats} from './utils/getCSSstats.js';

export async function getReport() {
  reset();
  let username = student.value;
  if (username === "") {
    student.focus();
    return;
  }
  else {
    let uri = `${username}.github.io/wdd130/index.html`;   // need to send course-name
    let url = `https://${uri}`; // replace this
    baseurl = `https://${studentgh}.github.io/wdd130/`; // replace this
    let response = await checkURL(url);
    if (response) {
      const result = await getCSSstats(uri);
      report.innerHTML += buildReport(result, uri); // pull this out to main to buildReport  result and uri
    } else {
      message.style.display = "block"; // this will be on ... so move this up to display none on success
      return; // keep
    }
  }
}