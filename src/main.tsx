import './style.css'
//import typescriptLogo from './typescript.svg'
//import viteLogo from '/vite.svg'
//import { setupCounter } from './counter.ts'

import "bootstrap/dist/css/bootstrap.min.css"; // For styling
import React, { useState, ChangeEvent } from "react";
import ReactDOM from "react-dom/client";
import { Trash } from "react-bootstrap-icons";
import "./round.css";

// 定義 Todo 的資料結構
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// A functional component for the Todo App
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Egg", completed: true },
    { id: 2, title: "Potato", completed: true },
    { id: 3, title: "Beer", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState<string>("");

  // Toggle the completion status of a todo
  const toggleCompletion = (id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Add a new todo item
  const addTodo = (): void => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: newTodo, completed: false },
      ]);
      setNewTodo(""); // Reset input field
    }
  };

  // Delete a todo item
  const deleteTodo = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(e.target.value);
  };

  return (
    <div className="container mt-4" style={{ width: "400px" }}>
      <h1 className="text-center">Todo List</h1>
      {/* Add a component */}
      <div className="mb-3 d-flex" style={{ height: "60px" }}>
        <input
          type="text"
          className="form-control Center"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary mt-0"
          onClick={addTodo}
          style={{ margin: "10px", marginRight: "0px", width: "50px", height: "60px" }}
        >
          +
        </button>
      </div>
      {/* Todo list */}
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.completed ? "text-decoration-line-through" : ""
            }`}
          >
            {/* Check button + todo title */}
            <span>
              <span className="round">
                <input
                  type="checkbox"
                  id={`checkbox-${todo.id}`}
                  defaultChecked={todo.completed}
                  onClick={() => toggleCompletion(todo.id)}
                />
                <label htmlFor={`checkbox-${todo.id}`}></label>
              </span>
              <span style={{ color: "gray", margin: "20px", position: "relative" }}>
                {todo.title}
              </span>
            </span>
            {/* Trash icon */}
            <button
              className="btn"
              style={{ marginRight: "-15px" }}
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash color="red" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Render the app
const rootElement = document.getElementById("app");
if (rootElement) {
  const app = ReactDOM.createRoot(rootElement); // 創建一個 React 根
  app.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
