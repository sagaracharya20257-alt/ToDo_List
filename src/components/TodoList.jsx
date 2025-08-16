import { useEffect, useState } from "react";
import { getUserTodos, createTodo, removeTodo, updateTodo } from "../api/toDosAPI";
import TodoForm from "./TodoForm.jsx";

export default function TodoList({ user, setUser }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getUserTodos(user.id).then((res) => setTodos(res.data));
  }, [user.id]);

  const handleAdd = (title) => {
    const newTodo = {
      userId: user.id,
      title,
      completed: false,
    };
    createTodo(newTodo).then((res) => setTodos([...todos, res.data]));
  };

  const handleDelete = (id) => {
    removeTodo(id).then(() => setTodos(todos.filter((t) => t.id !== id)));
  };

  const handleToggle = (todo) => {
    updateTodo(todo.id, { completed: !todo.completed }).then((res) => {
      setTodos(todos.map((t) => (t.id === todo.id ? res.data : t)));
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <h2>{user.username}'s Todos</h2>
      <button onClick={handleLogout}>Logout</button>
      <TodoForm userId={user.id} onAdd={handleAdd} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                flex: 1,
                marginLeft: "8px",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
