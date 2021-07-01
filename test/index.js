const test = require('basictap');
const automage = require('automage');
automage.defaultWaitTimeout = 250;

const virtuallyBrowse = require('./helpers/virtuallyBrowse');

test('shows the correct header', async t => {
  t.plan(1);

  const window = await virtuallyBrowse('/');

  t.ok(await automage.get(window.document.body, "Mark's Crazy ToDo's", 'header'), 'has correct page header');

  window.close();
});

test('has the default first todo', async t => {
  t.plan(1);

  const window = await virtuallyBrowse('/');

  t.ok(await automage.get(window.document.body, 'First hardcoded todo', 'all'), 'has the first todo');

  window.close();
});

test('delete the first todo', async t => {
  t.plan(1);

  const window = await virtuallyBrowse('/');

  await automage.click(window.document.body, 'X', 'button');
  t.ok(await automage.isMissing(window.document.body, 'First hardcoded todo', 'all'), 'is missing the first todo');

  window.close();
});
