const m = require('../mithril');

function Header () {
  return {
    view: (vnode) => {
      const { context } = vnode.attrs;

      return (
        <header>
          <div class='logo'>
            Mark's Crazy ToDo's
          </div>

          {context.session &&
            <b-user-icon tabindex='0'>
              <div>
                Test User
              </div>

              <b-user-menu>
                <ul>
                  <li><span>My Account</span></li>
                  <li><span>Change Password</span></li>
                  <li><a onclick={context.auth.logout}>Logout</a></li>
                </ul>
              </b-user-menu>
            </b-user-icon>}
        </header>
      );
    }
  };
}

module.exports = Header;
