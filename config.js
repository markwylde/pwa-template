module.exports = {
  pageTitle: 'PWA Template',

  debug: true,

  apiServerUrl: process.env.API_SERVER_URL || 'http://' + self.location.hostname + ':8080',
  clientUrl: process.env.CLIENT_URL || 'http://' + self.location.hostname + ':8000',
  enableCacheServiceWorker: true
};
