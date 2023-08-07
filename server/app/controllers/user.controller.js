var jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  let token = req.headers["x-access-token"];

  const userObject = jwt.decode(token);
  console.log(userObject);
  User.findOne({
    _id: userObject.id,
  }).then((user) => {
    console.log("user", user);
    res.status(200).send({
      id: userObject.id,
      username: user.username,
      email: user.email,
    });
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
