const m = require('../mithril');

const ToDoList = require('../components/ToDoList.js');

function HomePage ({ attrs }) {
  const context = attrs.context;

  return {
    oncreate: function () {
      context.todos.list();
    },

    view: function () {
      const state = context.state;

      if (!state.todos) {
        return (
          <div>Loading todos</div>
        );
      }

      return (
        <div>
          <div class='heading'>
            <div class='title'>Your ToDo list</div>

            <b-dropdown tabindex='0'>
              <b-dropdown-button class='button'>
                +
              </b-dropdown-button>

              <b-dropdown-content>
                <ul>
                  <li><a onclick={context.todos.create}>Add new item</a></li>
                </ul>
              </b-dropdown-content>
            </b-dropdown>
          </div>

          <ToDoList
            todos={context.state.todos}
            onAddNewItem={context.todos.create}
            onUpdateItem={context.todos.update}
            onRemoveItem={context.todos.remove}
          />
        </div>
      );
    }
  };
}

HomePage.activeMenu = 'home';

module.exports = HomePage;
