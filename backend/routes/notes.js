const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { query, validationResult, body } = require("express-validator");

// Route 1: getting all notes using GET
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error has occured!!!!");
  }
});

//Route 2: add all notes
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description atleast 5 characters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are any errors it return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error has occured!!!!");
    }
  }
);

//Route 3: update the exisiting note using POST:
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // create  a new note object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // finding the note to be updated and updating it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401).send("not allowed");
  }

  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error has occured!!!!");
  }
  
  
});

//Route 4: delete the exisiting note using delete:
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // finding the note to be updated and updating it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    // Allow deletion
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: " note  has been deleted: ", note: note });
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error has occured!!!!");
  }
});

module.exports = router;
