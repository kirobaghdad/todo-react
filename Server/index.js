const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("The Server is running on port 3001!!");
});

const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "todo",
});

app.post("/addTodo", (req, res) => {
  const id = req.body.id;
  const todo = req.body.todo;
  const state = req.body.state;
  db.query(
    "insert into todo values (?,?,?)",
    [id, todo, state],
    (err, result) => {
      if (err) console.log(err);
      else res.send("Values Inserted");
    }
  );
});

app.get("/getTodos", (req, res) => {
  db.query("select * from todo", (err, result) => {
    if (err) console.log("Error1!");
    else res.send(result);
  });
});

deleteTodo = (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query("delete from todo where id=(?)", [id], (err, result) => {
    if (err) console.log("Error2!");
    else res.send("Todo Deleted!");
  });

  // db.query("update todo set id = id-1 where id>(?)", [id], (err, result) => {
  //   if (err) console.log("Error3");
  // });
};

app.post("/deleteTodo", deleteTodo);

app.post("/truncateTodoTable", (req, res) => {
  db.query("truncate table todo");
});

app.post("/changeState", (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query(
    "update todo set state = not state where id=(?)",
    [id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.post("/deleteDone", (req, res) => {
  console.log("Hello");
  db.query("delete from todo where state=1", [], (err, result) => {
    if (err) {
      console.log(err);
    } else console.log(result);
  });
  // db.query("select count(*) from todo", (err, result) => {
  //   for (i = 0; i < result; i++) {
  //     db.query("update ");
  //   }
  // });
});
