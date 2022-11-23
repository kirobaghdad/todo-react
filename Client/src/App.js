import "./App.css";
import "./ToDoList.js";
import ToDoList from "./ToDoList.js";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
      document.getElementsByName("todo")[0].focus();
      e.preventDefault();
    }
  });

  const [ToDoData, setToDoData] = useState([[]]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");
  const [count, setCount] = useState(0);

  const getTodos = () => {
    Axios.get("http://localhost:3001/getTodos").then((res) => {
      setToDoData(res.data);
      if (res.data.length) setCount(res.data[res.data.length - 1]["id"] + 1);
      else setCount(0);
    });
  };

  const addTodo = () => {
    if (newTodo.length) {
      setToDoData([...ToDoData, { id: count, todo: newTodo, state: 0 }]);
      setNewTodo("");
      Axios.post("http://localhost:3001/addTodo", {
        id: count,
        todo: newTodo,
        state: 0,
      }).then((res) => {});
      setCount(count + 1);
    }
  };

  const deleteTodo = (id) => {
    setToDoData(ToDoData.filter((e) => e.id !== id));
    Axios.post("http://localhost:3001/deleteTodo", {
      id: id,
    }).then((res) => {});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <h1>ToDo</h1>
      <div>
        <input
          placeholder="New Todo"
          autoFocus={true}
          type={"text"}
          name="todo"
          className="input"
          value={newTodo}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onChange={(e) => {
            e.stopPropagation();
            setNewTodo(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <button
          value="Add new Todo"
          className="button"
          id="new-task"
          onClick={addTodo}
        >
          Add New Todo
        </button>
      </div>
      <h2 style={{ marginBottom: "10px", marginTop: "50px" }}>ToDo List</h2>
      <div>
        <button
          style={{
            margin: "10px",
            backgroundColor: filter === "All" ? "crimson" : "deepskyblue",
          }}
          onClick={() => {
            setFilter("All");
          }}
          className="button"
          id="state-button"
        >
          All
        </button>
        <button
          style={{
            margin: "10px",
            backgroundColor: filter === "Done" ? "crimson" : "deepskyblue",
          }}
          onClick={() => {
            setFilter("Done");
          }}
          className="button"
          id="state-button"
        >
          Done
        </button>
        <button
          style={{
            margin: "10px",
            backgroundColor: filter === "ToDo" ? "crimson" : "deepskyblue",
          }}
          onClick={() => {
            setFilter("ToDo");
          }}
          className="button"
          id="state-button"
        >
          ToDo
        </button>
      </div>
      {count ? (
        <ToDoList
          ToDoData={ToDoData}
          setToDoData={setToDoData}
          filter={filter}
          setNewTodo={setNewTodo}
          deleteTodo={deleteTodo}
        />
      ) : (
        []
      )}

      <div>
        <button
          onClick={() => {
            //let newCount = count;
            console.log("Hello1");
            Axios.post("http://localhost:3001/deleteDone").then((res) => {
              console.log(res);
            });
            // ToDoData.forEach((e, i) => {
            //   if (e.state === true) {
            //     newCount--;
            //     Axios.post("http://localhost:3001/deleteTodo", {
            //       id: i,
            //     }).then((res) => {});
            //   }
            // });
            console.log(ToDoData);

            console.log(
              ToDoData.flatMap((e) => {
                if (e.state === 1) {
                  //newCount--;
                  return [];
                } else return e;
              })
            );
            setToDoData(
              ToDoData.flatMap((e) => {
                if (e.state === 1) {
                  //newCount--;
                  return [];
                } else return e;
              })
            );
            // ToDoData.forEach((todo, i) => {
            //   if (todo.state === 1) {
            //     deleteTodo(i);
            //     newCount--;
            //   }
            // });
            //setCount(newCount);
          }}
          className="button"
          id="delete-button"
        >
          Delete All Done
        </button>

        <button
          onClick={() => {
            setToDoData([]);
            setCount(0);
            Axios.post("http://localhost:3001/truncateTodoTable");
          }}
          className="button"
          id="delete-button"
        >
          Delete All Todos
        </button>
      </div>
    </div>
  );
}

export default App;
