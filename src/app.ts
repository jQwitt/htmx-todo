import express from "express";
import path from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  res.render("index", {
    name: "Jack",
  });
});

app.get("/todos", function (req, res) {
  res.render("components/_todo");
});

app.listen(3000, () => {
  console.log("server is running!");
});
