const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configs/auth.config");

exports.signUp = async (req, res) => {
  const { userName, name, emailId, password, notes } = req.body;

  try {
    const newPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      userName: userName,
      password: newPassword,
      name: name,
      emailId: emailId,
      notes: notes,
    });

    const nUser = await newUser.save();
    const token = jwt.sign({ userName: userName }, SECRET, { expiresIn: "1h" });
    const response = {
      userName: userName,
      emailId: emailId,
      name: name,
      accessToken: token,
    };
    return res.status(201).send(response);
  } catch (err) {
    return res.send({ message: "Something went wrong" });
  }
};

exports.signIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({
      userName: userName,
    });

    if (!user) {
      return res.status(400).send({ message: "Wrong UserName" });
    } else {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        const token = jwt.sign({ userName: user.userName }, SECRET, {
          expiresIn: "1h",
        });
        const response = {
          userName: user.userName,
          name: user.name,
          emailId: user.emailId,
          accessToken: token,
        };
        return res.status(200).send(response);
      } else {
        return res.status(400).send({ message: "Wrong Password" });
      }
    }
  } catch (err) {
    return res.send({ message: "Something went wrong!" });
  }
};

exports.verifyUser = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({ message: "Token not proviede" });
  } else {
    jwt.verify(token, SECRET, async (err, payload) => {
      if (err) {
        return res.status(400).send(false);
      } else {
        const userName = payload.userName;
        try {
          const user = await User.findOne({ userName: payload.userName });
          req.user = user;
          return res.status(200).send(true);
        } catch (err) {
          return res.status(500).send({ message: "Something went wrong!" });
        }
      }
    });
  }
};
