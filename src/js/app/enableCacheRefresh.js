function handleMessage (event) {
  if (event.data.msg === 'pageNeedsRefresh') {
    const el = document.createElement('iframe');
    el.src = window.location.href;
    el.width = '10px';
    el.height = '10px;';
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.prepend(el);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}

function enableCacheRefresh () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/cache-worker.js', {})
      .catch((error) => {
        console.log('Cache Worker - Registration failed with ', error);
      });

    self.addEventListener('message', handleMessage);
    navigator.serviceWorker.addEventListener('message', handleMessage);
  }
}

module.exports = enableCacheRefresh;
