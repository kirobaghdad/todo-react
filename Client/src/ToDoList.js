import ToDo from "./ToDo";
import Axios from "axios";

const ToDoList = ({
  ToDoData,
  setToDoData,
  filter,
  setNewTodo,
  deleteTodo,
}) => {
  const changeState = (id) => {
    setToDoData(
      ToDoData.map((e) => {
        if (e.id === id) {
          console.log(id);
          Axios.post("http://localhost:3001/changeState", {
            id: id,
          });
          return { id: id, todo: e.todo, state: e.state ? 0 : 1 };
        } else return e;
      })
    );
  };

  /*Error with editing: the state might get changed after editing!!!*/

  const editTodo = (id) => {
    let text = "";
    for (let i = 0; i < ToDoData.length; i++) {
      if (ToDoData[i].id === id) text = ToDoData[i].todo;
    }

    setNewTodo(text);
    deleteTodo(id);
    document.getElementsByName("todo")[0].focus();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ul className="todo-list">
        {ToDoData.map(({ id, todo, state }, index) => {
          return (
            <li key={index} style={{ width: "300px" }}>
              {filter === "All" ||
              (state === 1 && filter === "Done") ||
              (state === 0 && filter === "ToDo") ? (
                <ToDo
                  id={id}
                  todo={todo}
                  state={state}
                  changeState={changeState}
                  deleteTodo={deleteTodo}
                  edidTodo={editTodo}
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
