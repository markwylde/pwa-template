const m = require('../mithril');

function NotFoundPage () {
  return {

    view: () => {
      return (
        <div>
          <main class='not-found-page'>
            <p>Page not found</p>
            <button onclick={() => window.history.back(1)}>‹ Back to previous page</button>
          </main>
        </div>
      );
    }
  };
}

module.exports = NotFoundPage;
