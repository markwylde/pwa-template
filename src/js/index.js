require('location-change-event');

const routemeup = require('routemeup');
const mithril = require('./mithril');
const pushStateAnchors = require('spath/pushStateAnchors');
const createApp = require('./app');

const DefaultLayout = require('./layouts/DefaultLayout');

const routes = require('./routes');

function hijackNavigation () {
  document.addEventListener('click', pushStateAnchors());
  window.addEventListener('locationchange', () => {
    window.requestAnimationFrame(() => mithril.redraw());
  });
}

const isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
if (isIOS) {
  require('./utilities/resizeToViewport.js')();
  require('inobounce');
}

async function main () {
  const context = await createApp();
  hijackNavigation();

  setTimeout(() => {
    document.body.classList.remove('first-load');
  }, 300);

  function render () {
    const baseUrl = new URL(document.querySelector('base').href).pathname;

    const route = routemeup(routes, { url: window.location.pathname.replace(baseUrl, '/') });
    const controller = (route ? route.controller() : require('./pages/NotFoundPage'));
    const ui = mithril(controller, { context, tokens: route && route.tokens });

    if (controller.layout === 'none') {
      mithril.render(document.body, ui);
      return;
    }

    const uiWithLayout = mithril(DefaultLayout, {
      active: controller.activeMenu,
      hideMenu: controller.hideMenu,
      context
    }, ui);
    mithril.render(document.body, uiWithLayout);
  }

  window.context = context;
  window.mithril = mithril;
  mithril.redraw = render;
  context.redraw = render;
  context.on('changed', render);

  render();
}
main();
