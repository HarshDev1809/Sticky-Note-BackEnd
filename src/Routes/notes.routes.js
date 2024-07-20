const { verifyToken } = require("../Middlewares/jwt.middleware");
const {
  createNewNote,
  getAllNotes,
  deleteNote,
  editNote,
  getNoteById,
} = require("../Controllers/notes.controller");
const { verifyNote } = require("../Middlewares/notes.middleware");

module.exports = (app) => {
  app.get("/home/notes", [verifyToken], getAllNotes);
  app.post("/notes/create", [verifyToken, verifyNote], createNewNote);
  app.put("/notes/edit/:id", [verifyToken, verifyNote], editNote);
  app.delete("/notes/delete/:id", [verifyToken], deleteNote);
  app.get("/home/notes/:id", [verifyToken], getNoteById);
};
