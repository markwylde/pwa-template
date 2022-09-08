require('hazkeyboard');
const m = require('../mithril');

const config = require('../../../config.js');

const removeAfterAnimations = require('../utilities/removeAfterAnimations');

const Header = require('../components/Header');
const Footer = require('../components/Footer');

const DefaultLayout = function () {
  const state = {
    keyboardVisible: false
  };

  const handleFocusIn = () => {
    state.keyboardVisible = true;
    m.redraw();
  };

  const handleFocusOut = () => {
    state.keyboardVisible = false;
    m.redraw();
  };

  return {
    oncreate: async () => {
      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);
    },

    onremove: () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    },

    view: (vnode) => {
      document.title = vnode.attrs.title ? vnode.attrs.title + ' - ' + config.pageTitle : config.pageTitle;

      if (state.keyboardVisible || vnode.attrs.hideMenu) {
        return (
          <div key='wrapper' class='wrapper page-transition'>
            <Header key='header' context={vnode.attrs.context} />
            <div class='pageTransitionContainer' key={document.location.href} onbeforeremove={removeAfterAnimations}>
              {vnode.children}
            </div>
          </div>
        );
      }

      return (
        <div key='wrapper' class='wrapper page-transition'>
          <Header key='header' context={vnode.attrs.context} />
          <div class='pageTransitionContainer' key={document.location.href} onbeforeremove={removeAfterAnimations}>
            {vnode.children}
          </div>
          <Footer key='footer' context={vnode.attrs.context} active={vnode.attrs.active} />
        </div>
      );
    }
  };
};

module.exports = DefaultLayout;
