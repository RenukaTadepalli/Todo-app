import React, { useEffect, useState, useRef } from "react";
import "./app.css";

import { toast } from "react-toastify";

const App = () => {
  const input = useRef(null);
  // console.log(input)
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [update, setUpdate] = useState(false);
  const [todoId, setToId] = useState(null);

  useEffect(() => {
    document.title = "todo";
  }, []);

  localStorage.setItem("todos", JSON.stringify(todos));
  const addHandler = () => {
    if (!input.current.value) {
      return toast.error("Please enter valid todo");
    }
    const todo = {
      myTodo: input.current.value,
      id: Math.random(),
      isCompleted: false,
    };
    // console.log(todo)
    setTodos([...todos, todo]);
    input.current.value = "";
    toast.success("Todo is added successfully");
  };

  const checkTodo = (id) => {
    const check = todos.find((todo) => todo.id === id);
    // console.log(check)
    check.isCompleted = !check.isCompleted;
    // console.log(check)
    setTodos([...todos]);
    
  };

  const removeTodo = (id) => {
    const remove = todos.filter((todo) => todo.id !== id);
    setTodos(remove);
    toast.success("Todo is deleted successfully");
  };

  const updateTodo = (id) => {
    const findTodo = todos.find((todo) => todo.id === id);
    // console.log(update)
    input.current.value = findTodo.myTodo;
    setUpdate(true);
    setToId(id);
  };

  const updateHandler = () => {
    // alert("click")

    const existingTodo = todos.find((todo) => todo.id === todoId);
    if (existingTodo.myTodo === input.current.value) {
      toast.error("There is no change");
      return;
    }

    existingTodo.myTodo = input.current.value;

    setTodos([...todos]);
    setUpdate(false);

    input.current.value = "";

    toast.success("updated successfully");
  };

  // console.log(todos)

  const renderTodo = todos.map((todo, index) => {
    const { myTodo, id, isCompleted } = todo;

    return (
      <div
        key={index}
        className="d-flex justify-content-evenly align-items-center border border-dark border-2 shadow-lg m-2"
      >
        <input onChange={() => checkTodo(id)} type="checkbox" checked={isCompleted} />
        <h1 className={isCompleted ? "text-decoration-line-through" : ""}>
          {myTodo}
        </h1>
        <button
          onClick={() => updateTodo(id)}
          className="btn btn-success border"
          disabled={isCompleted}
        >
          Update
        </button>

        <button
          onClick={() => removeTodo(id)}
          className="btn btn-danger border"
          disabled={!isCompleted}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div>
      <h1 className="todo text-center text-white p-2">Todo List</h1>
      <div className="text-center">
        <input
          ref={input}
          type="text"
          placeholder="Enter your todo"
          className="form-control w-50 m-auto "
        />
        <button
          onClick={update ? updateHandler : addHandler}
          className="w-50 btn btn-outline-primary mt-2"
        >
          {update ? "update" : "Add"}
        </button>
      </div>
      <h1 className="do text-white text-center mt-3 p-2">Todo</h1>
      <div>{renderTodo}</div>
    </div>
  );
};
export default App;
