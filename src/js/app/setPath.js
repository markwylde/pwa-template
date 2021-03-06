const setPath = require('spath/setPath');

module.exports = function (path) {
  const baseUrl = new URL(document.querySelector('base').href).pathname.slice(0, -1);

  setPath(baseUrl + path);
};
