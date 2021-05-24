const EventEmitter = require('events');

const db = window.db = require('idb-keyval');

const config = require('../../../config.js');
const m = require('../mithril');

async function createApp () {
  const context = new EventEmitter();

  if (config.debug) {
    window.context = context;
  }

  if (config.enableCacheServiceWorker) {
    require('./enableCacheRefresh')();
  }

  context.config = config;
  context.db = db;
  context.state = {
    loading: true
  };

  context.clearCache = require('./clearCache.js')(context);
  context.todos = require('./entities/todo.js')(context);

  return context;
}

module.exports = createApp;
