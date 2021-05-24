module.exports = {
  '/': () => require('./pages/HomePage'),
  '/settings': () => require('./pages/SettingsHome'),
  '/settings/changelog': () => require('./pages/SettingsChangelogPage')
};
