import "./App.css";
import "./ToDoList.js";
import ToDoList from "./ToDoList.js";
import { useState, useEffect } from "react";

function App() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
      document.getElementsByName("todo")[0].focus();
      e.preventDefault();
    }
  });

  const [ToDoData, setToDoData] = useState([[]]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [count, setCount] = useState(0);

  const addTask = () => {
    if (newTask.length) {
      setToDoData([...ToDoData, { text: newTask, state: false }]);
      setNewTask("");
      setCount(count + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  useEffect(() => {
    setToDoData([
      // { text: "test1", state: true },
      // { text: "test2", state: false },
      // { text: "test3", state: false },
      // { text: "test4", state: true },
    ]);
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
          value={newTask}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onChange={(e) => {
            e.stopPropagation();
            setNewTask(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <button
          value="Add new Task"
          className="button"
          id="new-task"
          onClick={addTask}
        >
          Add New Task
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
      <ToDoList
        ToDoData={ToDoData}
        setToDoData={setToDoData}
        filter={filter}
        count={count}
        setCount={setCount}
        setNewTask={setNewTask}
      />

      <div>
        <button
          onClick={() => {
            let newCount = count;
            setToDoData(
              ToDoData.flatMap((element) => {
                if (element.state === true) newCount--;
                return element.state !== true ? element : [];
              })
            );
            setCount(newCount);
          }}
          className="button"
          id="delete-button"
        >
          Delete All Done
        </button>

        <button
          onClick={() => {
            setToDoData([]);
          }}
          className="button"
          id="delete-button"
        >
          Delete All Tasks
        </button>
      </div>
    </div>
  );
}

export default App;
