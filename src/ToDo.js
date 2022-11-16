import "./index.css";
import pencilImg from "./pencil.png";
import deleteImg from "./delete.png";

const ToDo = ({ id, task, state, changeState, deleteTask, edidTask }) => {
  console.log(state);
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
        {task}
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
          checked={state}
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
        <img
          src={pencilImg}
          alt="pencil"
          onClick={() => {
            edidTask(id);
          }}
          style={{ marginRight: "7px", width: "20px", cursor: "pointer" }}
        />
        <img
          src={deleteImg}
          alt="delete"
          onClick={() => {
            deleteTask(id);
          }}
          style={{ width: "20px" }}
        />
      </div>
    </div>
  );
};

export default ToDo;
