// Get HTML Elements and addEventListeners ******************************************
export function setup() {
  const student = document.querySelector('#student');
  const getReportButton = document.querySelector('#getReport');
  const report = document.querySelector('#report');
  const message = document.querySelector('#message');
  
  return { student, getReportButton, report, message };
}