import { setup } from './utils/setup.js';
import { getReport } from './getReport.js';

setup(student, getReportButton, report, message);
console.log(student);
getReportButton.addEventListener('click', getReport);
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getReport();
  }
});

// end of 1/23/2025

function buildReport(data, uri) {
  let h = data.css.html;
  let c = data.css.css;
  //clean html and css
  let csslinks = '';
  data.css.links.forEach(css => {
    csslinks += `${css.link}<br>`
  });

  // HTML Validation
  validateHTML(h)
    .then((htmlErrorCount) => {
      document.getElementById('hvalid').innerHTML = (htmlErrorCount === 0) ? '✅' : '❌';
      document.getElementById('htmlerrorscount').innerHTML = `Errors: ${htmlErrorCount}`;
    })
    .catch((error) => {
      document.getElementById('htmlerrorscount').innerHTML = `HTML Validation failed to report: ${error}`;
    });

  // Image Size Check
  getImageSizes(`https://${url}`)
    .then((imglist) => {
      // document.getElementById('imagesizes').innerHTML = '<span class="blue">All image files must be optimized for the web (<= 100 kB)</span>';
      document.getElementById('imagesizes').innerHTML += `${imglist}`;
    })

  return `<main>

      <h3>w3.org Validation Tools</h3>
      <div class="label">HTML</div>
      <div class="data" id="hvalid"></div>
      <div class="standard"> <span id="htmlerrorscount"></span> <a href="https://validator.w3.org/check?verbose=1&uri=${url}" target="_blank">🔗 HTML Validation Report on w3.org</a> <span class="blue">Review report if there are errors.</span>
      </div>

      <h3>HTML Document</h3>
      <div class="label">Document Type</div>
      <div class="data">${h.toLowerCase().includes('<!doctype html>') && h.toLowerCase().indexOf('<!doctype html>') === 0 ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">&lt;!DOCTYPE html&gt; or &lt;!doctype html&gt; should be on the first line of the document.</span></div>

      <div class="label">HTML Lang Attribute</div>
      <div class="data">${h.includes('<html lang="') > 0 ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">&lt;html lang="en-US"&gt; or another language can be OK</span></div>

      <div class="label">&lt;head&gt; element</div>
      <div class="data">${h.includes('<head>') && h.includes('</head>') && h.indexOf('</head>') < h.indexOf('<body') ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">&lt;head&gt; ... &lt;/head&gt; Must start and end before the &lt;body&gt; element.</span></div>

      <div class="label">&lt;body&gt; element</div>
      <div class="data">${h.includes('<body') && h.includes('</body>') && h.indexOf('</body>') < h.indexOf('</html>') ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">&lt;body&gt; ... &lt;/body&gt; Must end before the &lt;/html&gt; tag.</span></div>

      <div class="label">lowercase HTML used</div>
      <div class="data">${checkCapitalizedTags(h) ? '❌' : '✅'}</div>
      <div class="standard"><span class="blue">It is considered to be a best practice to use lowercase for HTML element names and attributes.</span></div>

      <h3>&lt;head&gt; Elements</h3>

      <div class="label">Meta Charset</div>
      <div class="data">${h.includes('<meta charset="utf-8"') > 0 || h.includes('<meta charset="UTF-8"') ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">&lt;meta charset="UTF-8"&gt;</span></div>

      <div class="label">Meta Viewport</div>
      <div class="data">${h.includes('<meta name="viewport"') > 0 ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">&lt;meta name="viewport" content="width=device-width,initial-scale=1.0"&gt;</span></div>

      <div class="label">Title</div>
      <div class="data">${(data.css.pageTitle.includes('WDD 130') || data.css.pageTitle.includes('WDD130')) && data.css.pageTitle.length > 15 ? '👀' : '❌'}</div>
      <div class="standard">${data.css.pageTitle} <span class="blue"><strong>REQUIRES Manual REVIEW</strong>: Must contain the student's name and 'WDD 130'</span></div>

      <h3>&lt;body&gt; Elements</h3>

      <div class="label">&lt;header&gt;</div>
      <div class="data">${h.includes('<header') && h.includes('</header>') && h.indexOf('<header') > h.indexOf('<body') && h.indexOf('</header>') < h.indexOf('</body>') ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">The &lt;header&gt; ... &lt;/header&gt; must be within the &lt;body&gt;.</span></div>

      <div class="label">&lt;nav&gt;</div>
      <div class="data">${h.includes('<nav') && h.includes('</nav>') && h.indexOf('<nav') > h.indexOf('<header') && h.indexOf('</nav>') < h.indexOf('</header>') ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">The &lt;nav&gt; ... &lt;/nav&gt; must be within the &lt;header&gt;.</span></div>

      <div class="label">&lt;a&gt;</div>
      <div class="data">${getElement(h, '<a ') >= 2 ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">Found ${getElement(h, '<a ')} / out of 2 required. All anchors must be within the &lt;nav&gt;</span></div>

      <div class="label">&lt;main&gt;</div>
      <div class="data">${h.includes('<main') && h.includes('</main>') && h.indexOf('<main>') > h.indexOf('</header>') && h.indexOf('</main>') < h.indexOf('<footer>') ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">&lt;main&gt; ... &lt;/main&gt; is after the &lt;/header&gt; and before the &lt;footer&gt; </div>

      <div class="label">&lt;h1&gt;</div>
      <div class="data">${h.includes('<h1') && (getElement(h, '</h1>') === 1) ? '👀' : '❌'}</div>
      <div class="standard">${getContent(h, /<h1.*>(.*?)<\/h1>/)}<span class="blue">Only one &lt;h1&gt; is allowed per page.</span>
       <span class="blue"><strong>REQUIRES Manual REVIEW:</strong> Must contain the student's name and the characters WDD 130</span></div>

      <div class="label">&lt;img&gt;</div>
      <div class="label"></div>
      <div class="standard">
        ${getElement(h, '<img') >= 1 && getElement(h, 'images/profile') >= 1 ? '✅' : '❌'} - At least one image named 'profile' is required.
        <span class="blue">Image Check:<br> All image files must be optimized for the web (<= 100 kB) and correctly referenced.</span>
        <span id="imagesizes"></span>
      </div>

      <div class="label">&lt;p&gt;</div>
      <div class="data">${getElement(h, '<p') >= 2 ? '✅' : '❌'}</div>
      <div class="standard"><span class="blue">found ${getElement(h, '<p')} / out 2 required</span></div>

      <div class="label">&lt;footer&gt;</div>
      <div class="data">${h.includes('<footer') && h.includes('</footer>') && h.indexOf('<footer>') > h.indexOf('</main>') && h.indexOf('</footer>') < h.indexOf('</body>') ? '✅' : '❌'}</div>
      <div class="standard">${getContent(h, /<footer>(.*?)<\/footer>/)}
       <span class="blue">Must be after the &lt;/main&gt; element and before the &lt;/body&gt; closing tag.</span></div>



    </main>`;
}

document.querySelector('.warning').style.display = "none";