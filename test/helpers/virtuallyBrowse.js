const { JSDOM, VirtualConsole } = require('jsdom');

const fakeIndexedDB = require('fake-indexeddb');

const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);

let server;

async function virtuallyBrowse (pathname) {
  server = server || require('./createServer');

  const dom = await JSDOM.fromURL('http://localhost:' + server.address().port + pathname, {
    pretendToBeVisual: true,
    runScripts: 'dangerously',
    resources: 'usable',
    virtualConsole
  });

  dom.window.indexedDB = fakeIndexedDB.indexedDB;

  return {
    ...dom.window,
    close: () => {
      setTimeout(() => dom.window.close(), 200);
    }
  };
}

module.exports = virtuallyBrowse;
