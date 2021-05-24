const m = require('../mithril.js');

function clearCache (context) {
  return async () => {
    context.state.clearingCache = true;
    m.redraw();

    require('idb-keyval').clear();

    await navigator.serviceWorker.getRegistrations().then(function (registrations) {
      return Promise.all(registrations.map(registration => {
        return registration.unregister();
      }));
    });

    setInterval(() => {
      window.location.reload();
    }, 1000);
  };
}

module.exports = clearCache;
