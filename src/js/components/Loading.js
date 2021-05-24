const m = require('../mithril');

function Loading () {
  return {
    view: () => {
      return (
        <main class='loading'>
          <div>Fetching latest data</div>
          <img src={require('../../images/loading.svg')} />
        </main>
      );
    }
  };
}

module.exports = Loading;
