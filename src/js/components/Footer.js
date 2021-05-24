const { setPath } = require('spath');

const m = require('../mithril');

function Footer () {
  return {
    view: (vnode) => {
      const { active } = vnode.attrs;

      return (
        <footer>
          <a class={active === 'home' ? 'active' : null} onclick={() => setPath('/')}>
            <img src={require('../../images/list.svg')} />
            <span>Home</span>
          </a>
          <a class={active === 'contacts' ? 'active' : null} onclick={() => setPath('/page2')}>
            <img src={require('../../images/page.svg')} />
            <span>Page 2</span>
          </a>
          <a class={active === 'calls' ? 'active' : null} onclick={() => setPath('/help')}>
            <img src={require('../../images/help.svg')} />
            <span>Help</span>
          </a>
          <a class={active === 'settings' ? 'active' : null} onclick={() => setPath('/settings')}>
            <img src={require('../../images/settings.svg')} />
            <span>Settings</span>
          </a>
        </footer>
      );
    }
  };
}

module.exports = Footer;
