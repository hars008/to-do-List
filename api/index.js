const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

// var data=fs.readFileSync("./todos.json", "utf8", function (err, data) {
//   if (err) throw err;
//   data= JSON.parse(data);
//   return data;
// });
var data = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
var users = JSON.parse(fs.readFileSync("./user.json", "utf8"));

// console.log(data)

app.use(express.json());
app.use(
  cors({
    origin: "https://keen-muffin-b24056.netlify.app",
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.get("/", (req, res) => {
  res.json("sjfsk");
});
app.get("/todos", (req, res) => {
  // console.log(todos)
  res.json(data);
  // res.sendFile(path.join(__dirname,  "todos.json"));
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  var idz = req.params.id;
  var user = users.find((user) => user.id == idz);
  res.json(user);
});

app.listen(1234);
