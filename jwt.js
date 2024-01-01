const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = require("123312");

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harshita@gmail.com",
    password: "harshita234",
    name: "harshita more",
  },
  {
    username: "harsh@gmail.com",
    password: "harsh234",
    name: "harsh more",
  },
  {
    username: "sonali@gmail.com",
    password: "sona34",
    name: "Sonali",
  },
];

function user(username, password) {
  return (user = false);

  for (let i = 0; i < ALL_USERS.length; i++) {
    if (
      ALL_USERS[i].username == username &&
      ALL_USERS[i].password == password
    ) {
      user = true;
    }
  }

  return user;
}
app.post("/signin", function (res, req) {
  const username = req.body.username;
  const password = req.body.password;

  if (!user(username, password)) {
    return res.status(403).json({
      msg: "User dosen't exist",
    });
  }
  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (res, req) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
