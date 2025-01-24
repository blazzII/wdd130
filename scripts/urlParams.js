// GET FROM QueryString
// course, file, filepath, assignment
const qs = window.location.search;
const urlParams = new URLSearchParams(qs);
const course = urlParams.get('course');
const file = urlParams.get('file');
let filepath = urlParams.get('filepath');
let assignment = urlParams.get('assignment');
let path = '';
// Account for root filepath
if (filepath === '') {
  filepath = ` placed directly inside your <code>${course}</code> repository folder`
}

// Build Audit Page Title
const subject = course.slice(0, 3).toUpperCase();
const number = course.slice(3);
assignment = assignment.replace(/-/g, ' ');
let pageTitle = `${subject} ${number} - ${assignment}`;

// Set textContent on audit page
document.getElementById('assignment').textContent = pageTitle;
document.querySelectorAll('.course').forEach(element => element.textContent = course);
document.querySelectorAll('.file').forEach(element => element.textContent = file);
document.querySelectorAll('.path').forEach(element => element.innerHTML = filepath);