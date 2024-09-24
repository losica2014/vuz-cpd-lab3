function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="flex gap-2 items-baseline">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;