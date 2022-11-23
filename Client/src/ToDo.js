import "./index.css";
import pencilImg from "./pencil.png";
import deleteImg from "./delete.png";

const ToDo = ({ id, todo, state, changeState, deleteTodo, edidTodo }) => {
  return (
    <div className="todo">
      <span
        style={{
          float: "left",
          marginLeft: "7px",
          color: state ? "red" : "black",
          textDecorationLine: state ? "line-through" : "none",
        }}
      >
        {todo}
      </span>
      <div
        style={{
          float: "right",
          marginRight: "7px",
          cursor: "pointer",
        }}
      >
        <input
          type={"checkbox"}
          checked={state || false}
          onChange={() => {
            changeState(id);
          }}
          style={{
            marginRight: "7px",
            width: "20px",
            height: "18px",
            cursor: "pointer",
          }}
        />
        {state === 0 ? (
          <img
            src={pencilImg}
            alt="pencil"
            onClick={() => {
              edidTodo(id);
            }}
            style={{ marginRight: "7px", width: "20px", cursor: "pointer" }}
          />
        ) : (
          []
        )}
        <img
          src={deleteImg}
          alt="delete"
          onClick={() => {
            deleteTodo(id);
          }}
          style={{ width: "20px" }}
        />
      </div>
    </div>
  );
};

export default ToDo;
