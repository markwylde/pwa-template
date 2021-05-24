const hyperscript = require('mithril/hyperscript');

function m () {
  return hyperscript.apply(this, arguments);
}

m.m = hyperscript;
m.trust = hyperscript.trust;
m.fragment = hyperscript.fragment;
m.render = require('mithril/render');
m.vnode = require('mithril/render/vnode');

module.exports = m;
