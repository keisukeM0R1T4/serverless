import React, { useEffect, useState } from "react";
import axios from "axios";
const postUrl =
  "https://y4zgmy346h.execute-api.ap-northeast-1.amazonaws.com/prod/todo/%7Bid%7D";

const baseUrl =
  "https://y4zgmy346h.execute-api.ap-northeast-1.amazonaws.com/prod/todo";

const TodoList = () => {
  //initial stateにgetメソッドを使う

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setTodos(response.data);
    });
  }, [todos]);

  const [task, setTask] = useState("");

  const handleNewTask = (event) => {
    setTask(event.target.value);
  };

  //タスク追加にはpostメソッド

  const handleSubmit = (event) => {
    event.preventDefault();
    const time = new Date().getTime();
    if (task === "") return;

    axios
      .post(postUrl, {
        Todo: task,
        id: `${time}`,
        Done: false,
      })
      .then((response) => {
        console.log(response.data);
        setTodos([...todos, response.data]);
        setTask("");
      });
  };

  //タスク削除はdeleteメソッド

  const handleRemoveTask = (id) => {
    axios.delete(`${baseUrl}/${id}`).then((res) => {
      console.log(res);
      setTodos(todos.filter((todos) => todos.id !== id));
    });
  };

  //編集にはupdateメソッド

  const handleUpdateTask = (id, Done, Todo) => {
    /*     const newTodos = [...todos].map((todo) => {
      console.log(todo.id);
      console.log(id);
      if (todo.id === id) {
        todo.Done = !todo.Done;
      } */

    axios.post(postUrl, {
      Todo: Todo,
      id: id,
      Done: !Done,
    });

    /* axios
      .patch(`${baseUrl}/${id}`, {
        id: id,
        Todo: Todo,
        Done: true,
      })
      .then((response) => {
        console.log(response);
        let updataTodos = todos.map((todo) => {
          if (todo.id === response.data.id) {
            return response.data;
          } else {
            return todo;
          }
        });
        setTodos(updataTodos);
      })
      .catch((error) => console.log(error)); */
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        Add Task :
        <input
          value={task}
          placeholder="Add New Task"
          onChange={handleNewTask}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.Done ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.Done}
              onChange={() => handleUpdateTask(todo.id, todo.Done, todo.Todo)}
            />
            {todo.Todo}
            <span
              onClick={() => handleRemoveTask(todo.id)}
              style={{ cursor: "pointer" }}
            >
              {" "}
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
