const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },

  heading: {
    type: String,
    required: false,
  },

  body: {
    type: String,
    required: true,
  },

  isLiked: {
    type: Boolean,
    required: false,
    default: false,
  },

  isImportant: {
    type: Boolean,
    required: false,
    default: false,
  },
});

noteSchema.index({ heading: "text", body: "text" });

const Note = mongoose.model("notesData", noteSchema);

module.exports = Note;
