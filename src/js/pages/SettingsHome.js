const { version } = require('../../../package.json');
const { setPath } = require('spath');
const format = require('date-fns/format');

const m = require('../mithril');

function SettingsHome () {
  return {
    view: ({ attrs }) => {
      const context = attrs.context;

      return (
        <div>
          <div class='heading'>
            <div class='title'>Settings</div>
          </div>
          <main class='listview'>
            <div class='listview-item-main' onclick={() => setPath('/settings/changelog')}>
              <a><strong>View changelog</strong></a>
            </div>
            <div class='listview-item-main' onclick={context.clearCache} disabled={context.state.clearingCache}>
              {context.state.clearingCache && <img width='40px' src={require('../../images/loading.svg')} />}
              <a><strong>Clear cache and reload</strong></a>
            </div>
            <div class='listview-item-main'>
              <a><strong>Version:</strong> {version}</a>
            </div>
            <div class='listview-item-main'>
              <a><strong>Build Date:</strong> {format(process.env.BUILD_DATE, 'yyyy-MM-dd HH:mm:ss')}</a>
            </div>
          </main>
        </div>
      );
    }
  };
}

SettingsHome.activeMenu = 'settings';

module.exports = SettingsHome;
