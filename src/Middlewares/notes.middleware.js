const verifyNote = (req, res, next) => {
  const { date, body } = req.body;
  if (!date) {
    return res
      .status(400)
      .send({ message: "Date Can't be Empty.Please Enter Date!" });
  }
  if (!body) {
    return res
      .status(400)
      .send({ message: "Body Can't be Empty.Please Write a Note!" });
  }

  next();
};

module.exports = {
  verifyNote,
};
