import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <TodoList user={user} setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
}
