import express from "express";
import path from "path";

const todoList = [
  {
    title: "Groceries",
    dueDate: "Today",
  },
  {
    title: "Clean Car",
    dueDate: "Yesterday",
  },
  {
    title: "Submit Taxes",
    dueDate: "08/27/2001",
  },
];

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  res.render("index", {
    name: "Jack",
  });
});

app.get("/todos", function (req, res) {
  res.render("components/_todo-list", { list: todoList });
});

app.listen(3000, () => {
  console.log("server is running!");
});
