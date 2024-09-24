import { useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Read a book", completed: false },
  ]);

  const [filter, setFilter] = useState(null);

  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filterTodos = (status) => {
    switch (status) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="container max-w-screen-md mx-auto flex flex-col gap-2">
      <h1 className="text-3xl font-bold my-5">My To-Do List</h1>
      <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
        {
          [null, "active", "completed"].map((status) => (
            <option
              key={status}
              value={status}
              onClick={() => setFilter(status)}
            >
              {status ? status : "All"}
            </option>
          ))}
      </select>
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          className="flex-grow"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
        />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={filterTodos(filter)} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;