import ToDo from "./ToDo";

const ToDoList = ({
  ToDoData,
  setToDoData,
  filter,
  count,
  setCount,
  setNewTask,
}) => {
  const deleteTask = (id) => {
    console.log(id);
    setToDoData(ToDoData.filter((e, index) => index !== id));

    setCount(count - 1);
  };

  const changeState = (id) => {
    setToDoData(
      ToDoData.map((e, index) => {
        return index === id ? { text: e.text, state: !e.state } : e;
      })
    );
  };

  /*Error with editing: the state might get changed after editing!!!*/

  const editTask = (id) => {
    setNewTask(ToDoData[id].text);
    deleteTask(id);
    document.getElementsByName("todo")[0].focus();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ul className="todo-list">
        {ToDoData.map(({ text, state }, index) => {
          return (
            <li key={index} style={{ width: "300px" }}>
              {filter === "All" ||
              (state === true && filter === "Done") ||
              (state === false && filter === "ToDo") ? (
                <ToDo
                  id={index}
                  task={text}
                  state={state}
                  changeState={changeState}
                  deleteTask={deleteTask}
                  edidTask={editTask}
                />
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
