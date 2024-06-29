const addProjectsToLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const getProjectsFromLocalStorage = () => {
  const projects = JSON.parse(localStorage.getItem('projects'));
  if (projects != null) {
    return projects;
  }
  return [];
};

function escapeHtml(unsafe) {
  return unsafe.replace(/[&<>"']/g, function (match) {
    const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return htmlEscapes[match];
  });
}
function fromSafetyToHtml(unsafe) {
  return unsafe.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, function (match) {
    const htmlEscapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
    };
    return htmlEscapes[match];
  });
}

export {
  addProjectsToLocalStorage,
  getProjectsFromLocalStorage,
  escapeHtml,
  fromSafetyToHtml,
};
