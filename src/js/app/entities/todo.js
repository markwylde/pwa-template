const Chance = require('chance');
const chance = new Chance();

function todos (context) {
  context.state.todos = [];

  async function list () {
    const todos = await context.db.get('todos');

    context.state.todos = todos || [{
      id: chance.guid(),
      name: 'First hardcoded todo'
    }];

    context.emit('changed');
  }

  function create (data = {}) {
    context.state.todos.push({
      id: chance.guid(),
      name: data.name || chance.sentence({ words: 5 })
    });

    context.db.set('todos', context.state.todos);

    context.emit('changed');
  }

  function update (id, newValue) {
    const todo = context.state.todos.find(item => item.id === id);

    if (todo === undefined) {
      throw new Error('could not find todo with id ' + id);
    }

    todo.name = newValue;
    context.db.set('todos', context.state.todos);

    context.emit('changed');
  }

  function remove (id) {
    const todoIndex = context.state.todos.findIndex(item => item.id === id);

    if (todoIndex === undefined) {
      throw new Error('could not find todo with id ' + id);
    }

    context.state.todos.splice(todoIndex, 1);
    context.db.set('todos', context.state.todos);

    context.emit('changed');
  }

  return {
    list,
    create,
    update,
    remove
  };
}

module.exports = todos;
