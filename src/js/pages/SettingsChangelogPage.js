const m = require('../mithril');
const goBack = require('../app/goBack');

const SettingsHome = {
  activeMenu: 'settings',

  view: () => {
    const gitLog = process.env.GIT_LOG;

    return (
      <div>
        <div class='heading'>
          <a tabindex='0' class='back-button' onclick={goBack('/', 1)}>‹ Back</a>
          <div class='title'>Settings › Changelog</div>
        </div>
        <main class='listview'>
          {Object.keys(gitLog).slice(0, 10).map(logDate => {
            return [
              <div key={logDate} class='listview-item-main' style={{ position: 'sticky', top: '-1px' }}>
                <a><strong>{logDate}</strong></a>
              </div>,
              <div key={logDate} class='listview-item-main'>
                <div>
                  {gitLog[logDate].map(message => {
                    return (
                      <div key={message}>- {message}</div>
                    );
                  })}
                </div>
              </div>
            ];
          })}
        </main>
      </div>
    );
  }
};

module.exports = SettingsHome;
