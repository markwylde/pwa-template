const config = require('../../../config.js');

function goBack (fallbackUrl, steps = 1) {
  return () => {
    if (window.history.length < 2) {
      window.history.replaceState(null, config.pageTitle, fallbackUrl);
      return;
    }

    window.history.back(steps);
  };
}

module.exports = goBack;
