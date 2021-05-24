const m = require('../mithril');

function ToDoList () {
  return {
    view: ({ attrs }) => {
      function handleAddItem (event) {
        event.preventDefault();
        attrs.onAddNewItem();
      }

      function handleUpdateItem (itemId) {
        return event => {
          event.preventDefault();
          attrs.onUpdateItem(itemId, event.target.value);
        };
      }

      function handleRemoveItem (itemId) {
        return event => {
          event.preventDefault();
          attrs.onRemoveItem(itemId);
        };
      }

      return (
        <main class='listview'>
          {attrs.todos.map((todo, todoIndex) => {
            return (
              <div tabindex='0' key={todo.id}>
                <div>
                  <div class='wordatar'>
                    <span>{todoIndex + 1}</span>
                  </div>
                </div>
                <div class='listview-item-main'>
                  <input value={todo.name} onkeyup={handleUpdateItem(todo.id)} />
                </div>
                <div>
                  <button onclick={handleRemoveItem(todo.id)}>X</button>
                </div>
              </div>
            );
          })}

          <div class='list-item commands'>
            <a href onclick={handleAddItem}>Add new item</a>
          </div>
        </main>
      );
    }
  };
}

module.exports = ToDoList;
