const { JSDOM, VirtualConsole } = require('jsdom');
const { ScreenConfig } = require('jsdom-browser.screen');

const indexedDB = require('fake-indexeddb');

const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);

const server = require('./createServer');

async function virtuallyBrowse (pathname) {
  const dom = await JSDOM.fromURL('http://localhost:' + server.address().port + pathname, {
    pretendToBeVisual: true,
    runScripts: 'dangerously',
    resources: 'usable',
    virtualConsole
  });

  const screenConfig = new ScreenConfig({
    width: 1280,
    height: 800,
    availTop: 23,
    availLeft: 0,
    availRight: 0,
    availBottom: 0,
    deviceAngle: -90
  });
  screenConfig.configure(dom.window);
  dom.window.screen.orientation = {
    type: 'no',
    addEventListener: () => {}
  };

  dom.window.indexedDB = indexedDB;

  return {
    ...dom.window,
    close: () => {
      setTimeout(() => dom.window.close(), 200);
    }
  };
}

module.exports = virtuallyBrowse;
